import { reveal, revealStagger } from '@/lib/animations'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { getCases } from '@/lib/cases'
import { Metadata } from 'next'
import { CasesClient } from '@/components/cases-client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as Framer from '@/components/framer-exports'

export const metadata: Metadata = {
    title: 'Hemsidor vi byggt – Exempel | PHIGO',
    description: 'Se hemsidor vi byggt åt lokala företag, tandläkare, elektriker, frisörer och hantverkare. Fast pris 8 000 kr exkl. moms. Klart inom 14 dagar.',
    alternates: {
        canonical: 'https://phigo.se/cases',
    },
    openGraph: {
        title: 'Hemsidor vi byggt – Exempel | PHIGO',
        description: 'Se hemsidor vi byggt åt lokala företag, tandläkare, elektriker, frisörer och hantverkare. Fast pris 8 000 kr exkl. moms. Klart inom 14 dagar.',
        url: 'https://phigo.se/cases',
        type: 'website',
        locale: 'sv_SE',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'PHIGO, Hemsidor som ger dig fler kunder' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Hemsidor vi byggt – Exempel | PHIGO',
        description: 'Se hemsidor vi byggt åt lokala företag, tandläkare, elektriker, frisörer och hantverkare. Fast pris 8 000 kr exkl. moms. Klart inom 14 dagar.',
    },
}

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://phigo.se' },
        { '@type': 'ListItem', position: 2, name: 'Exempel', item: 'https://phigo.se/cases' },
    ],
}

export default function CasesPage() {
    const allCases = getCases()

    return (
        <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <div className="min-h-screen pt-24 pb-12">
            <section className="py-12 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <Framer.MotionDiv
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={revealStagger}
                        className="text-center mb-16"
                    >
                        <SectionEyebrow className="block">Designexempel</SectionEyebrow>
                        <Framer.MotionH1
                            variants={reveal}
                            className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
                        >
                            Hemsidor vi har byggt
                        </Framer.MotionH1>
                        <Framer.MotionP
                            variants={reveal}
                            className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
                        >
                            Se hemsidor vi har byggt åt lokala företag i olika branscher. Alla sajter levereras till fast pris och går live inom 14 dagar.
                        </Framer.MotionP>
                    </Framer.MotionDiv>

                    <CasesClient allCases={allCases} />

                    {/* Bottom CTA — emerald anchor, identical in both themes (same
                        fixed deep-emerald surface as the start page final CTA).
                        Reuses .anchor-emerald + --anchor-* tokens; copy unchanged. */}
                    <Framer.MotionDiv
                        variants={reveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="anchor-emerald relative mt-24 overflow-hidden rounded-[3rem] border border-white/10 px-6 py-16 text-center shadow-2xl shadow-primary/10 sm:px-12 lg:px-20"
                    >
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-balance text-3xl font-extrabold text-anchor-fg mb-6">Vill du veta hur din bransch kan se ut?</h2>
                            <p className="text-lg text-anchor-fg-muted max-w-xl mx-auto mb-10">
                                Vi granskar din nuvarande hemsida kostnadsfritt.
                            </p>
                            <Button size="lg" className="rounded-2xl px-10 h-14 text-base font-bold bg-white text-anchor-ink shadow-lg shadow-black/25 hover:bg-white/90 hover:shadow-xl hover:shadow-black/30 focus-visible:border-white focus-visible:ring-white/70 active:scale-[0.98] transition-[transform,background-color,box-shadow] duration-200" asChild>
                                <Link href="/#kontakt">Boka kostnadsfri granskning</Link>
                            </Button>
                        </div>
                    </Framer.MotionDiv>
                </div>
            </section>
        </div>
        </>
    )
}
