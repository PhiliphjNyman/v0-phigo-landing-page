import type { Metadata } from 'next'
import { ChatbotContent } from '@/components/chatbot-content'

export const metadata: Metadata = {
  title: 'Chatbot till hemsidan som svarar dygnet runt – PHIGO',
  description:
    'En chatt på din hemsida som svarar på kundernas frågor direkt, dygnet runt, och samlar in namn och nummer så att du kan återkomma. Från 4 000 kr.',
  alternates: {
    canonical: 'https://phigo.se/chatbot',
  },
  openGraph: {
    title: 'Chatbot till hemsidan som svarar dygnet runt – PHIGO',
    description:
      'En chatt på din hemsida som svarar på kundernas frågor direkt, dygnet runt, och samlar in namn och nummer så att du kan återkomma. Från 4 000 kr.',
    url: 'https://phigo.se/chatbot',
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
    title: 'Chatbot till hemsidan som svarar dygnet runt – PHIGO',
    description:
      'En chatt på din hemsida som svarar på kundernas frågor direkt, dygnet runt, och samlar in namn och nummer. Från 4 000 kr.',
    images: ['/og-image.jpg'],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://phigo.se/chatbot#service',
  name: 'Chatbot',
  description:
    'En chatt på din hemsida som svarar på kundernas frågor direkt, dygnet runt, och samlar in deras uppgifter så att du kan återkomma med ett färdigt svar.',
  provider: { '@id': 'https://phigo.se/#organization' },
  areaServed: { '@type': 'Country', name: 'Sweden' },
  serviceType: 'AI website chatbot',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'SEK',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: '4000',
        priceCurrency: 'SEK',
        name: 'Chatbot (uppsättning, exkl. moms)',
        valueAddedTaxIncluded: false,
      },
      {
        '@type': 'UnitPriceSpecification',
        price: '695',
        priceCurrency: 'SEK',
        name: 'Chatbot (per månad, exkl. moms)',
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
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Chatbot',
      item: 'https://phigo.se/chatbot',
    },
  ],
}

export default function ChatbotPage() {
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
      <ChatbotContent />
    </>
  )
}
