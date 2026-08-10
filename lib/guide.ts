/**
 * Guiden "Hitta rätt lösning" — logiklagret.
 *
 * Single source of truth for the guide's questions, options, outcome ordering
 * and lead mapping. Deliberately free of JSX and of any import from the app so
 * that `scripts/guide-matrix.mjs` can import it directly (Node strips the types)
 * and enumerate every possible combination without a browser.
 *
 * Copy source: Fas0_produktdefinitioner.md §5 (LÅST). Nothing here is written
 * freehand — question prompts, option labels and the industry echoes are
 * verbatim or Hugo-signed. See implementationsplanen §9.1.
 *
 * Answers travel as ids, never as labels. The server validates them with
 * z.enum() against OPTION_IDS below, so the only free text a visitor can send is
 * their name, phone and email. Labels are looked up server-side from this same
 * file, which also means the HubSpot mapping in fas 5 reads the ids and does not
 * break when copy is reworded.
 */

/* ---------------------------------------------------------------- frågor --- */

export type QuestionId = 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6'

/** Fråga 1 — bransch. Styr ordval i utfallet och blir Lead-kategori i HubSpot. */
export type BranschId = 'hantverk' | 'verkstad' | 'vard' | 'butik' | 'annat'
/** Fråga 2 — nuvarande hemsida. Avgör om hemsidan ingår i rekommendationen. */
export type SajtId = 'ingen' | 'gammal' | 'nojd'
/** Fråga 3 — obesvarade samtal. Guidens viktigaste fråga. */
export type SamtalId = 'rostbrevlada' | 'ringer-ut' | 'kollega' | 'svarar-sjalv'
/** Fråga 4 — var kunderna kommer ifrån. */
export type KundkallaId = 'rekommendationer' | 'google' | 'skyltlage' | 'vet-inte'
/** Fråga 5 — vad som betyder mest. Prioriterar rubrikvinkeln. */
export type BehovId =
  | 'fler-forfragningar'
  | 'sluta-missa-samtal'
  | 'slippa-samma-fragor'
  | 'mer-tid'
/** Fråga 6 — samtalsvolym mot 300-minuterspoolen. Endast om fråga 3 ≠ svarar-sjalv. */
export type VolymId = 'enstaka' | '5-15' | 'fler-an-15'

export interface GuideAnswers {
  q1?: BranschId
  q2?: SajtId
  q3?: SamtalId
  q4?: KundkallaId
  q5?: BehovId
  q6?: VolymId
}

export interface GuideOption {
  id: string
  label: string
}

export interface GuideQuestion {
  id: QuestionId
  prompt: string
  options: readonly GuideOption[]
  /** Frånvarande = frågan visas alltid. Endast fråga 6 är villkorad. */
  showIf?: (answers: GuideAnswers) => boolean
}

export const QUESTIONS: readonly GuideQuestion[] = [
  {
    id: 'q1',
    prompt: 'Vad gör ditt företag?',
    options: [
      { id: 'hantverk', label: 'Hantverk eller bygg' },
      { id: 'verkstad', label: 'Verkstad eller service' },
      { id: 'vard', label: 'Vård eller behandling' },
      { id: 'butik', label: 'Butik eller restaurang' },
      { id: 'annat', label: 'Annat' },
    ],
  },
  {
    id: 'q2',
    prompt: 'Hur ser din hemsida ut idag?',
    options: [
      { id: 'ingen', label: 'Har ingen' },
      { id: 'gammal', label: 'Har en, men den är gammal' },
      { id: 'nojd', label: 'Har en jag är nöjd med' },
    ],
  },
  {
    id: 'q3',
    prompt: 'Vad händer när någon ringer och du inte kan svara?',
    options: [
      { id: 'rostbrevlada', label: 'Röstbrevlåda' },
      { id: 'ringer-ut', label: 'Det ringer bara ut' },
      { id: 'kollega', label: 'Kollega eller familj svarar ibland' },
      { id: 'svarar-sjalv', label: 'Jag svarar nästan alltid' },
    ],
  },
  {
    id: 'q4',
    prompt: 'Var kommer dina kunder ifrån idag?',
    options: [
      { id: 'rekommendationer', label: 'Rekommendationer och stammisar' },
      { id: 'google', label: 'Google och nätet' },
      { id: 'skyltlage', label: 'Skyltläge och förbipasserande' },
      { id: 'vet-inte', label: 'Vet faktiskt inte' },
    ],
  },
  {
    id: 'q5',
    prompt: 'Vad skulle betyda mest för dig just nu?',
    options: [
      { id: 'fler-forfragningar', label: 'Fler förfrågningar' },
      { id: 'sluta-missa-samtal', label: 'Sluta missa samtal' },
      { id: 'slippa-samma-fragor', label: 'Slippa svara på samma frågor' },
      { id: 'mer-tid', label: 'Mer tid över' },
    ],
  },
  {
    id: 'q6',
    prompt: 'Ungefär hur många samtal får du en vanlig dag?',
    options: [
      { id: 'enstaka', label: 'Några enstaka' },
      { id: '5-15', label: '5 till 15' },
      { id: 'fler-an-15', label: 'Fler än 15' },
    ],
    /* Fas 0 §5: ställs bara till den som INTE svarar nästan alltid. Kravet på
       att q3 är besvarad gör listan korrekt även innan användaren nått fråga 3. */
    showIf: (answers) => answers.q3 !== undefined && answers.q3 !== 'svarar-sjalv',
  },
]

