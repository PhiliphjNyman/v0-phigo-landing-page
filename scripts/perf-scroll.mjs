// Moment 8 — headless scroll-perf + Core Web Vitals measurement.
//
//   URL=http://localhost:3000 ROUTES=/,/hemsida LABEL=branch \
//     pnpm exec node scripts/perf-scroll.mjs
//
// Per route, at a 390px mobile viewport with a 4x CPU throttle (main-thread),
// it measures:
//   - scroll FPS + long-frame count  (main-thread scroll smoothness)
//   - CLS                            (cumulative layout shift, reliable headless)
//   - LCP                            (largest-contentful-paint)
// and, at 360px (no throttle), whether the page scrolls sideways (R3).
//
// CAVEAT (lessons.md, 2026-07): headless chromium renders through SwiftShader
// (software GPU), so ABSOLUTE fps on GPU-heavy effects (the hero mesh blur) is
// pessimistic and not representative of a real device. Read these numbers as a
// main-thread / layout / CLS signal and as a RELATIVE before-vs-after (main vs
// branch on the same rig). Absolute smoothness is signed off on a real device
// (Hugo's mobile check), never on this rig.

import { chromium } from 'playwright'

const URL = (process.env.URL || 'http://localhost:3000').replace(/\/$/, '')
const ROUTES = (process.env.ROUTES || '/').split(',').map((r) => r.trim()).filter(Boolean)
const CPU = Number(process.env.CPU || 4)
const LABEL = process.env.LABEL || 'run'

const browser = await chromium.launch()

// Runs entirely in-page: drives a rAF-based auto-scroll from top to bottom and
// counts frames + long frames (>32ms ~ a dropped frame below ~30fps) over the
// scroll. Returns average fps across the scroll session.
async function measureScrollFps(page) {
  return page.evaluate(
    () =>
      new Promise((resolve) => {
        window.scrollTo(0, 0)
        const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
        const step = Math.max(6, maxY / (60 * 3)) // aim ~3s top->bottom at 60fps
        let frames = 0
        let long = 0
        let y = 0
        let last = performance.now()
        const start = last
        function tick(now) {
          const dt = now - last
          last = now
          frames++
          if (dt > 32) long++
          y = Math.min(maxY, y + step)
          window.scrollTo(0, y)
          if (y >= maxY || now - start > 6000) {
            const secs = (now - start) / 1000
            resolve({ fps: +(frames / secs).toFixed(1), frames, long, secs: +secs.toFixed(2), scrollH: document.documentElement.scrollHeight })
          } else {
            requestAnimationFrame(tick)
          }
        }
        requestAnimationFrame(tick)
      })
  )
}

async function readVitals(page) {
  return page.evaluate(
    () =>
      new Promise((resolve) => {
        let cls = 0
        let lcp = 0
        try {
          new PerformanceObserver((list) => {
            for (const e of list.getEntries()) if (!e.hadRecentInput) cls += e.value
          }).observe({ type: 'layout-shift', buffered: true })
        } catch {}
        try {
          new PerformanceObserver((list) => {
            const es = list.getEntries()
            const l = es[es.length - 1]
            if (l) lcp = l.renderTime || l.loadTime || l.startTime || 0
          }).observe({ type: 'largest-contentful-paint', buffered: true })
        } catch {}
        // let the buffered entries flush
        setTimeout(() => resolve({ cls: +cls.toFixed(4), lcp: Math.round(lcp) }), 300)
      })
  )
}

async function measureRoute(route) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  const page = await ctx.newPage()
  const client = await ctx.newCDPSession(page)
  await client.send('Emulation.setCPUThrottlingRate', { rate: CPU })
  const resp = await page.goto(URL + route, { waitUntil: 'load' })
  const status = resp ? resp.status() : 0
  if (status >= 400) {
    await ctx.close()
    return { route, status, skipped: true }
  }
  await page.waitForTimeout(500)
  const vitalsBefore = await readVitals(page) // LCP + any load-time shift
  const scroll = await measureScrollFps(page)
  const vitalsAfter = await readVitals(page) // CLS accumulated incl. scroll
  await ctx.close()
  return { route, status, fps: scroll.fps, long: scroll.long, frames: scroll.frames, secs: scroll.secs, lcp: vitalsBefore.lcp, cls: vitalsAfter.cls, scrollH: scroll.scrollH }
}

async function measureHScroll(route) {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 780 } })
  const page = await ctx.newPage()
  const resp = await page.goto(URL + route, { waitUntil: 'load' })
  if ((resp ? resp.status() : 0) >= 400) { await ctx.close(); return { ok: null } }
  await page.waitForTimeout(300)
  const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }))
  await ctx.close()
  return { ok: sw <= iw + 1, sw, iw }
}

console.log(`\n=== perf-scroll [${LABEL}] @390px, ${CPU}x CPU — ${URL} ===`)
console.log('route                       fps  long  LCP(ms)  CLS      h-scroll@360')
const results = []
for (const route of ROUTES) {
  const r = await measureRoute(route)
  if (r.skipped) {
    console.log(`${route.padEnd(26)} —    (HTTP ${r.status}, skipped)`)
    results.push(r)
    continue
  }
  const h = await measureHScroll(route)
  r.hScroll = h
  const hTxt = h.ok === null ? 'n/a' : h.ok ? `ok(${h.sw}=${h.iw})` : `FAIL(${h.sw}>${h.iw})`
  console.log(`${route.padEnd(26)} ${String(r.fps).padStart(4)} ${String(r.long).padStart(5)} ${String(r.lcp).padStart(8)}  ${String(r.cls).padEnd(7)} ${hTxt}`)
  results.push(r)
}

await browser.close()
console.log(`\nJSON[${LABEL}]: ` + JSON.stringify({ label: LABEL, url: URL, cpu: CPU, results }))
console.log('\nNote: headless SwiftShader — fps is a main-thread/relative signal, not absolute GPU truth (see lessons.md). CLS + h-scroll are reliable.\n')
