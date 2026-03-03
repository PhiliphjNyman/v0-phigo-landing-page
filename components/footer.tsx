import { PhigoLogo } from '@/components/phigo-logo'

const footerLinks = [
  { label: 'Case', href: '#case' },
  { label: 'Tjänster', href: '#tjanster' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <PhigoLogo size="lg" />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Vi bygger moderna, snabba och konverteringsfokuserade webbplatser
              för B2B-företag som vill växa digitalt.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Sidfot navigation" className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </span>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} PHIGO. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  )
}
