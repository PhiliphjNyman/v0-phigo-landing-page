/**
 * Guide behaviour gate — measures what reasoning cannot settle.
 *
 * guide-matrix.mjs proves the LOGIC. This proves the rendered guide matches that
 * logic and behaves: CLS stays 0, the question steps never change height, focus
 * follows the step for screen readers, going back keeps earlier answers, and the
 * orphaned-answer rule holds through the DOM and not just in the module.
 *
 * Expected copy is imported from lib/guide.ts rather than restated, because the
 * question here is "does the page show what the logic decided", and the logic
 * itself is already checked against fas 0 §5 by the matrix gate.
 *
 * Usage: pnpm exec next start -p 3001, then pnpm exec node scripts/guide-flow.mjs
 */
import { chromium } from 'playwright'
import { QUESTIONS, answerLabel, presentOutcome } from '../lib/guide.ts'

const BASE = process.env.URL || 'http://localhost:3001'

/** One path per outcome, plus the care overlay and the chatbot fallback. */
const PATHS = [
  {
    name: 'allt-i-ett',
    answers: { q1: 'hantverk', q2: 'ingen', q3: 'rostbrevlada', q4: 'rekommendationer', q5: 'fler-forfragningar', q6: '5-15' },
  },
  {
    name: 'hemsida',
    answers: { q1: 'butik', q2: 'gammal', q3: 'svarar-sjalv', q4: 'google', q5: 'fler-forfragningar' },
  },
  {
    name: 'receptionist',
    answers: { q1: 'verkstad', q2: 'nojd', q3: 'kollega', q4: 'skyltlage', q5: 'sluta-missa-samtal', q6: 'enstaka' },
  },
  {
    name: 'chatbot-rad4',
    answers: { q1: 'annat', q2: 'nojd', q3: 'svarar-sjalv', q4: 'google', q5: 'slippa-samma-fragor' },
  },
  {
    name: 'chatbot-fallback',
    answers: { q1: 'annat', q2: 'nojd', q3: 'svarar-sjalv', q4: 'vet-inte', q5: 'mer-tid' },
  },
  {
    name: 'vard-overlagg',
    answers: { q1: 'vard', q2: 'nojd', q3: 'rostbrevlada', q4: 'rekommendationer', q5: 'sluta-missa-samtal', q6: 'enstaka' },
  },
]

/* Surfplattebredden är med för höjdgolvets skull: det är i mellanbredderna som
   en lång alternativetikett kan radbryta oväntat och spränga golvet. */
const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'surfplatta', width: 768, height: 1024 },
  { label: 'mobil', width: 390, height: 844 },
]
const THEMES = ['light', 'dark']

let failures = 0
const check = (label, ok, detail = '') => {
  if (!ok) failures++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
}

/* Layout-shift accounting installed before any script on the page runs. Standard
   CLS ignores shifts within 500ms of input; both numbers are collected so an
   input-adjacent jump cannot hide behind that exclusion. */
const OBSERVER = `
  window.__cls = 0
  window.__clsAfterInput = 0
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.hadRecentInput) window.__clsAfterInput += entry.value
      else window.__cls += entry.value
    }
  }).observe({ type: 'layout-shift', buffered: true })
`

const questionOrder = (answers) =>
  QUESTIONS.filter((q) => answers[q.id] !== undefined).map((q) => q.id)

async function openGuide(page) {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.locator('#guide').scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
}

