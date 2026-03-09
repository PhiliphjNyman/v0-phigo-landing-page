import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  namn: z.string().min(2),
  foretag: z.string().min(2),
  epost: z.string().email(),
  hemsida: z.string().url().optional().or(z.literal('')),
  forbattra: z.string().min(1),
  meddelande: z.string().min(10),
})

const forbattraLabels: Record<string, string> = {
  'ny-sajt': 'Vi behöver en helt ny sajt',
  'omdesign': 'Omdesign av befintlig sajt',
  'prestanda': 'Förbättra prestanda och laddtid',
  'konvertering': 'Öka konvertering och leads',
  'e-handel': 'E-handelslösning',
  'ovrigt': 'Övrigt',
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const body = await request.json()

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Ogiltig formulärdata' }, { status: 400 })
  }

  const { namn, foretag, epost, hemsida, forbattra, meddelande } = result.data

  const { error } = await resend.emails.send({
    from: 'PHIGO <noreply@phigo.se>',
    to: 'info@phigo.se',
    replyTo: epost,
    subject: `Ny analysförfrågan från ${namn} – ${foretag}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
        <h2 style="color: #059669;">Ny analysförfrågan via phigo.se</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Namn</td><td>${namn}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Företag</td><td>${foretag}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">E-post</td><td><a href="mailto:${epost}">${epost}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Hemsida</td><td>${hemsida ? `<a href="${hemsida}">${hemsida}</a>` : '–'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Vill förbättra</td><td>${forbattraLabels[forbattra] ?? forbattra}</td></tr>
        </table>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <h3 style="margin-top: 0;">Meddelande</h3>
        <p style="white-space: pre-wrap; color: #374151;">${meddelande}</p>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Kunde inte skicka e-post' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
