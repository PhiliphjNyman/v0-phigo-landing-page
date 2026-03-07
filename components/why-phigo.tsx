'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const reasons = [
  {
    title: 'Design som konverterar',
    description:
      'Vi bygger inte bara snygga sajter -- vi bygger sajter som driver affärsresultat och mätbar tillväxt.',
  },
  {
    title: 'Prisvärt och transparent',
    description:
      'Inga dolda kostnader, inga överraskningar. Ni vet alltid vad ni betalar för och vad ni får.',
  },
  {
    title: 'Modern tech stack',
    description:
      'Vi använder den senaste tekniken för att säkerställa att er sajt är snabb, säker och framtidssäkrad.',
  },
  {
    title: 'Personlig kontakt',
    description:
      'Ni pratar alltid direkt med den som bygger er sajt. Ingen byråkrati, bara resultat.',
  },
]

export function WhyPhigo() {
  return (
    <section className="border-t border-border bg-muted/20 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="text-xs font-semibold uppercase tracking-wider text-primary"
            >
              Varför PHIGO
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Er partner för digital tillväxt
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-pretty leading-relaxed text-muted-foreground"
            >
              Vi kombinerar kreativ design med datadriven strategi för att bygga
              webbplatser som gör verklig skillnad för ert företag.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8">
              <Button
                asChild
                size="lg"
                className="cursor-pointer rounded-xl bg-primary px-8 text-primary-foreground hover:bg-primary/90"
              >
                <a href="#kontakt">
                  Boka ett samtal
                  <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Reasons grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid gap-5 sm:grid-cols-2"
          >
            {reasons.map((reason) => (
              <motion.div
                key={reason.title}
                variants={fadeInUp}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-md bg-primary/10">
                    <Check className="size-3.5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {reason.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
