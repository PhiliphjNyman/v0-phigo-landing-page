/**
 * Guide matrix gate — proves the outcome table is total and deterministic.
 *
 * Fas 0 §5 requires that NO combination of answers can be left without an
 * outcome, that the rows are tried top down with first match winning, and that
 * the care overlay changes wording only, never the recommended product. This
 * script enumerates every reachable combination (2400 of them) and asserts all
 * of it, plus the copy rules that can be machine-checked.
 *
 * It imports lib/guide.ts directly — Node strips the types — so the gate and the
 * app can never drift apart. No browser, runs in well under a second.
 *
 * Usage: pnpm exec node scripts/guide-matrix.mjs
 */
import {
  QUESTIONS,
  OPTION_IDS,
  OUTCOME_RULES,
  OUTCOME_IDS,
  OUTCOMES_WITH_RECEPTIONIST,
  MISSAR_SAMTAL,
  BRANSCH_EKO,
  KONTAKTSATT_LABEL,
  KONTAKTSATT_BEKRAFTELSE,
  NUMBERED_QUESTIONS,
  GUIDE_UI_COPY,
  GUIDE_VALIDATION,
  OUTCOME_COPY,
  SECONDARY_LINE,
  CARE_CTA_LINE,
  ctaLine,
  presentOutcome,
  resolveOutcome,
  visibleQuestions,
  clearOrphanedAnswers,
  isComplete,
  stepLabel,
  answerLabel,
} from '../lib/guide.ts'

let failures = 0
const check = (label, ok, detail = '') => {
  if (!ok) failures++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
}

/* A broken outcome table makes resolveOutcome throw. Every later section assumes
   totality, so they resolve through this and report a miss as a failed check
   rather than killing the run with a stack trace half way down the report. */
const safeResolve = (answers) => {
  try {
    return resolveOutcome(answers)
  } catch {
    return null
  }
}

/* ---------------------------------------------------------------------------
   1. Uppräkning av samtliga kombinationer
   ------------------------------------------------------------------------ */

/** Every combination a visitor can actually reach, q6 included only when asked. */
function allCombinations() {
  const combos = []
  for (const q1 of OPTION_IDS.q1) {
    for (const q2 of OPTION_IDS.q2) {
      for (const q3 of OPTION_IDS.q3) {
        for (const q4 of OPTION_IDS.q4) {
          for (const q5 of OPTION_IDS.q5) {
            const base = { q1, q2, q3, q4, q5 }
            if (q3 === 'svarar-sjalv') {
              combos.push(base)
            } else {
              for (const q6 of OPTION_IDS.q6) combos.push({ ...base, q6 })
            }
          }
        }
      }
    }
  }
  return combos
}

const combos = allCombinations()
const expectedCount = 5 * 3 * 3 * 4 * 4 * 3 + 5 * 3 * 1 * 4 * 4
check(
  `Kombinationer uppräknade (${combos.length})`,
  combos.length === expectedCount,
  `väntade ${expectedCount}`
)

/* ---------------------------------------------------------------------------
   2. Varje kombination har exakt ett utfall
   ------------------------------------------------------------------------ */

const VALID_OUTCOMES = new Set(OUTCOME_IDS)

/**
 * Fas 0 §5 restated independently. A gate that measures the app's constants
 * against those same constants approves its own mistakes, so the spec is written
 * out here a second time on purpose: rad 1 (Allt-i-ett) och rad 3 (AI-Receptionist)
 * är de utfall som innehåller receptionisten, och "missar samtal" är allt utom
 * "Jag svarar nästan alltid".
 */
const SPEC_RECEPTIONIST_OUTCOMES = ['allt-i-ett', 'ai-receptionist']
const SPEC_MISSAR_SAMTAL = ['rostbrevlada', 'ringer-ut', 'kollega']

check(
  'OUTCOMES_WITH_RECEPTIONIST matchar fas 0 §5',
  [...OUTCOMES_WITH_RECEPTIONIST].sort().join(',') === [...SPEC_RECEPTIONIST_OUTCOMES].sort().join(','),
  `appen säger [${OUTCOMES_WITH_RECEPTIONIST}]`
)
check(
  'MISSAR_SAMTAL matchar fas 0 §5',
  [...MISSAR_SAMTAL].sort().join(',') === [...SPEC_MISSAR_SAMTAL].sort().join(','),
  `appen säger [${MISSAR_SAMTAL}]`
)
const reachedOutcomes = new Set()
const reachedRules = new Set()
let missingOutcome = null
let siteForcedOnSatisfied = null
let overlayOnWrongProduct = null