/** Tuple-formade id-listor så både appen och zod-schemat läser samma sanning. */
export const OPTION_IDS = {
  q1: ['hantverk', 'verkstad', 'vard', 'butik', 'annat'],
  q2: ['ingen', 'gammal', 'nojd'],
  q3: ['rostbrevlada', 'ringer-ut', 'kollega', 'svarar-sjalv'],
  q4: ['rekommendationer', 'google', 'skyltlage', 'vet-inte'],
  q5: ['fler-forfragningar', 'sluta-missa-samtal', 'slippa-samma-fragor', 'mer-tid'],
  q6: ['enstaka', '5-15', 'fler-an-15'],
} as const satisfies Record<QuestionId, readonly [string, ...string[]]>

/* ------------------------------------------------------------- ekofraser --- */

/**
 * Branschekot i utfallets sista rad (fas 0 §5: "Branschekot från fråga 1 alltid
 * med"). Hugo-signerade formuleringar 2026-08-10. "Annat" faller tillbaka på en
 * neutral fras eftersom "för annat" inte går att skriva.
 */
export const BRANSCH_EKO: Record<BranschId, string> = {
  hantverk: 'för ett hantverksföretag som ditt',
  verkstad: 'för en verkstad som din',
  vard: 'för en verksamhet som din',
  butik: 'för en butik eller restaurang som din',
  annat: 'för din verksamhet',
}

/* ------------------------------------------------------------- utfall ------ */

export type OutcomeId = 'allt-i-ett' | 'hemsida' | 'ai-receptionist' | 'chatbot'

/** Runtime-listan över utfall. Grinden mäter nåbarhet mot DEN här, inte mot
    utfallstabellen, så en bortglömd rad syns som ett onåbart utfall. */
export const OUTCOME_IDS = ['allt-i-ett', 'hemsida', 'ai-receptionist', 'chatbot'] as const

/** Utfall som innehåller receptionisten. Styr vård-överlägget (rad 1 och 3). */
export const OUTCOMES_WITH_RECEPTIONIST: readonly OutcomeId[] = [
  'allt-i-ett',
  'ai-receptionist',
]

/** Fas 0 §5: "missar samtal" = allt utom "Jag svarar nästan alltid". */
export const MISSAR_SAMTAL: readonly SamtalId[] = ['rostbrevlada', 'ringer-ut', 'kollega']

function missarSamtal(answers: GuideAnswers): boolean {
  return answers.q3 !== undefined && (MISSAR_SAMTAL as readonly string[]).includes(answers.q3)
}

/** Ingen eller gammal sajt. "Nöjd" får aldrig en hemsidepitch påtvingad. */
function behoverSajt(answers: GuideAnswers): boolean {
  return answers.q2 === 'ingen' || answers.q2 === 'gammal'
}

export interface OutcomeRule {
  id: string
  outcomeId: OutcomeId
  when: (answers: GuideAnswers) => boolean
}

