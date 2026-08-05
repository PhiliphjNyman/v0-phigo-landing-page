'use client'

import { motion } from 'framer-motion'
import { Compass, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { reveal, revealStagger } from '@/lib/animations'

/* Guide "Hitta rätt lösning". Fas 2 ships the designed CONTAINER only: heading,
   intro (verbatim from Fas0_produktdefinitioner.md §5) and an interim CTA. The
   Voiceflow flow is embedded here in fas 5 (see implementationsplanen §9); until
   then the CTA falls back to the contact section. */
export function GuideSection() {
  return (
    <section
      id="guide"
      aria-labelledby="guide-rubrik"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Decorative accent glow — accent tint only, never a surface. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={revealStagger}
          className="card-depth relative overflow-hidden rounded-3xl border border-primary/20 bg-card px-6 py-14 text-center sm:px-12 sm:py-16"
        >
          <motion.div
            variants={reveal}
            className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
          >
            <Compass className="size-7" aria-hidden="true" />
          </motion.div>

          <motion.span
            variants={reveal}
            className="mt-6 block text-xs font-bold uppercase tracking-[0.15em] text-primary"
          >
            Guide
          </motion.span>

          <motion.h2
            id="guide-rubrik"
            variants={reveal}
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Hitta rätt lösning
          </motion.h2>

          <motion.p
            variants={reveal}
            className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Svara på fem snabba frågor så visar vi vad som skulle ge ditt företag
            mest. Tar under en minut.
          </motion.p>

          <motion.div variants={reveal} className="mt-8 flex flex-col items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-auto min-h-12 cursor-pointer rounded-2xl bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-[transform,background-color,box-shadow] duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-2xl active:scale-[0.98]"
            >
              <a href="#kontakt">
                Hjälp mig välja
                <ArrowRight className="ml-2 size-5" aria-hidden="true" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground/70">
              Den smarta guiden öppnar snart. Så länge hjälper vi dig personligen.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
