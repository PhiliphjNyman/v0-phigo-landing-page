import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from '@/components/ui/sonner'
import { PageBackground } from '@/components/page-background'
import './globals.css'

const _inter = Inter({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PHIGO | Webbplatser som konverterar',
  description:
    'PHIGO bygger moderna, snabba och konverteringsfokuserade webbplatser for B2B-foretag. Fa en kostnadsfri webbplatsanalys idag.',
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'PHIGO | Webbplatser som konverterar',
    description:
      'Vi hjalper B2B-foretag att lansera eller frascha upp sin sajt med modern design, hog prestanda och matbara resultat.',
    type: 'website',
    locale: 'sv_SE',
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
        <PageBackground />
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
