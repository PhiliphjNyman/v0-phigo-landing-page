import type { Metadata } from 'next'
import { ProductHero } from '@/components/product-hero'
import { OfferSection } from '@/components/offer-section'
import { ProcessSection } from '@/components/process-section'
import { FaqSection } from '@/components/faq-section'
import { FinalCta } from '@/components/final-cta'
import { buildFaqPageSchema } from '@/lib/faq'

export const metadata: Metadata = {
  title: 'Hemsida till fast pris, 8 000 kr – PHIGO',
  description:
    'En hemsida byggd för att lokala företag ska få fler kunder. Fast pris 8 000 kr exkl. moms, live inom 14 dagar. Betala hälften nu, resten först när du är nöjd.',
  alternates: {
    canonical: 'https://phigo.se/hemsida',
  },
  openGraph: {
    title: 'Hemsida till fast pris, 8 000 kr – PHIGO',
    description:
      'En hemsida byggd för att lokala företag ska få fler kunder. Fast pris 8 000 kr exkl. moms, live inom 14 dagar. Betala hälften nu, resten först när du är nöjd.',
    url: 'https://phigo.se/hemsida',
    siteName: 'PHIGO',
    type: 'website',
    locale: 'sv_SE',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PHIGO, Hemsidor som ger dig fler kunder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hemsida till fast pris, 8 000 kr – PHIGO',
    description:
      'En hemsida byggd för att lokala företag ska få fler kunder. Fast pris 8 000 kr exkl. moms, live inom 14 dagar.',
    images: ['/og-image.jpg'],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://phigo.se/hemsida#service',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://phigo.se' },
    { '@type': 'ListItem', position: 2, name: 'Hemsida', item: 'https://phigo.se/hemsida' },
  ],
}

/* Built from lib/faq.ts — the exact strings FaqSection renders below, so the
   schema always matches the visible content (Google's rich-results rule). */
const faqPageSchema = buildFaqPageSchema('https://phigo.se/hemsida')

export default function HemsidaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <ProductHero
        label="Hemsida"
        title="Gå från en sajt som ingen agerar på till en som genererar bokningar varje vecka"
        description="Vi bygger hemsidor åt lokala företag som faktiskt gör att folk tar kontakt. Fast pris, live inom 14 dagar."
        primaryCta={{ label: 'Se vad din hemsida missar, kostnadsfritt', href: '/#kontakt' }}
        secondaryCta={{ label: 'Se exempel', href: '/cases' }}
        chips={['Från 8 000 kr', 'Live inom 14 dagar', 'Betala hälften nu']}
      />
      <OfferSection />
      <ProcessSection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
