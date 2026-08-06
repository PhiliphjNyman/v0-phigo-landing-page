import { PhigoLogo } from '@/components/phigo-logo'
import Link from 'next/link'

/* Product links mirror the desktop nav order (Exempel, Hemsida,
   AI-Receptionist, Chatbot) — the footer lagged behind fas 2 and only knew
   about the hemsida product. */
const footerLinks = [
  { label: 'Exempel', href: '/cases' },
  { label: 'Hemsida', href: '/hemsida' },
  { label: 'AI-Receptionist', href: '/ai-receptionist' },
  { label: 'Chatbot', href: '/chatbot' },
  { label: 'Blogg', href: '/blogg' },
  { label: 'Så funkar det', href: '/hemsida#process' },
  { label: 'Om oss', href: '/#om-oss' },
  { label: 'Vanliga frågor', href: '/hemsida#faq' },
  { label: 'Kontakt', href: '/#kontakt' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" aria-label="PHIGO - Hem">
              <PhigoLogo size="lg" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
              Vi bygger hemsidor som ger lokala företag fler kunder. Baserade i
              Linköping, klart inom 14 dagar.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Sidfot navigation" className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase text-muted-foreground">
              Navigation
            </span>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase text-muted-foreground">
              Kontakt
            </span>
            <a
              href="mailto:info@phigo.se"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              info@phigo.se
            </a>
            <span className="text-sm text-muted-foreground">
              Linköping, Sverige
            </span>
          </div>
        </div>

        {/* Bottom row: centered stack on mobile (the two legal lines read as a
            finished unit, not loose left-aligned rows), reverting to the desktop
            left/right split at sm. Copyright nearly fills the line at 360px, so a
            single-line "·" separator isn't feasible on phones without dropping
            copy — centered stack is the clean result. */}
        <div className="mt-10 border-t border-border pt-6 flex flex-col items-center gap-1 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} PHIGO. Alla rättigheter förbehållna.
          </p>
          <Link
            href="/integritetspolicy"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Integritetspolicy
          </Link>
        </div>
      </div>
    </footer>
  )
}
