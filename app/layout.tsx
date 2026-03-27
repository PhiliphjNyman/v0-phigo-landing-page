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
  logo: {
    '@type': 'ImageObject',
    url: 'https://phigo.se/icon.svg',
  },
  description:
    'Vi bygger hemsidor åt lokala företag som faktiskt gör att folk tar kontakt. Fast pris, live inom 14 dagar.',
  email: 'info@phigo.se',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Linköping',
    addressRegion: 'Östergötland',
    addressCountry: 'SE',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Sweden',
  },
  priceRange: '$$',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
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
        url: '/og-image.png',
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
    images: ['/og-image.png'],
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
