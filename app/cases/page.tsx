import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { getCases } from '@/lib/cases'
import { Metadata } from 'next'
import { CasesClient } from '@/components/cases-client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as Framer from '@/components/framer-exports'

export const metadata: Metadata = {
    title: 'Case – Utvalda projekt | PHIGO',
    description: 'Se exempel på hur PHIGO hjälper företag att växa genom modern design och teknisk expertis.',
    alternates: {
        canonical: 'https://phigo.se/cases',
    },
    openGraph: {
        title: 'Case – Utvalda projekt | PHIGO',
        description: 'Se exempel på hur PHIGO hjälper företag att växa genom modern design och teknisk expertis.',
        url: 'https://phigo.se/cases',
        type: 'website',
        locale: 'sv_SE',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Case – Utvalda projekt | PHIGO',
        description: 'Se exempel på hur PHIGO hjälper företag att växa genom modern design och teknisk expertis.',
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
                            className="text-sm font-bold uppercase tracking-widest text-primary block"
                        >
                            Våra projekt
                        </Framer.MotionSpan>
                        <Framer.MotionH1
                            variants={fadeInUp}
                            className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
                        >
                            Case
                        </Framer.MotionH1>
                        <Framer.MotionP
                            variants={fadeInUp}
                            className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
                        >
                            Exempel på leveranser från PHIGO där design och teknik skapat verklig affärsnytta.
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
                        <h2 className="text-3xl font-extrabold text-foreground mb-6">Redo att skapa nästa succé?</h2>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
                            Låt oss diskutera hur PHIGO kan hjälpa ditt företag att nå liknande resultat genom modern design och teknisk expertis.
                        </p>
                        <Button size="lg" className="rounded-2xl px-10 h-14 text-base font-bold shadow-xl shadow-primary/20" asChild>
                            <Link href="/#kontakt">Kontakta oss idag</Link>
                        </Button>
                    </Framer.MotionDiv>
                </div>
            </section>
        </div>
    )
}
