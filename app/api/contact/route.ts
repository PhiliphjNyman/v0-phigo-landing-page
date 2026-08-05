import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

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
  if (isRateLimited(getClientIp(request))) {
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