for (const combo of combos) {
  let resolved
  try {
    resolved = resolveOutcome(combo)
  } catch (err) {
    missingOutcome ??= `${JSON.stringify(combo)} kastade: ${err.message}`
    continue
  }

  if (!resolved || !VALID_OUTCOMES.has(resolved.outcomeId)) {
    missingOutcome ??= JSON.stringify(combo)
    continue
  }

  reachedOutcomes.add(resolved.outcomeId)
  reachedRules.add(resolved.ruleId)

  /* Fas 0 §5: hemsidan får aldrig påtvingas den som sagt sig nöjd. */
  if (
    combo.q2 === 'nojd' &&
    (resolved.outcomeId === 'hemsida' || resolved.outcomeId === 'allt-i-ett')
  ) {
    siteForcedOnSatisfied ??= JSON.stringify(combo)
  }

  /* Överlägget är ett löfteslager, inte en produktväljare. Mätt mot spec-listan
     ovan, inte mot appens egen konstant. */
  const shouldOverlay =
    combo.q1 === 'vard' && SPEC_RECEPTIONIST_OUTCOMES.includes(resolved.outcomeId)
  if (resolved.careOverlay !== shouldOverlay) {
    overlayOnWrongProduct ??= `${JSON.stringify(combo)} -> ${resolved.outcomeId}, careOverlay=${resolved.careOverlay}`
  }
}

check('Varje kombination får ett giltigt utfall', missingOutcome === null, missingOutcome ?? '')
check(
  'Hemsida pitchas aldrig till den som är nöjd med sin sajt',
  siteForcedOnSatisfied === null,
  siteForcedOnSatisfied ?? ''
)
check(
  'Vård-överlägget sätts exakt när vård möter ett receptionist-utfall',
  overlayOnWrongProduct === null,
  overlayOnWrongProduct ?? ''
)

/* ---------------------------------------------------------------------------
   3. Överlägget byter formulering, aldrig produkt
   ------------------------------------------------------------------------ */

let overlayChangedProduct = null
for (const combo of combos) {
  if (combo.q1 === 'vard') continue
  const before = safeResolve(combo)
  const after = safeResolve({ ...combo, q1: 'vard' })
  if (!before || !after) {
    overlayChangedProduct ??= `utfall saknas för ${JSON.stringify(combo)}`
  } else if (before.outcomeId !== after.outcomeId) {
    overlayChangedProduct ??= `${JSON.stringify(combo)}: ${before.outcomeId} -> ${after.outcomeId}`
  }
}
check(
  'Byte till vård ändrar aldrig vilket utfall som ges',
  overlayChangedProduct === null,
  overlayChangedProduct ?? ''
)

/* ---------------------------------------------------------------------------
   4. Inga döda rader, inga onåbara utfall
   ------------------------------------------------------------------------ */

const deadRules = OUTCOME_RULES.filter((r) => !reachedRules.has(r.id)).map((r) => r.id)
check('Varje rad i utfallstabellen är nåbar', deadRules.length === 0, deadRules.join(', '))

const unreachable = [...VALID_OUTCOMES].filter((o) => !reachedOutcomes.has(o))
check('Varje utfall är nåbart', unreachable.length === 0, unreachable.join(', '))

/* ---------------------------------------------------------------------------
   5. Villkorslogiken kring fråga 6
   ------------------------------------------------------------------------ */

let wrongVisibility = null
let orphanSurvived = null

for (const combo of combos) {
  const ids = visibleQuestions(combo).map((q) => q.id)
  const shouldAsk = combo.q3 !== 'svarar-sjalv'
  if (ids.includes('q6') !== shouldAsk) {
    wrongVisibility ??= JSON.stringify(combo)
  }
  if (!isComplete(combo)) {
    wrongVisibility ??= `ofullständig: ${JSON.stringify(combo)}`
  }

  /* Backa till fråga 3 och byt till "svarar nästan alltid": q6-svaret måste bort. */
  if (combo.q6 !== undefined) {
    const flipped = clearOrphanedAnswers({ ...combo, q3: 'svarar-sjalv' })
    if (flipped.q6 !== undefined) orphanSurvived ??= JSON.stringify(combo)
    if (flipped.q1 !== combo.q1 || flipped.q5 !== combo.q5) {
      orphanSurvived ??= `övriga svar tappades: ${JSON.stringify(combo)}`
    }
  }
}

check('Fråga 6 visas exakt när fråga 3 inte är "svarar nästan alltid"', wrongVisibility === null, wrongVisibility ?? '')
check('Föräldralöst q6-svar rensas vid byte av fråga 3', orphanSurvived === null, orphanSurvived ?? '')

/* Innan fråga 3 är besvarad ska fråga 6 inte ligga i vägen. */
check(
  'Fråga 6 ligger inte i vägen innan fråga 3 besvarats',
  !visibleQuestions({ q1: 'hantverk' }).some((q) => q.id === 'q6')
)

