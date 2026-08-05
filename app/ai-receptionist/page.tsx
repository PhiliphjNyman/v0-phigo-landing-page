import type { Metadata } from 'next'
import { AiReceptionistContent } from '@/components/ai-receptionist-content'

export const metadata: Metadata = {
  title: 'AI-Receptionist som svarar dygnet runt – PHIGO',
  description:
    'En receptionist som svarar i din telefon dygnet runt, bokar in kunder i din kalender och skickar dig en sammanfattning. Från 7 000 kr, 300 minuter i månaden ingår.',
  alternates: {
    canonical: 'https://phigo.se/ai-receptionist',
  },
  openGraph: {
    title: 'AI-Receptionist som svarar dygnet runt – PHIGO',
    description:
      'En receptionist som svarar i din telefon dygnet runt, bokar in kunder i din kalender och skickar dig en sammanfattning. Från 7 000 kr.',
    url: 'https://phigo.se/ai-receptionist',
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
    title: 'AI-Receptionist som svarar dygnet runt – PHIGO',
    description:
      'En receptionist som svarar i din telefon dygnet runt, bokar in kunder i din kalender och skickar dig en sammanfattning. Från 7 000 kr.',
    images: ['/og-image.jpg'],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://phigo.se/ai-receptionist#service',
  name: 'AI-Receptionist',
  description:
    'En receptionist som svarar i din telefon dygnet runt, bokar in kunder i din kalender och skickar dig en sammanfattning.',
  provider: { '@id': 'https://phigo.se/#organization' },
  areaServed: { '@type': 'Country', name: 'Sweden' },
  serviceType: 'AI telephone receptionist',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'SEK',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: '7000',
        priceCurrency: 'SEK',
        name: 'AI-Receptionist (uppsättning, exkl. moms)',
        valueAddedTaxIncluded: false,
      },
      {
        '@type': 'UnitPriceSpecification',
        price: '1495',
        priceCurrency: 'SEK',
        name: 'AI-Receptionist (per månad, exkl. moms)',
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
      name: 'AI-Receptionist',
      item: 'https://phigo.se/ai-receptionist',
    },
  ],
}

export default function AiReceptionistPage() {
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
      <AiReceptionistContent />
    </>
  )
}
