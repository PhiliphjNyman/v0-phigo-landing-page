import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import {
  HUBSPOT_FIELD,
  HUBSPOT_PIPELINE_STAGE,
  HUBSPOT_SOURCE,
  KONTAKTSATT_LABEL,
  OPTION_IDS,
  OUTCOME_COPY,
  OUTCOME_IDS,
  QUESTIONS,
  answerLabel,
  type QuestionId,
} from '@/lib/guide'

/**
 * Escapes the five HTML-significant characters so form input can never inject
 * markup into the notification email we render and read in our own inbox.
 * Applied to every interpolated value below, including inside attributes.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Collapses line breaks so a value can be used safely in a header line. */
function toSingleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

/** Only http(s) links become anchors — blocks javascript:/data: URLs in href. */
function isSafeHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value)
    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

const contactSchema = z.object({
  namn: z.string().min(2).max(100),
  foretag: z.string().min(2).max(100),
  epost: z.string().email().max(200),
  hemsida: z
    .string()
    .url()
    .max(500)
    .refine(isSafeHttpUrl, { message: 'Ogiltig adress' })
    .optional()
    .or(z.literal('')),
  forbattra: z.string().min(1).max(100),
  meddelande: z.string().min(10).max(5000),
})

const forbattraLabels: Record<string, string> = {
  'ny-sajt': 'Vi behöver en helt ny sajt',
  'omdesign': 'Omdesign av befintlig sajt',
  'prestanda': 'Förbättra prestanda och laddtid',
  'konvertering': 'Öka konvertering och leads',
  'e-handel': 'E-handelslösning',
  'ovrigt': 'Övrigt',
}

/* --------------------------------------------------------------- guiden --- */

/**
 * The guide (fas 5 §9.1) delivers its leads through THIS endpoint rather than a
 * new one: everything hardened in step F (JSON guard, rate limit, escaping,
 * http(s)-only hrefs) applies unchanged. The contact form sends no `source`, so
 * it keeps falling through to the schema below it, untouched.
 *
 * Answers arrive as ids and are validated against the same lists the UI renders
 * from, so the only free text a visitor can send is name, phone and email. The
 * Swedish labels are looked up server-side.
 */
const guideSchema = z
  .object({
    source: z.literal('guide'),
    kontakt: z.object({
      namn: z.string().min(2).max(100),
      /* Loose on purpose: Swedish numbers get written with spaces, dashes,
         parentheses and +46 in every combination. */
      telefon: z.string().regex(/^[\d\s+()-]{6,20}$/).optional(),
      epost: z.string().email().max(200).optional(),
      kontaktsatt: z.enum(['ring', 'mejl']),
    }),
    svar: z.object({
      q1: z.enum(OPTION_IDS.q1),
      q2: z.enum(OPTION_IDS.q2),
      q3: z.enum(OPTION_IDS.q3),
      q4: z.enum(OPTION_IDS.q4),
      q5: z.enum(OPTION_IDS.q5),
      /* Endast om fråga 3 inte är "svarar nästan alltid" (fas 0 §5). */
      q6: z.enum(OPTION_IDS.q6).optional(),
    }),
    utfall: z.enum(OUTCOME_IDS),
  })
  .superRefine((value, ctx) => {
    const { kontaktsatt, telefon, epost } = value.kontakt
    if (kontaktsatt === 'ring' && !telefon) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['kontakt', 'telefon'], message: 'Telefon krävs' })
    }
    if (kontaktsatt === 'mejl' && !epost) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['kontakt', 'epost'], message: 'E-post krävs' })
    }
    /* Fråga 6 ställs bara i receptionist-grenen, så ett svar därifrån när
       fråga 3 är "svarar nästan alltid" betyder att nyttolasten är riggad. */
    if (value.svar.q3 === 'svarar-sjalv' && value.svar.q6 !== undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['svar', 'q6'], message: 'Ogiltig kombination' })
    }
  })

type GuideLead = z.infer<typeof guideSchema>

/** One row per answered question, in the order the visitor saw them. */
function renderAnswerRows(svar: GuideLead['svar']): string {
  return QUESTIONS.filter((question) => svar[question.id] !== undefined)
    .map((question) => {
      const optionId = svar[question.id] as string
      const label = answerLabel(question.id as QuestionId, optionId) ?? optionId
      return `<tr>
          <td style="padding: 8px 0; font-weight: bold; width: 200px;">${escapeHtml(HUBSPOT_FIELD[question.id])}</td>
          <td>${escapeHtml(label)}</td>
        </tr>`
    })
    .join('')
}