/**
 * Utfallstabellen ur fas 0 §5, i deterministisk ordning: raderna prövas uppifrån
 * och ned och FÖRSTA träffen vinner. Rad 1 och 2 täcker tillsammans hela
 * {ingen, gammal} eftersom missarSamtal är en boolean, och rad 3 till 5 täcker
 * hela {nojd}. Uttömmande per konstruktion; `scripts/guide-matrix.mjs` bevisar
 * det ändå genom uppräkning av samtliga kombinationer.
 */
export const OUTCOME_RULES: readonly OutcomeRule[] = [
  {
    id: 'r1-ingen-gammal-missar',
    outcomeId: 'allt-i-ett',
    when: (a) => behoverSajt(a) && missarSamtal(a),
  },
  {
    id: 'r2-ingen-gammal-svarar',
    outcomeId: 'hemsida',
    when: (a) => behoverSajt(a) && !missarSamtal(a),
  },
  {
    id: 'r3-nojd-missar',
    outcomeId: 'ai-receptionist',
    when: (a) => a.q2 === 'nojd' && missarSamtal(a),
  },
  {
    id: 'r4-nojd-samma-fragor',
    outcomeId: 'chatbot',
    when: (a) => a.q2 === 'nojd' && a.q5 === 'slippa-samma-fragor',
  },
  {
    id: 'fallback-chatbot',
    outcomeId: 'chatbot',
    when: () => true,
  },
]

export interface ResolvedOutcome {
  outcomeId: OutcomeId
  /** Vård/behandling + receptionist i utfallet. Byter löftesformulering, aldrig produkt. */
  careOverlay: boolean
  /** Branschekot till utfallets sista rad. */
  echo: string
  /** Vilken rad som träffade. Följer med leadet och gör grinden läsbar. */
  ruleId: string
}

export function resolveOutcome(answers: GuideAnswers): ResolvedOutcome {
  const rule = OUTCOME_RULES.find((r) => r.when(answers))

  /* Kan inte inträffa (sista raden är ovillkorad) men typerna vet inte det, och
     ett tyst undefined vore värre än ett högljutt fel. */
  if (!rule) {
    throw new Error('resolveOutcome: ingen regel träffade, utfallstabellen är trasig')
  }

  const careOverlay =
    answers.q1 === 'vard' && OUTCOMES_WITH_RECEPTIONIST.includes(rule.outcomeId)

  return {
    outcomeId: rule.outcomeId,
    careOverlay,
    echo: answers.q1 ? BRANSCH_EKO[answers.q1] : BRANSCH_EKO.annat,
    ruleId: rule.id,
  }
}

/* --------------------------------------------------------- utfallscopy ----- */

/**
 * Utfallstexterna. Skelettet är fas 0 §5:s Johnny-regel: UTFALL + pris + CTA,
 * aldrig en spec- eller funktionslista. Allt-i-ett står ordagrant i §5; de tre
 * andra är omskrivningar ur §2 till §4:s låsta Outcome-stycken, signerade av
 * Hugo 2026-08-10.
 */
export interface OutcomeCopy {
  /** Rubrikraden: "Det här skulle ge dig mest: ..." */
  heading: string
  /** Utfallet i klarspråk. Aldrig funktioner, alltid vad kunden får ut. */
  body: string
  /** Alltid "från"-pris (fas 0 §5). */
  price: string
  /**
   * Halveringsvillkoret. Finns ENDAST på hemsidan: chatbot, receptionist och
   * paket faktureras fullt vid start, så raden får aldrig visas vid dem
   * (fas 0 §1, *Internt*). Grinden bevisar att den inte läcker.
   */
  trust?: string
}

