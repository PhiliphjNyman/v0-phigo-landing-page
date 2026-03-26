'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const reasons = [
  {
    title: 'Byggd för att ge dig kunder',
    description:
      'Inte bara snygg design. Varje del av sajten är till för att göra det lätt för besökare att ta kontakt med dig.',
  },
  {
    title: 'Fast pris, inga överraskningar',
    description:
      '8 000 kr för sajten (exkl. moms), 399 kr/mån för drift och support (exkl. moms). Det är allt. Inga dolda kostnader.',
  },
  {
    title: 'Snabb och säker',
    description:
      'Sajten laddar på under en sekund och funkar perfekt på mobilen. Vi ser till att den alltid är uppe.',
  },
  {
    title: 'Du pratar med den som bygger',
    description:
      'Ingen mellanhand. Du har direkt kontakt med den som faktiskt gör jobbet, från start till mål.',
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
              className="text-xs font-semibold uppercase text-primary"
            >
              Varför PHIGO
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Därför väljer företagare oss
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-pretty leading-relaxed text-muted-foreground"
            >
              Vi bygger hemsidor för lokala företag som vill ha fler kunder —
              inte en snygg sajt som ingen agerar på.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8">
              <Button
                asChild
                size="lg"
                className="cursor-pointer rounded-xl bg-primary px-8 text-primary-foreground hover:bg-primary/90"
              >
                <a href="#kontakt">
                  Kontakta oss
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
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
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
