// Visual geometric-rules gate. Run before each moment approval:
//   pnpm exec node scripts/visual-rules.mjs
// Requires a dev/prod server on http://localhost:3000 (override with URL=...).
//
// Checks every decorative orb (.hero-orb) in every orb container ([data-hero],
// [data-anchor]) against rules distilled from human review:
//   R1  Not clipped by the viewport edge OR its container's bounds. Occlusion by
//       a CONTENT element (button/card) is depth, not clipping — such orbs set
//       data-occlude-ok and are exempt from R2 only (never R1).
//   R2  Does not overlap protected content (headings, body/microcopy, CTA links,
//       stat-card inner text, trust-bar text) unless data-occlude-ok.
//   R4  Centre sits in its declared glow zone: tr = top-right, tl = top-left,
//       card = whole container is atmospheric (zone skipped). Orbs on bare white
//       area read as stickers — they must live where the mesh/gradient glows.
//   R5  Does not overlap the fixed header.
//   R3  No horizontal scroll at 360px width.
//
// Each container is scrolled to viewport centre before measuring, so scroll-
// relative parallax rests near 0 and viewport-clip checks are meaningful. Runs
// light + dark at desktop (1440x900) and a mobile pass (360x780). Visual
// judgement stays human; every finding phrasable as a rule moves in here.

import { chromium } from 'playwright'

const URL = process.env.URL || 'http://localhost:3000'
const TOL = 1.5
// Glow zones as a fraction of the container. Keep in sync with the mesh/anchor
// gradients in globals.css.
const GLOW = {
  tr: (x, y) => x >= 0.47 && y <= 0.56,
  tl: (x, y) => x <= 0.55 && y <= 0.62,
  card: () => true, // whole container is atmospheric
}
const CONTAINERS = ['[data-hero]', '[data-anchor]']

function collectFor(sel) {
  const c = document.querySelector(sel)
  if (!c) return null
  const box = (r) => ({ left: r.left, top: r.top, right: r.right, bottom: r.bottom, w: r.width, h: r.height })
  const visible = (el) => {
    const r = el.getBoundingClientRect()
    return r.width > 1 && r.height > 1 && el.offsetParent !== null
  }
  const orbs = [...document.querySelectorAll('.hero-orb')]
    .filter((el) => el.closest('[data-hero], [data-anchor]') === c && visible(el))
    .map((el) => ({
      label: el.dataset.orbLabel || 'orb',
      occludeOk: el.dataset.occludeOk === 'true',
      glow: el.dataset.glow || 'tr',
      rect: box(el.getBoundingClientRect()),
    }))
  const protectedEls = [...c.querySelectorAll('h1, h2, p, a, [data-orb-protect]')]
    .filter(visible)
    .map((el) => ({
      tag: el.dataset.orbProtect !== undefined ? 'protect' : el.tagName.toLowerCase(),
      text: (el.textContent || '').trim().slice(0, 22),
      rect: box(el.getBoundingClientRect()),
    }))
  const headerEl = document.querySelector('header')
  return {
    container: box(c.getBoundingClientRect()),
    vw: window.innerWidth,
    vh: window.innerHeight,
    header: headerEl ? box(headerEl.getBoundingClientRect()) : null,
    orbs,
    protectedEls,
  }
}

function intersects(a, b) {
  return Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2
}

function analyze(data) {
  const { vw, vh, container, header, protectedEls, orbs } = data
  return orbs.map((orb) => {
    const r = orb.rect
    const clip = []
    if (r.left < -TOL) clip.push('viewport-left')
    if (r.top < -TOL) clip.push('viewport-top')
    if (r.right > vw + TOL) clip.push('viewport-right')
    if (r.bottom > vh + TOL) clip.push('viewport-bottom')
    if (r.left < container.left - TOL) clip.push('container-left')
    if (r.top < container.top - TOL) clip.push('container-top')
    if (r.right > container.right + TOL) clip.push('container-right')
    if (r.bottom > container.bottom + TOL) clip.push('container-bottom')

    const hitsHeader = header ? intersects(r, header) : false

    const overlaps = []
    if (!orb.occludeOk) for (const p of protectedEls) if (intersects(r, p.rect)) overlaps.push(`${p.tag}("${p.text}")`)

    const cxRel = (r.left + r.w / 2 - container.left) / container.w
    const cyRel = (r.top + r.h / 2 - container.top) / container.h
    const inGlow = (GLOW[orb.glow] || GLOW.tr)(cxRel, cyRel)

    const pass = clip.length === 0 && overlaps.length === 0 && inGlow && !hitsHeader
    return { label: orb.label, glow: orb.glow, occludeOk: orb.occludeOk, clip, overlaps, hitsHeader, inGlow, centre: `${(cxRel * 100).toFixed(0)},${(cyRel * 100).toFixed(0)}`, pass }
  })
}

const browser = await chromium.launch()
let anyFail = false
const mark = (ok) => (ok ? 'PASS' : 'FAIL')

async function runPass(page, w, h, tag) {
  let localOrbs = 0
  for (const sel of CONTAINERS) {
    await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'center', behavior: 'instant' }), sel)
    await page.waitForTimeout(650)
    const data = await page.evaluate(collectFor, sel)
    if (!data || data.orbs.length === 0) continue
    const rows = analyze(data)
    console.log(`  ${sel} — ${rows.length} orb(s)`) // eslint-disable-line
    for (const row of rows) {
      localOrbs++
      if (!row.pass) anyFail = true
      const notes = []
      if (row.clip.length) notes.push(`clipped: ${row.clip.join(', ')}`)
      if (row.hitsHeader) notes.push('overlaps header')
      if (!row.inGlow) notes.push(`OUTSIDE glow(${row.glow}) centre ${row.centre}`)
      if (row.overlaps.length) notes.push(`overlaps: ${row.overlaps.join(', ')}`)
      if (row.pass) notes.push(`${row.glow} centre ${row.centre}${row.occludeOk ? ' occlude-ok' : ''}`)
      console.log(`    [${mark(row.pass)}] ${row.label.padEnd(12)} ${notes.join(' | ') || 'clean'}`)
    }
  }
  if (localOrbs === 0) console.log('  (no visible orbs)')
}

for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'load' })
  await page.waitForTimeout(600)
  console.log(`\n=== ${scheme.toUpperCase()} @1440x900 ===`)
  await runPass(page, 1440, 900, scheme)
  await ctx.close()
}

// Mobile pass — flat orbs + horizontal scroll
{
  const ctx = await browser.newContext({ viewport: { width: 360, height: 780 } })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'load' })
  await page.waitForTimeout(600)
  console.log(`\n=== MOBILE @360x780 ===`)
  await runPass(page, 360, 780)
  const { scrollWidth, inner } = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, inner: window.innerWidth }))
  const ok = scrollWidth <= inner + 1
  if (!ok) anyFail = true
  console.log(`  [${mark(ok)}] horizontal-scroll  scrollWidth=${scrollWidth} viewport=${inner}`)
  await ctx.close()
}

await browser.close()
console.log(`\n${anyFail ? '✗ FAIL — fix the rows above' : '✓ ALL RULES PASS'}\n`)
process.exit(anyFail ? 1 : 0)