export const OUTCOME_COPY: Record<OutcomeId, OutcomeCopy> = {
  'allt-i-ett': {
    heading: 'Det här skulle ge dig mest: en digital reception som jobbar dygnet runt.',
    body:
      'En hemsida som får besökare att höra av sig. En chatt som svarar direkt på ' +
      'sidan. En receptionist som tar samtalen du missar och bokar in kunderna i ' +
      'din kalender.',
    price: 'Från 14 995 kr att komma igång, sedan 2 295 kr i månaden.',
  },
  hemsida: {
    heading: 'Det här skulle ge dig mest: en hemsida som får folk att höra av sig.',
    body:
      'Du svarar redan i telefon när det ringer. Det som saknas är att fler hittar ' +
      'dig och att de som hittar dig faktiskt tar kontakt. Vi bygger en sajt som ' +
      'visar vad du gör och gör det enkelt att höra av sig, live inom 14 dagar.',
    price: 'Från 8 000 kr att komma igång, sedan 399 kr i månaden.',
    trust: 'Betala hälften nu, resten först när du är nöjd.',
  },
  'ai-receptionist': {
    heading: 'Det här skulle ge dig mest: en receptionist som svarar när du inte hinner.',
    body:
      'Sluta tappa kunder för att du inte kan svara. Varje samtal besvaras direkt, ' +
      'även när du står mitt i ett jobb, har stängt eller är ledig. Bokningar hamnar ' +
      'i din kalender och du får besked om varje samtal.',
    price: 'Från 7 000 kr att komma igång, sedan 1 495 kr i månaden.',
  },
  chatbot: {
    heading: 'Det här skulle ge dig mest: en chatt som svarar direkt på din sida.',
    body:
      'Besökare som får svar direkt stannar kvar. Chatten svarar på vanliga frågor ' +
      'om priser, öppettider och tjänster, hjälper besökaren rätt och ser till att ' +
      'du får namn och nummer på den som vill bli kontaktad.',
    price: 'Från 4 000 kr att komma igång, sedan 695 kr i månaden.',
  },
}

/**
 * "Rad två" hänger på REGELN, inte på utfallet. Rad 4 och fallbacken ger båda
 * chatbot men är olika människor: rad 4 vill slippa samma frågor, fallbacken är
 * nöjd med sajten och svarar själv i telefon. Att erbjuda den senare en
 * receptionist som nästa steg vore fel. Fas 0 §5 anger rad två endast för rad 2
 * och rad 4; övriga rader har ingen.
 */
export const SECONDARY_LINE: Record<string, string | null> = {
  'r1-ingen-gammal-missar': null,
  'r2-ingen-gammal-svarar':
    'Vill du dessutom slippa svara på samma frågor om och om igen finns chatten som nästa steg.',
  'r3-nojd-missar': null,
  'r4-nojd-samma-fragor':
    'Är det telefonen som ringer obesvarad är receptionisten nästa steg.',
  'fallback-chatbot': null,
}

/** Standard-CTA. Branschekot ligger alltid sist (fas 0 §5). */
export function ctaLine(echo: string): string {
  return `Lämna dina uppgifter så hör vi av oss inom en arbetsdag och berättar exakt hur det skulle fungera ${echo}.`
}

/**
 * Vård-överläggets CTA. Byter löftesformulering, aldrig produkt eller pris.
 * Ur fas 0 §3: "vi ringer upp och ser om det passar din verksamhet."
 */
export const CARE_CTA_LINE =
  'Lämna dina uppgifter så ringer vi upp och ser om det passar din verksamhet.'

export interface PresentedOutcome extends ResolvedOutcome, OutcomeCopy {
  /** Null när regeln inte har någon rad två. */
  secondary: string | null
  /** Färdig sista rad, med överlägget redan applicerat. */
  cta: string
}

/** Utfallet färdigt att rendera. Komponenten behöver inget mer än det här. */
export function presentOutcome(answers: GuideAnswers): PresentedOutcome {
  const resolved = resolveOutcome(answers)
  const copy = OUTCOME_COPY[resolved.outcomeId]

  return {
    ...resolved,
    ...copy,
    secondary: SECONDARY_LINE[resolved.ruleId] ?? null,
    cta: resolved.careOverlay ? CARE_CTA_LINE : ctaLine(resolved.echo),
  }
}

/* ---------------------------------------------------------- navigering ----- */

/** Frågorna som ingår i vägen givet svaren hittills, i ordning. */
export function visibleQuestions(answers: GuideAnswers): readonly GuideQuestion[] {
  return QUESTIONS.filter((q) => !q.showIf || q.showIf(answers))
}

/**
 * Släpper svar på frågor som inte längre ingår i vägen. Utan detta skulle ett
 * q6-svar överleva att användaren backar och byter fråga 3 till "svarar nästan
 * alltid", och ett inaktuellt svar skulle följa med in i leadet.
 */
export function clearOrphanedAnswers(answers: GuideAnswers): GuideAnswers {
  const visible = new Set(visibleQuestions(answers).map((q) => q.id))
  const next: GuideAnswers = {}

  for (const question of QUESTIONS) {
    if (visible.has(question.id) && answers[question.id] !== undefined) {
      /* Nycklarna är parvis typade mot sina egna union-typer, så en generisk
         kopiering kräver en assertion här. Värdet är oförändrat. */
      Object.assign(next, { [question.id]: answers[question.id] })
    }
  }

  return next
}

