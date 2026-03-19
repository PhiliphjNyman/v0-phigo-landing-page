import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from '@/components/ui/sonner'
import { PageBackground } from '@/components/page-background'
import { MotionProvider } from '@/components/framer-exports'
import './globals.css'

const _inter = Inter({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://phigo.se'),
  title: 'PHIGO | Hemsidor som ger dig fler kunder',
  description:
    'Vi bygger hemsidor åt lokala företag som faktiskt gör att folk tar kontakt. Fast pris, live inom 14 dagar. Granska din hemsida kostnadsfritt.',
  generator: 'Next.js',
  alternates: {
    canonical: 'https://phigo.se',
  },
  openGraph: {
    title: 'PHIGO | Hemsidor som ger dig fler kunder',
    description:
      'Vi bygger hemsidor åt lokala företag som faktiskt gör att folk tar kontakt. Fast pris, live inom 14 dagar. Granska din hemsida kostnadsfritt.',
    url: 'https://phigo.se',
    type: 'website',
    locale: 'sv_SE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PHIGO | Hemsidor som ger dig fler kunder',
    description:
      'Vi bygger hemsidor åt lokala företag som faktiskt gör att folk tar kontakt. Fast pris, live inom 14 dagar. Granska din hemsida kostnadsfritt.',
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
