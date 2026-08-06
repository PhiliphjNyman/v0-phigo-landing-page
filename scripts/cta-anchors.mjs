/**
 * CTA anchor gate — every "/#kontakt" call to action must actually land the
 * visitor on the contact form.
 *
 * Background: a plain <a href="/#kontakt"> full-loads the homepage and the
 * browser's fragment scroll does not survive the page settling, so the visitor
 * ends up at the top with no idea why. next/link navigates client-side and
 * lands correctly. Components that take an href as a prop (ProductHero,
 * ProductDemoCta) are invisible to eslint's no-html-link-for-pages, which is
 * why this behavioural gate exists.
 *
 * Usage: pnpm exec next start -p 3001, then pnpm exec node scripts/cta-anchors.mjs
 */
import { chromium } from 'playwright'

const BASE = process.env.URL || 'http://localhost:3001'

/* Selectors are href+text scoped so pages carrying two CTAs with the same
   label (e.g. /hemsida: hero + offer card) are told apart. */
const CTAS = [
  /* Below lg the header CTA lives inside the hamburger Sheet, so the menu has
     to be opened before the link exists in the layout. */
  { from: '/', name: 'Header-CTA', sel: 'a[href="/#kontakt"]:has-text("Se vad din hemsida missar")', openMenuBelowLg: true },
  { from: '/', name: 'FinalCta', sel: 'a[href="/#kontakt"]:has-text("Skicka din sajt")' },
  { from: '/hemsida', name: 'ProductHero-CTA', sel: 'a[href="/#kontakt"]:has-text("Se vad din hemsida missar, kostnadsfritt")' },
  { from: '/hemsida', name: 'FaqSection-lank', sel: 'a[href="/#kontakt"]:has-text("Chatta med oss")' },
  { from: '/hemsida', name: 'FinalCta', sel: 'a[href="/#kontakt"]:has-text("Skicka din sajt")' },
  { from: '/ai-receptionist', name: 'DemoCta', sel: 'a[href="/#kontakt"]:has-text("Kontakta oss")' },
  { from: '/chatbot', name: 'DemoCta', sel: 'a[href="/#kontakt"]:has-text("Kontakta oss")' },
  { from: '/cases', name: 'Botten-CTA', sel: 'a[href="/#kontakt"]:has-text("Boka kostnadsfri granskning")' },
  /* Article-HTML path: raw <a> inside dangerouslySetInnerHTML, routed by
     components/article-html.tsx. The step A bug has now appeared through three
     different paths (propped hrefs, eslint-visible literals, article HTML) —
     this entry gates the third. */
  { from: '/blogg/hemsida-frisor', name: 'Artikel-länk (ArticleHtml)', sel: '.prose a[href="/#kontakt"]' },
]

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobil', width: 390, height: 844 },
]
const THEMES = ['light', 'dark']

let failures = 0
const browser = await chromium.launch()

for (const vp of VIEWPORTS) {
  for (const theme of THEMES) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: theme,
      isMobile: vp.label === 'mobil',
      hasTouch: vp.label === 'mobil',
    })
    const page = await context.newPage()

    for (const cta of CTAS) {
      const label = `${vp.label}/${theme}  ${cta.from} -> ${cta.name}`
      try {
        await page.goto(`${BASE}${cta.from}`, { waitUntil: 'networkidle' })

        const inSheet = cta.openMenuBelowLg && vp.width < 1024
        if (inSheet) {
          await page.getByRole('button', { name: /meny|menu/i }).first().click()
          await page.waitForTimeout(500)
        }

        // The Sheet copy of the header CTA is rendered after the desktop one.
        const link = inSheet ? page.locator(cta.sel).last() : page.locator(cta.sel).first()
        await link.scrollIntoViewIfNeeded({ timeout: 10000 })
        await link.click()
        await page.waitForTimeout(2500)

        const r = await page.evaluate(() => {
          const el = document.querySelector('#kontakt')
          if (!el) return null
          const rect = el.getBoundingClientRect()
          return { top: Math.round(rect.top), y: Math.round(window.scrollY) }
        })

        if (!r) {
          console.log(`FAIL  ${label} — #kontakt saknas pa ${new URL(page.url()).pathname}`)
          failures++
          continue
        }

        /* Landed = the contact section's top edge is at or near the top of the
           viewport. A generous window absorbs the sticky header offset. */
        const landed = Math.abs(r.top) < 300
        if (!landed) failures++
        console.log(`${landed ? 'PASS' : 'FAIL'}  ${label} — scrollY=${r.y} #kontakt.top=${r.top}px`)
      } catch (err) {
        console.log(`FAIL  ${label} — ${err.message.split('\n')[0]}`)
        failures++
      }
    }

    await context.close()
  }
}

await browser.close()
console.log(failures === 0 ? '\nALL CTA ANCHORS PASS' : `\n${failures} CTA FAILURE(S)`)
process.exit(failures === 0 ? 0 : 1)