/** Alla synliga frågor besvarade. */
export function isComplete(answers: GuideAnswers): boolean {
  return visibleQuestions(answers).every((q) => answers[q.id] !== undefined)
}

/**
 * Progressetikett. Fas 0 §5 (beslut 2026-08-10): introt lovar fem frågor, alltså
 * räknas fråga 1 till 5 mot fem och fråga 6 renderas som "Sista frågan" utan
 * nummer. Nämnaren ändras aldrig mitt i flödet.
 */
export const NUMBERED_QUESTIONS = 5

export function stepLabel(questionId: QuestionId): string {
  const index = QUESTIONS.findIndex((q) => q.id === questionId)
  if (index < 0) throw new Error(`stepLabel: okänd fråga ${questionId}`)
  if (index >= NUMBERED_QUESTIONS) return 'Sista frågan'
  return `Fråga ${index + 1} av ${NUMBERED_QUESTIONS}`
}

/* ------------------------------------------------------------ leadet ------- */

export type KontaktsattId = 'ring' | 'mejl'

export const KONTAKTSATT_LABEL: Record<KontaktsattId, string> = {
  ring: 'Ring mig',
  mejl: 'Mejla mig',
}

/**
 * Bekräftelsetexten speglar valet ordagrant (fas 0 §5). Den som valt mejl rings
 * inte upp först, alltså får texten inte generaliseras.
 */
export const KONTAKTSATT_BEKRAFTELSE: Record<KontaktsattId, string> = {
  ring: 'Vi ringer upp dig inom en arbetsdag.',
  mejl: 'Vi mejlar dig inom en arbetsdag.',
}

/**
 * Guidens gränssnittstexter och valideringsmeddelanden. De bor HÄR och inte i
 * komponenterna av ett skäl: matrisgrindens copy-svep (tankstreck, ordlistan,
 * utropstecken) läser den här filen, så en sträng i en komponent skulle vara
 * osynlig för kontrollen. Signerade av Hugo 2026-08-10, se fas 0 §5.
 */
export const GUIDE_UI_COPY = {
  back: 'Tillbaka',
  fieldHelp:
    'Fyll i telefonnumret om du vill bli uppringd, e-posten om du hellre vill bli mejlad.',
  declineLink: 'Jag vill inte lämna mina uppgifter nu',
  /* Avslut utan kontaktuppgifter. Mejlvägen tills receptionistnumret är live;
     ingen platshållare i copyn (fas 0 §5, omskriven 2026-08-10). */
  declineLead: 'Inga problem. Mejla oss på',
  declineTail: 'så hör vi av oss.',
  confirmationHeading: 'Tack, vi hör av oss',
} as const

/**
 * Valideringsmeddelanden. Namn, e-post och samtycke följer kontaktformulärets
 * befintliga formuleringar ordagrant så sajten talar med en röst.
 */
export const GUIDE_VALIDATION = {
  namn: 'Namn måste vara minst 2 tecken',
  epostFormat: 'Ange en giltig e-postadress',
  telefon: 'Fyll i ett telefonnummer så vi kan ringa upp.',
  epostValbero: 'Fyll i e-post om du hellre vill bli mejlad.',
  gdpr: 'Du måste godkänna integritetspolicyn för att skicka formuläret',
} as const

/** HubSpot-mappning (fas 5). Fältnamnen bor här så kopplingen slipper gissa. */
export const HUBSPOT_FIELD: Record<QuestionId, string> = {
  q1: 'Lead-kategori',
  q2: 'Hemsida idag',
  q3: 'Obesvarade samtal',
  q4: 'Kundkälla',
  q5: 'Viktigast just nu',
  q6: 'Samtalsvolym',
}

export const HUBSPOT_SOURCE = 'Guiden'
export const HUBSPOT_PIPELINE_STAGE = 'Guide-lead'

/** Etikettuppslag för serverrendering av leadet. Okända id:n ger null. */
export function answerLabel(questionId: QuestionId, optionId: string): string | null {
  const question = QUESTIONS.find((q) => q.id === questionId)
  return question?.options.find((o) => o.id === optionId)?.label ?? null
}