/* ---------------------------------------------------------------------------
   6. Progressetiketter
   ------------------------------------------------------------------------ */

const labelProblems = QUESTIONS.map((q, i) => {
  const label = stepLabel(q.id)
  const expected = i < NUMBERED_QUESTIONS ? `Fråga ${i + 1} av ${NUMBERED_QUESTIONS}` : 'Sista frågan'
  return label === expected ? null : `${q.id}: "${label}" != "${expected}"`
}).filter(Boolean)
check('Progressetiketterna följer 1 till 5 plus "Sista frågan"', labelProblems.length === 0, labelProblems.join('; '))

/* ---------------------------------------------------------------------------
   7. Datadrift mellan QUESTIONS och OPTION_IDS
   ------------------------------------------------------------------------ */

const driftProblems = []
for (const question of QUESTIONS) {
  const fromQuestions = question.options.map((o) => o.id).join(',')
  const fromIds = OPTION_IDS[question.id].join(',')
  if (fromQuestions !== fromIds) driftProblems.push(`${question.id}: [${fromQuestions}] != [${fromIds}]`)
  for (const option of question.options) {
    if (answerLabel(question.id, option.id) !== option.label) {
      driftProblems.push(`${question.id}/${option.id}: etikettuppslaget svarar fel`)
    }
  }
}
check('OPTION_IDS speglar QUESTIONS exakt', driftProblems.length === 0, driftProblems.join('; '))

const echoProblems = OPTION_IDS.q1.filter((id) => !BRANSCH_EKO[id])
check('Varje bransch har ett ekofras', echoProblems.length === 0, echoProblems.join(', '))

/* ---------------------------------------------------------------------------
   7b. Utfallscopyn
   ------------------------------------------------------------------------ */

/* Priserna ur fas 0 §1, restaterade här. Stat-siffrorna är låsta (planen §3),
   så ett tyst byte i copyn ska fälla grinden. */
const SPEC_PRICES = {
  'allt-i-ett': 'Från 14 995 kr att komma igång, sedan 2 295 kr i månaden.',
  hemsida: 'Från 8 000 kr att komma igång, sedan 399 kr i månaden.',
  'ai-receptionist': 'Från 7 000 kr att komma igång, sedan 1 495 kr i månaden.',
  chatbot: 'Från 4 000 kr att komma igång, sedan 695 kr i månaden.',
}

/* Halveringsvillkoret gäller ENDAST hemsidan (fas 0 §1, *Internt*). */
const SPEC_TRUST_OUTCOME = 'hemsida'

/* Rad två per REGEL, inte per utfall. Rad 4 och fallbacken delar utfall men
   inte människa, så de får inte dela rad två. */
const SPEC_SECONDARY = {
  'r1-ingen-gammal-missar': null,
  'r2-ingen-gammal-svarar': 'chatten',
  'r3-nojd-missar': null,
  'r4-nojd-samma-fragor': 'receptionisten',
  'fallback-chatbot': null,
}

const copyProblems = []
for (const id of OUTCOME_IDS) {
  const copy = OUTCOME_COPY[id]
  if (!copy) {
    copyProblems.push(`${id}: saknar copy`)
    continue
  }
  for (const field of ['heading', 'body', 'price']) {
    if (!copy[field] || copy[field].trim().length === 0) copyProblems.push(`${id}: tom ${field}`)
  }
  if (copy.price !== SPEC_PRICES[id]) {
    copyProblems.push(`${id}: pris "${copy.price}" != fas 0 §1`)
  }
  const hasTrust = copy.trust !== undefined
  if (hasTrust !== (id === SPEC_TRUST_OUTCOME)) {
    copyProblems.push(`${id}: halveringsraden ${hasTrust ? 'finns men ska inte' : 'saknas'}`)
  }
}
check('Varje utfall har rubrik, utfallstext och rätt pris', copyProblems.length === 0, copyProblems.join('; '))

const secondaryProblems = []
const ruleIds = OUTCOME_RULES.map((r) => r.id)
for (const ruleId of ruleIds) {
  if (!(ruleId in SECONDARY_LINE)) {
    secondaryProblems.push(`${ruleId}: saknar post i SECONDARY_LINE`)
    continue
  }
  const line = SECONDARY_LINE[ruleId]
  const expected = SPEC_SECONDARY[ruleId]
  if (expected === null && line !== null) secondaryProblems.push(`${ruleId}: har rad två men ska sakna`)
  if (expected !== null && (line === null || !line.includes(expected))) {
    secondaryProblems.push(`${ruleId}: rad två nämner inte "${expected}"`)
  }
}
for (const key of Object.keys(SECONDARY_LINE)) {
  if (!ruleIds.includes(key)) secondaryProblems.push(`${key}: rad två utan matchande regel`)
}
check('Rad två hänger på rätt regel', secondaryProblems.length === 0, secondaryProblems.join('; '))

