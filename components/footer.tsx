import { PhigoLogo } from '@/components/phigo-logo'
import Link from 'next/link'

const footerLinks = [
  { label: 'Exempel', href: '/cases' },
  { label: 'Erbjudande', href: '/#erbjudande' },
  { label: 'Så funkar det', href: '/#process' },
  { label: 'Vanliga frågor', href: '/#faq' },
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
              Vi bygger hemsidor som ger lokala företag fler kunder. Fast pris,
              klart inom 14 dagar.
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
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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
