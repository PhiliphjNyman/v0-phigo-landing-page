import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from '@/components/ui/sonner'
import { PageBackground } from '@/components/page-background'
import { MotionProvider } from '@/components/framer-exports'
import './globals.css'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': 'https://phigo.se/#organization',
  name: 'PHIGO',
  url: 'https://phigo.se',
  telephone: '+46723305002',
  email: 'info@phigo.se',
  logo: {
    '@type': 'ImageObject',
    url: 'https://phigo.se/icon.svg',
  },
  image: 'https://phigo.se/og-image.jpg',
  description:
    'Vi bygger hemsidor åt lokala företag som faktiskt gör att folk tar kontakt. Fast pris, live inom 14 dagar.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Hejdegatan 46',
    addressLocality: 'Linköping',
    addressRegion: 'Östergötland',
    postalCode: '582 46',
    addressCountry: 'SE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 58.4108,
    longitude: 15.6214,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Sweden',
  },
  priceRange: '$$',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+46723305002',
    email: 'info@phigo.se',
    availableLanguage: 'Swedish',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://phigo.se/#website',
  name: 'PHIGO',
  url: 'https://phigo.se',
  publisher: {
    '@id': 'https://phigo.se/#organization',
  },
}

const _inter = Inter({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://phigo.se'),
  title: 'PHIGO | Hemsidor som ger dig fler kunder',
  description:
    'Vi bygger hemsidor åt lokala företag som faktiskt gör att folk tar kontakt. Fast pris, live inom 14 dagar. Granska din hemsida kostnadsfritt.',
  alternates: {
    canonical: 'https://phigo.se',
  },
  openGraph: {
    title: 'PHIGO | Hemsidor som ger dig fler kunder',
    description:
      'Vi bygger hemsidor åt lokala företag som faktiskt gör att folk tar kontakt. Fast pris, live inom 14 dagar. Granska din hemsida kostnadsfritt.',
    url: 'https://phigo.se',
    siteName: 'PHIGO',
    type: 'website',
    locale: 'sv_SE',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PHIGO — Hemsidor som ger dig fler kunder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PHIGO | Hemsidor som ger dig fler kunder',
    description:
      'Vi bygger hemsidor åt lokala företag som faktiskt gör att folk tar kontakt. Fast pris, live inom 14 dagar. Granska din hemsida kostnadsfritt.',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased relative">
        <MotionProvider>
          <PageBackground />
          {children}
          <Toaster />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