/* Genom hela matrisen: halveringsraden får aldrig läcka till en annan produkt,
   och överlägget ska byta exakt sista raden. */
let trustLeak = null
let ctaProblem = null
for (const combo of combos) {
  const shown = presentOutcome(combo)

  if ((shown.trust !== undefined) !== (shown.outcomeId === SPEC_TRUST_OUTCOME)) {
    trustLeak ??= `${JSON.stringify(combo)} -> ${shown.outcomeId}, trust=${shown.trust}`
  }

  const expectedCta = shown.careOverlay ? CARE_CTA_LINE : ctaLine(shown.echo)
  if (shown.cta !== expectedCta) {
    ctaProblem ??= `${JSON.stringify(combo)}: "${shown.cta}"`
  }
  if (!shown.careOverlay && !shown.cta.includes(shown.echo)) {
    ctaProblem ??= `${JSON.stringify(combo)}: branschekot saknas i sista raden`
  }
  if (shown.secondary !== (SECONDARY_LINE[shown.ruleId] ?? null)) {
    ctaProblem ??= `${JSON.stringify(combo)}: fel rad två`
  }
}
check('Halveringsraden läcker aldrig till chatbot, receptionist eller paket', trustLeak === null, trustLeak ?? '')
check('Sista raden bär branschekot, eller vård-löftet vid överlägg', ctaProblem === null, ctaProblem ?? '')

/* ---------------------------------------------------------------------------
   8. Copy-regler som går att maskinkontrollera
   ------------------------------------------------------------------------ */

/** Every string the visitor can actually read, outcome copy included. */
const VISIBLE_STRINGS = [
  ...QUESTIONS.flatMap((q) => [q.prompt, ...q.options.map((o) => o.label)]),
  ...Object.values(BRANSCH_EKO),
  ...Object.values(KONTAKTSATT_LABEL),
  ...Object.values(KONTAKTSATT_BEKRAFTELSE),
  ...QUESTIONS.map((q) => stepLabel(q.id)),
  ...Object.values(OUTCOME_COPY).flatMap((c) =>
    [c.heading, c.body, c.price, c.trust].filter(Boolean)
  ),
  ...Object.values(SECONDARY_LINE).filter(Boolean),
  ...Object.values(BRANSCH_EKO).map((echo) => ctaLine(echo)),
  CARE_CTA_LINE,
  ...Object.values(GUIDE_UI_COPY),
  ...Object.values(GUIDE_VALIDATION),
]

/* Hård regel 15: inga em-dash eller en-dash i synlig text. Guidens strängar
   innehåller inga sifferintervall, så undantaget är inte aktuellt här. */
const dashHits = VISIBLE_STRINGS.filter((s) => /[—–]/.test(s))
check('Inga tankstreck i synlig text (hård regel 15)', dashHits.length === 0, dashHits.join(' | '))

/* Klarspråks-ordlistan i CLAUDE.md. Ordgränser så "annat" och liknande inte
   ger falska träffar. */
const FORBIDDEN = [
  'SEO', 'sökmotoroptimering', 'mobilanpassad', 'responsiv', 'CTA',
  'call-to-action', 'konverteringsoptimerad', 'tech stack', 'Next\\.js',
  'Edge Computing', 'UX', 'användbarhet', 'Lighthouse', 'headless',
  'A/B-testning', 'B2B', 'social proof', 'hosting', 'MRR', 'ARPU', 'churn',
]
const wordHits = []
for (const term of FORBIDDEN) {
  const re = new RegExp(`\\b${term}\\b`, 'i')
  for (const s of VISIBLE_STRINGS) if (re.test(s)) wordHits.push(`"${term}" i "${s}"`)
}
check('Inga tekniska begrepp ur ordlistan i synlig text', wordHits.length === 0, wordHits.join('; '))

/* Inga utropstecken i synlig text (CLAUDE.md språkregel). Gällde tidigare bara
   frågorna; sveper nu allt, inklusive bekräftelser och valideringsmeddelanden. */
const bangHits = VISIBLE_STRINGS.filter((s) => s.includes('!'))
check('Inga utropstecken i synlig text', bangHits.length === 0, bangHits.join(' | '))

/* ---------------------------------------------------------------------------
   Sammanfattning
   ------------------------------------------------------------------------ */

console.log(
  failures === 0
    ? `\n✓ ALL GUIDE MATRIX RULES PASS (${combos.length} kombinationer)\n`
    : `\n✗ ${failures} GUIDE MATRIX FAILURE(S)\n`
)
process.exit(failures === 0 ? 0 : 1)