async function runPath(page, path, label) {
  await openGuide(page)

  const ids = questionOrder(path.answers)
  const heights = []
  let focusProblem = null

  for (const questionId of ids) {
    const question = QUESTIONS.find((q) => q.id === questionId)

    /* Rätt fråga syns innan vi klickar. */
    const heading = await page.locator('#guide-step-heading').innerText()
    if (heading.trim() !== question.prompt) {
      check(`${label} ${path.name}: fråga ${questionId} visas`, false, `såg "${heading.trim()}"`)
      return
    }

    heights.push(await page.locator('.guide-step-shell').evaluate((el) => el.offsetHeight))

    const optionLabel = answerLabel(questionId, path.answers[questionId])
    await page.getByRole('button', { name: optionLabel, exact: true }).click()
    await page.waitForTimeout(450)

    /* Fokus ska ha flyttats till det nya stegets grupp, annars vet en
       skärmläsaranvändare inte att sidan bytt fråga. */
    const focusRole = await page.evaluate(() => document.activeElement?.getAttribute('role'))
    if (focusRole !== 'group') {
      focusProblem ??= `efter ${questionId}: fokus på ${focusRole ?? 'okänt element'}`
    }
  }

  check(`${label} ${path.name}: fokus följer stegbytet`, focusProblem === null, focusProblem ?? '')

  const uniqueHeights = [...new Set(heights)]
  check(
    `${label} ${path.name}: frågestegen har konstant höjd`,
    uniqueHeights.length === 1,
    uniqueHeights.length === 1 ? `${uniqueHeights[0]}px` : `höjder: ${heights.join(', ')}`
  )

  /* Utfallet på sidan ska vara exakt det logiken beslutade. */
  const expected = presentOutcome(path.answers)
  const shown = await page.locator('#guide-outcome-heading').innerText()
  check(`${label} ${path.name}: rätt utfallsrubrik`, shown.trim() === expected.heading, shown.trim())

  const cardText = await page.locator('#guide').innerText()
  check(`${label} ${path.name}: priset visas`, cardText.includes(expected.price), expected.price)
  check(`${label} ${path.name}: sista raden stämmer`, cardText.includes(expected.cta))

  /* Halveringsraden hör bara till hemsidan och får aldrig läcka. */
  const trustShown = cardText.includes('Betala hälften nu')
  check(
    `${label} ${path.name}: halveringsraden ${expected.trust ? 'visas' : 'visas inte'}`,
    trustShown === (expected.trust !== undefined)
  )

  if (expected.secondary) {
    check(`${label} ${path.name}: rad två visas`, cardText.includes(expected.secondary))
  }

  const cls = await page.evaluate(() => ({ cls: window.__cls, after: window.__clsAfterInput }))
  check(
    `${label} ${path.name}: CLS 0 genom hela flödet`,
    cls.cls === 0,
    `CLS=${cls.cls.toFixed(4)} (inmatningsnära skift: ${cls.after.toFixed(4)})`
  )
}

/** Back keeps earlier answers, and a flipped question 3 drops the orphan. */
async function runBackAndOrphan(page, label) {
  await openGuide(page)

  const answerWith = async (questionId, optionId) => {
    const optionLabel = answerLabel(questionId, optionId)
    await page.getByRole('button', { name: optionLabel, exact: true }).click()
    await page.waitForTimeout(400)
  }

  await answerWith('q1', 'hantverk')
  await answerWith('q2', 'gammal')
  await answerWith('q3', 'rostbrevlada')

  /* Två steg bakåt: fråga 2:s val ska stå kvar markerat. */
  await page.getByRole('button', { name: 'Tillbaka' }).click()
  await page.waitForTimeout(400)
  await page.getByRole('button', { name: 'Tillbaka' }).click()
  await page.waitForTimeout(400)

  const heading = await page.locator('#guide-step-heading').innerText()
  check(`${label} tillbaka: landar på fråga 2`, heading.includes('Hur ser din hemsida ut idag'), heading.trim())

  const pressed = await page
    .getByRole('button', { name: 'Har en, men den är gammal', exact: true })
    .getAttribute('aria-pressed')
  check(`${label} tillbaka: tidigare svar är kvar`, pressed === 'true', `aria-pressed=${pressed}`)

  /* Framåt igen och byt fråga 3 till "svarar nästan alltid": fråga 6 ska då
     försvinna ur vägen helt, alltså ska fråga 5 leda rakt till utfallet. */
  await answerWith('q2', 'gammal')
  await answerWith('q3', 'svarar-sjalv')
  await answerWith('q4', 'google')
  await answerWith('q5', 'fler-forfragningar')

  const outcomeVisible = await page.locator('#guide-outcome-heading').count()
  check(`${label} fråga 6 faller bort när fråga 3 byts`, outcomeVisible === 1)

  const expected = presentOutcome({
    q1: 'hantverk', q2: 'gammal', q3: 'svarar-sjalv', q4: 'google', q5: 'fler-forfragningar',
  })
  const shown = outcomeVisible ? await page.locator('#guide-outcome-heading').innerText() : ''
  check(`${label} omvalet ger hemsideutfallet`, shown.trim() === expected.heading, shown.trim())
}

/**
 * The submit itself, with the endpoint mocked. Two things get proven that no
 * amount of reading can settle: the payload actually carries the ids the logic
 * decided, and the confirmation mirrors the chosen path VERBATIM. Fas 0 §5 makes
 * that mirroring a promise ("den som valt mejl rings inte upp först"), so a
 * generic "tack för ditt meddelande" would be a broken promise, not a nuance.
 */
