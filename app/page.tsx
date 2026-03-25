import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { CaseStudies } from '@/components/case-studies'
import { OfferSection } from '@/components/offer-section'
import { ProcessSection } from '@/components/process-section'
import { WhyPhigo } from '@/components/why-phigo'
import { AboutSection } from '@/components/about-section'
import { FaqSection } from '@/components/faq-section'
import { FinalCta } from '@/components/final-cta'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Vad kostar en hemsida?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En hemsida kostar 8 000 kr (engång) och 399 kr/mån för drift, säkerhet och support. Inga dolda kostnader — priset är fast oavsett hur lång tid det tar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur lång tid tar det?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Din sajt är live inom 14 dagar från att vi fått all information vi behöver. Ofta går det snabbare.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vad händer efter att sajten är live?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vi ser till att sajten alltid är uppe och funkar. Månadsavgiften på 399 kr/mån täcker hosting, säkerhet och mindre ändringar — som att uppdatera öppettider, priser eller kontaktuppgifter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Fungerar sajten på mobilen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Alla sajter vi bygger fungerar perfekt på mobilen — det är ofta där dina kunder hittar dig.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hittar folk mig på Google?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Vi bygger sajten så att den syns i Google när folk i ditt område söker efter det du erbjuder. Det tar lite tid att bygga upp, men grunden läggs direkt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Behöver du ändra texter och bilder själv?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Vi kan lägga till ett enkelt admin-system där du ändrar texter, bilder och priser själv — utan att kunna något om teknik. Det är ett tillägg utöver baspaketet. Vill du hellre slippa helt gör vi det åt dig — mindre ändringar ingår i månadsavtalet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kan jag köpa bara hemsidan utan månadsavtal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, det går bra. Vi bygger sajten och överlämnar den till dig. Då ansvarar du själv för hosting, säkerhet och uppdateringar. De flesta av våra kunder väljer månadsavtalet för att slippa tänka på teknik — men det är inget krav.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main>
        <HeroSection />
        <CaseStudies />
        <OfferSection />
        <ProcessSection />
        <WhyPhigo />
        <AboutSection />
        <FaqSection />
        <FinalCta />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
