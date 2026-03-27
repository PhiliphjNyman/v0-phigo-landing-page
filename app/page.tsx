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

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://phigo.se/#service-website',
  name: 'Hemsida för lokala företag',
  description:
    'Vi bygger hemsidor åt lokala företag som faktiskt gör att folk tar kontakt. Fast pris, live inom 14 dagar.',
  provider: {
    '@id': 'https://phigo.se/#organization',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Sweden',
  },
  serviceType: 'Web Design',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'SEK',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: '8000',
        priceCurrency: 'SEK',
        name: 'Hemsida (engångspris, exkl. moms)',
        valueAddedTaxIncluded: false,
      },
      {
        '@type': 'UnitPriceSpecification',
        price: '399',
        priceCurrency: 'SEK',
        name: 'Drift & support (per månad, exkl. moms)',
        valueAddedTaxIncluded: false,
        billingDuration: 'P1M',
      },
    ],
    url: 'https://phigo.se/#kontakt',
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