async function runSubmit(page, kontaktsatt, label) {
  const answers = { q1: 'hantverk', q2: 'ingen', q3: 'rostbrevlada', q4: 'google', q5: 'fler-forfragningar', q6: '5-15' }

  let captured = null
  let capturedUrl = null
  await page.route('**/api/contact*', async (route) => {
    capturedUrl = route.request().url()
    captured = route.request().postDataJSON()
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' })
  })

  await openGuide(page)
  for (const questionId of questionOrder(answers)) {
    await page.getByRole('button', { name: answerLabel(questionId, answers[questionId]), exact: true }).click()
    await page.waitForTimeout(350)
  }

  /* Startsidan bär BÅDE guiden och kontaktformuläret, och de har fält med samma
     etiketter. Allt nedan scopas därför till guidesektionen. */
  const guide = page.locator('#guide')
  await guide.getByLabel('Namn').fill('Testperson Grind')
  await guide.getByLabel('Telefon').fill('070 123 45 67')
  if (kontaktsatt === 'mejl') await guide.getByLabel('E-post').fill('test@example.com')
  await page.locator('#guide-gdpr').click()

  const button = kontaktsatt === 'ring' ? 'Ja, ring mig' : 'Maila mig i stället'
  await guide.getByRole('button', { name: button }).click()
  await page.waitForTimeout(700)

  check(`${label} inskick/${kontaktsatt}: källan ligger i query-strängen`, capturedUrl?.includes('source=guide') === true, capturedUrl ?? 'ingen förfrågan')

  const payloadOk =
    captured?.source === 'guide' &&
    captured?.kontakt?.kontaktsatt === kontaktsatt &&
    captured?.utfall === presentOutcome(answers).outcomeId &&
    JSON.stringify(captured?.svar) === JSON.stringify(answers)
  check(`${label} inskick/${kontaktsatt}: nyttolasten bär rätt svar och utfall`, payloadOk, JSON.stringify(captured?.svar ?? null))

  /* Ring-vägen får skicka utan e-post; mejl-vägen måste ha den. */
  const emailRule =
    kontaktsatt === 'ring'
      ? captured?.kontakt?.epost === undefined
      : typeof captured?.kontakt?.epost === 'string'
  check(`${label} inskick/${kontaktsatt}: e-postfältet följer vägens krav`, emailRule)

  const shown = await page.locator('#guide').innerText()
  const expectedSentence =
    kontaktsatt === 'ring' ? 'Vi ringer upp dig inom en arbetsdag.' : 'Vi mejlar dig inom en arbetsdag.'
  check(`${label} inskick/${kontaktsatt}: bekräftelsen speglar valet ordagrant`, shown.includes(expectedSentence), expectedSentence)
  check(`${label} inskick/${kontaktsatt}: bekräftelserubriken visas`, shown.includes('Tack, vi hör av oss'))

  /* Motsatt löfte får ALDRIG stå kvar på skärmen. */
  const wrongSentence =
    kontaktsatt === 'ring' ? 'Vi mejlar dig inom en arbetsdag.' : 'Vi ringer upp dig inom en arbetsdag.'
  check(`${label} inskick/${kontaktsatt}: motsatt löfte syns inte`, !shown.includes(wrongSentence))

  await page.unroute('**/api/contact*')
}

/** Every option must be reachable and operable from the keyboard alone. */
async function runKeyboard(page, label) {
  await openGuide(page)

  const firstOption = page.getByRole('button', { name: 'Hantverk eller bygg', exact: true })
  await firstOption.focus()

  const ring = await firstOption.evaluate((el) => {
    el.focus()
    const style = getComputedStyle(el)
    return { outlineWidth: style.outlineWidth, outlineStyle: style.outlineStyle }
  })
  check(
    `${label} tangentbord: fokusring på alternativen`,
    ring.outlineStyle !== 'none' && parseFloat(ring.outlineWidth) >= 3,
    `${ring.outlineStyle} ${ring.outlineWidth}`
  )

  await page.keyboard.press('Enter')
  await page.waitForTimeout(400)
  const heading = await page.locator('#guide-step-heading').innerText()
  check(`${label} tangentbord: Enter väljer och går vidare`, heading.includes('Hur ser din hemsida ut idag'), heading.trim())
}

const browser = await chromium.launch()

for (const vp of VIEWPORTS) {
  for (const theme of THEMES) {
    const label = `${vp.label}/${theme}`
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: theme,
      isMobile: vp.label === 'mobil',
      hasTouch: vp.label === 'mobil',
    })
    await context.addInitScript(OBSERVER)
    const page = await context.newPage()

    for (const path of PATHS) {
      await runPath(page, path, label)
    }
    await runBackAndOrphan(page, label)
    /* Ett trasigt uttag i ETT delsteg får inte döda körningen och dölja de
       tvåhundra kontroller som ligger efter. Rapportera och gå vidare. */
    for (const kontaktsatt of ['ring', 'mejl']) {
      try {
        await runSubmit(page, kontaktsatt, label)
      } catch (err) {
        check(`${label} inskick/${kontaktsatt}`, false, err.message.split('\n')[0])
      }
    }
    if (theme === 'light') await runKeyboard(page, label)

    await context.close()
  }
}

await browser.close()
console.log(failures === 0 ? '\n✓ ALL GUIDE FLOW RULES PASS\n' : `\n✗ ${failures} GUIDE FLOW FAILURE(S)\n`)
process.exit(failures === 0 ? 0 : 1)
