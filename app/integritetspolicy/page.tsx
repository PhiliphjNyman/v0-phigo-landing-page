import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integritetspolicy – PHIGO',
  description:
    'Läs om hur PHIGO hanterar dina personuppgifter i enlighet med GDPR.',
  alternates: {
    canonical: 'https://phigo.se/integritetspolicy',
  },
  openGraph: {
    title: 'Integritetspolicy – PHIGO',
    description:
      'Läs om hur PHIGO hanterar dina personuppgifter i enlighet med GDPR.',
    url: 'https://phigo.se/integritetspolicy',
    type: 'website',
    locale: 'sv_SE',
  },
}

export default function IntegritetspolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 lg:px-6 lg:py-32">
      <div className="mb-12">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Tillbaka till startsidan
        </Link>
      </div>

      <article className="prose prose-invert prose-emerald max-w-none">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
          Integritetspolicy
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Senast uppdaterad: mars 2026
        </p>

        <Section title="1. Vem vi är">
          <p>
            Denna integritetspolicy gäller för PHIGO, som driver webbplatsen{' '}
            <a
              href="https://phigo.se"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              phigo.se
            </a>
            . Vi erbjuder tjänster inom webbdesign och webbutveckling för
            B2B-företag. Vid frågor om hur vi hanterar dina personuppgifter är
            du välkommen att kontakta oss på{' '}
            <a
              href="mailto:info@phigo.se"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              info@phigo.se
            </a>
            .
          </p>
        </Section>

        <Section title="2. Vilka uppgifter vi samlar in">
          <p>
            Vi samlar in de personuppgifter du lämnar när du fyller i
            kontaktformuläret på vår webbplats. Det rör sig om:
          </p>
          <ul>
            <li>Namn</li>
            <li>Företagsnamn</li>
            <li>E-postadress</li>
            <li>Webbadress (valfri)</li>
            <li>Val av förbättringsområde</li>
            <li>Meddelande</li>
          </ul>
          <p>
            Vi samlar inte in fler uppgifter än vad som krävs för att kunna
            besvara din förfrågan.
          </p>
        </Section>

        <Section title="3. Varför vi samlar in uppgifterna">
          <p>
            Uppgifterna används uteslutande för att kunna besvara din förfrågan
            och återkomma med konkreta förslag på hur din webbplats kan
            förbättras. Den rättsliga grunden är ditt samtycke, vilket du lämnar
            i samband med att du skickar kontaktformuläret.
          </p>
        </Section>

        <Section title="4. Hur länge vi sparar uppgifterna">
          <p>
            Dina personuppgifter sparas så länge det är nödvändigt för att
            hantera din förfrågan, dock maximalt 12 månader från det att
            förfrågan inkom. Därefter raderas uppgifterna.
          </p>
        </Section>

        <Section title="5. Delning med tredje part">
          <p>
            Vi delar inte dina personuppgifter med tredje part, med ett undantag:
          </p>
          <ul>
            <li>
              <strong className="text-foreground">Resend</strong> — den
              tjänst vi använder för att skicka och ta emot e-post. Resend
              behandlar uppgifterna enbart för att möjliggöra mailutskicket och
              agerar som personuppgiftsbiträde under vår instruktion.
            </li>
          </ul>
          <p>
            Dina uppgifter säljs aldrig och används inte i marknadsföringssyfte
            av tredje part.
          </p>
        </Section>

        <Section title="6. Cookies och spårning">
          <p>
            Vår webbplats använder inga cookies för spårning eller
            beteendeanalys. Vi samlar inte in statistik via verktyg som Google
            Analytics eller liknande tjänster. Den enda interaktion vi har med
            din data är via kontaktformuläret, som beskrivs ovan.
          </p>
        </Section>

        <Section title="7. Dina rättigheter enligt GDPR">
          <p>
            Som registrerad har du följande rättigheter avseende dina
            personuppgifter:
          </p>
          <ul>
            <li>
              <strong className="text-foreground">Rätt till insyn</strong> —
              du kan begära ett utdrag av de uppgifter vi har om dig.
            </li>
            <li>
              <strong className="text-foreground">Rätt till rättelse</strong>{' '}
              — du kan begära att felaktiga uppgifter korrigeras.
            </li>
            <li>
              <strong className="text-foreground">Rätt till radering</strong>{' '}
              — du kan begära att dina uppgifter raderas.
            </li>
            <li>
              <strong className="text-foreground">Rätt att återkalla samtycke</strong>{' '}
              — du kan när som helst återkalla ditt samtycke, utan att det
              påverkar lagligheten av behandling som skett dessförinnan.
            </li>
          </ul>
          <p>
            Skicka din begäran till{' '}
            <a
              href="mailto:info@phigo.se"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              info@phigo.se
            </a>{' '}
            så behandlar vi den skyndsamt. Du har också rätt att lämna klagomål
            till Integritetsskyddsmyndigheten (IMY) om du anser att vi
            behandlar dina uppgifter felaktigt.
          </p>
        </Section>
      </article>
    </main>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-4">
        {title}
      </h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed text-[0.95rem]">
        {children}
      </div>
    </section>
  )
}
