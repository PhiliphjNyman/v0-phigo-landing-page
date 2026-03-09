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
  title: 'PHIGO | Webbplatser som konverterar',
  description:
    'PHIGO bygger moderna, snabba och konverteringsfokuserade webbplatser för B2B-företag. Få en kostnadsfri webbplatsanalys idag.',
  generator: 'Next.js',
  alternates: {
    canonical: 'https://phigo.se',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'PHIGO | Webbplatser som konverterar',
    description:
      'PHIGO bygger moderna, snabba och konverteringsfokuserade webbplatser för B2B-företag. Få en kostnadsfri webbplatsanalys idag.',
    url: 'https://phigo.se',
    type: 'website',
    locale: 'sv_SE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PHIGO | Webbplatser som konverterar',
    description:
      'PHIGO bygger moderna, snabba och konverteringsfokuserade webbplatser för B2B-företag. Få en kostnadsfri webbplatsanalys idag.',
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