function renderGuideEmail(lead: GuideLead): string {
  const { namn, telefon, epost, kontaktsatt } = lead.kontakt
  const safe = {
    namn: escapeHtml(namn),
    telefon: telefon ? escapeHtml(telefon) : '–',
    epost: epost ? escapeHtml(epost) : '–',
    kontaktsatt: escapeHtml(KONTAKTSATT_LABEL[kontaktsatt]),
    rekommendation: escapeHtml(OUTCOME_COPY[lead.utfall].heading),
  }

  return `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
        <h2 style="color: #059669;">Nytt guide-lead via phigo.se</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 200px;">Namn</td><td>${safe.namn}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Telefon</td><td>${safe.telefon}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">E-post</td><td>${epost ? `<a href="mailto:${safe.epost}">${safe.epost}</a>` : '–'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Kontaktsätt</td><td><strong>${safe.kontaktsatt}</strong></td></tr>
        </table>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <h3 style="margin-top: 0;">Rekommendation</h3>
        <p style="color: #374151;">${safe.rekommendation}</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <h3 style="margin-top: 0;">Svar i guiden</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${renderAnswerRows(lead.svar)}
        </table>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="color: #6b7280; font-size: 13px;">
          Källa: ${escapeHtml(HUBSPOT_SOURCE)} &middot; Pipeline: ${escapeHtml(HUBSPOT_PIPELINE_STAGE)}
        </p>
      </div>
    `
}

/**
 * Best-effort in-memory rate limit. On Vercel each serverless instance keeps its
 * own map, so this is a spam speed bump rather than a hard guarantee — it caps
 * what a single client can push through one warm instance. Swap for a shared
 * store (Upstash/KV) if the form ever gets seriously targeted.
 */
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const submissions = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()

  // Drop expired entries so the map cannot grow unbounded on a warm instance.
  for (const [key, entry] of submissions) {
    if (entry.resetAt <= now) submissions.delete(key)
  }

  const entry = submissions.get(ip)
  if (!entry || entry.resetAt <= now) {
    submissions.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > RATE_LIMIT_MAX
}

export async function POST(request: Request) {
  /* The source rides in the query string so the rate limiter can bucket on it
     BEFORE the body is parsed — a guide visitor must not be able to burn the
     contact form's five attempts, and moving the parse ahead of the limiter
     would hand an attacker unlimited JSON parses. Worth knowing: a spammer who
     alternates the parameter gets two buckets instead of one. That is a 2x, not
     an opening, and it buys the form its own untouched quota. */
  const source =
    new URL(request.url).searchParams.get('source') === 'guide' ? 'guide' : 'formular'

  if (isRateLimited(`${getClientIp(request)}:${source}`)) {
    return NextResponse.json(
      { error: 'För många förfrågningar. Försök igen om en stund.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig formulärdata' }, { status: 400 })
  }

  if (source === 'guide') {
    return handleGuideLead(body)
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Ogiltig formulärdata' }, { status: 400 })
  }

  const { namn, foretag, epost, hemsida, forbattra, meddelande } = result.data

  const safe = {
    namn: escapeHtml(namn),
    foretag: escapeHtml(foretag),
    epost: escapeHtml(epost),
    hemsida: hemsida ? escapeHtml(hemsida) : '',
    forbattra: escapeHtml(forbattraLabels[forbattra] ?? forbattra),
    meddelande: escapeHtml(meddelande),
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'PHIGO <noreply@phigo.se>',
    to: 'info@phigo.se',
    replyTo: epost,
    // Subject is plain text, so it needs no HTML escaping — only line breaks
    // are stripped so a pasted newline cannot split the header visually.
    subject: `Ny analysförfrågan från ${toSingleLine(namn)} – ${toSingleLine(foretag)}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
        <h2 style="color: #059669;">Ny analysförfrågan via phigo.se</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Namn</td><td>${safe.namn}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Företag</td><td>${safe.foretag}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">E-post</td><td><a href="mailto:${safe.epost}">${safe.epost}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Hemsida</td><td>${safe.hemsida ? `<a href="${safe.hemsida}">${safe.hemsida}</a>` : '–'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Vill förbättra</td><td>${safe.forbattra}</td></tr>
        </table>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <h3 style="margin-top: 0;">Meddelande</h3>
        <p style="white-space: pre-wrap; color: #374151;">${safe.meddelande}</p>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Kunde inte skicka e-post' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

async function handleGuideLead(body: unknown) {
  const result = guideSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Ogiltig formulärdata' }, { status: 400 })
  }

  const lead = result.data
  const { namn, epost, telefon, kontaktsatt } = lead.kontakt
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'PHIGO <noreply@phigo.se>',
    to: 'info@phigo.se',
    /* E-post är frivillig i ring-vägen (fas 0 §5), så replyTo sätts bara när
       den finns. Utan adress är telefonnumret det enda sättet att nå leadet,
       därför står det i ämnesraden i stället. */
    ...(epost ? { replyTo: epost } : {}),
    subject: `Nytt guide-lead från ${toSingleLine(namn)} (${KONTAKTSATT_LABEL[kontaktsatt]}${
      epost ? '' : `, ${toSingleLine(telefon ?? '')}`
    })`,
    html: renderGuideEmail(lead),
  })

  if (error) {
    console.error('Resend error (guide):', error)
    return NextResponse.json({ error: 'Kunde inte skicka e-post' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
