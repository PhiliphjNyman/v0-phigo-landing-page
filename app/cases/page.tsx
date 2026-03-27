import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { getCases } from '@/lib/cases'
import { Metadata } from 'next'
import { CasesClient } from '@/components/cases-client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as Framer from '@/components/framer-exports'

export const metadata: Metadata = {
    title: 'Hemsidor vi byggt – Exempel | PHIGO',
    description: 'Se hemsidor vi byggt åt lokala företag – tandläkare, elektriker, frisörer och hantverkare. Fast pris 8 000 kr exkl. moms. Klart inom 14 dagar.',
    alternates: {
        canonical: 'https://phigo.se/cases',
    },
    openGraph: {
        title: 'Hemsidor vi byggt – Exempel | PHIGO',
        description: 'Se hemsidor vi byggt åt lokala företag – tandläkare, elektriker, frisörer och hantverkare. Fast pris 8 000 kr exkl. moms. Klart inom 14 dagar.',
        url: 'https://phigo.se/cases',
        type: 'website',
        locale: 'sv_SE',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'PHIGO – Hemsidor som ger dig fler kunder' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Hemsidor vi byggt – Exempel | PHIGO',
        description: 'Se hemsidor vi byggt åt lokala företag – tandläkare, elektriker, frisörer och hantverkare. Fast pris 8 000 kr exkl. moms. Klart inom 14 dagar.',
    },
}

export default function CasesPage() {
    const allCases = getCases()

    return (
        <div className="min-h-screen pt-24 pb-12">
            <section className="py-12 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <Framer.MotionDiv
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <Framer.MotionSpan
                            variants={fadeInUp}
                            className="text-sm font-bold uppercase text-primary block"
                        >
                            Designexempel
                        </Framer.MotionSpan>
                        <Framer.MotionH1
                            variants={fadeInUp}
                            className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
                        >
                            Hemsidor vi har byggt
                        </Framer.MotionH1>
                        <Framer.MotionP
                            variants={fadeInUp}
                            className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
                        >
                            Se hemsidor vi har byggt åt lokala företag i olika branscher. Alla sajter levereras till fast pris och går live inom 14 dagar.
                        </Framer.MotionP>
                    </Framer.MotionDiv>

                    <CasesClient allCases={allCases} />

                    {/* Bottom CTA */}
                    <Framer.MotionDiv
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-24 p-12 lg:p-16 rounded-[3rem] bg-muted/30 border border-border text-center overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-96 bg-primary/10 blur-[100px] rounded-full" />
                        <h2 className="text-3xl font-extrabold text-foreground mb-6">Vill du veta hur din bransch kan se ut?</h2>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
                            Vi granskar din nuvarande hemsida kostnadsfritt.
                        </p>
                        <Button size="lg" className="rounded-2xl px-10 h-14 text-base font-bold shadow-xl shadow-primary/20" asChild>
                            <Link href="/#kontakt">Boka kostnadsfri granskning</Link>
                        </Button>
                    </Framer.MotionDiv>
                </div>
            </section>
        </div>
    )
}
