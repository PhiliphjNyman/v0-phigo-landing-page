'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const steps = [
  {
    number: '1',
    title: 'Vi granskar din sajt',
    description: 'Vi tittar på vad som fungerar och vad som gör att besökare lämnar utan att ta kontakt.',
  },
  {
    number: '2',
    title: 'Vi bygger en ny hemsida',
    description: 'En enkel, snabb och tydlig sajt byggd för att besökare ska ta kontakt — inte bara titta.',
  },
  {
    number: '3',
    title: 'Du får fler kunder',
    description: 'Din sajt är live inom 14 dagar. Vi ser till att den alltid fungerar och hjälper dig med ändringar.',
  },
]

const included = [
  'En sida som är byggd för att besökare ska ta kontakt',
  'Funkar perfekt på mobilen',
  'Syns i Google när folk söker',
  'Vi ser till att sajten alltid är uppe och fungerar',
  'Mindre ändringar ingår i månadsavgiften',
]

const notIncluded = [
  'Marknadsföring eller betalda annonser',
  'Webb­shop eller betallösningar',
  'Avancerat innehållssystem (kan läggas till)',
]

export function OfferSection() {
  return (
    <section id="erbjudande" className="relative border-t border-border bg-muted/10 py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-4xl bg-border" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-sm font-bold uppercase text-primary"
          >
            Erbjudande
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
          >
            En hemsida som ger dig fler kunder
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground"
          >
            De flesta hemsidor behandlar alla besökare likadant — vi bygger ett
            tydligt flöde som gör att rätt person tar kontakt med dig.
          </motion.p>
        </motion.div>

        {/* How it works — 3 steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mt-20 grid gap-8 md:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              className="group relative flex flex-col gap-4 rounded-3xl border border-border bg-card/40 p-8 transition-[box-shadow,background-color] duration-200 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary text-lg font-black">
                {step.number}
              </div>
              <h3 className="text-balance text-xl font-bold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Included / not included + price card */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Included */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-balance text-xl font-bold text-foreground mb-4">Vad som ingår</h3>
              <ul className="flex flex-col gap-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-balance text-xl font-bold text-foreground mb-4">Vad som inte ingår</h3>
              <ul className="flex flex-col gap-3">
                {notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/40" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Price card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="relative mx-4 sm:mx-0 flex flex-col gap-6 rounded-3xl border border-primary/30 bg-card p-6 sm:p-8 shadow-2xl shadow-primary/5"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-primary/5" />

            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold uppercase text-primary">Fast pris</p>
              <div className="mt-3 flex items-end justify-center gap-2 sm:justify-start">
                <span className="text-4xl sm:text-5xl font-black text-foreground">8 000 kr</span>
                <span className="mb-1 text-sm text-muted-foreground">engång</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                + <span className="font-semibold text-foreground">399 kr/mån</span> — drift, säkerhet och support
              </p>
            </div>

            <ul className="flex flex-col gap-2 border-t border-border pt-6">
              <li className="flex items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
                <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                Inga dolda kostnader
              </li>
              <li className="flex items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
                <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                Live inom 14 dagar
              </li>
              <li className="flex items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
                <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                Du pratar direkt med den som bygger
              </li>
            </ul>

            <Button
              asChild
              size="lg"
              className="h-14 w-full cursor-pointer rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-[transform,background-color,box-shadow] duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-2xl active:scale-[0.98]"
            >
              <a href="#kontakt">
                Se vad din hemsida missar — kostnadsfritt
                <ArrowRight className="ml-2 size-5" aria-hidden="true" />
              </a>
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Kostnadsfritt och utan förpliktelse
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
