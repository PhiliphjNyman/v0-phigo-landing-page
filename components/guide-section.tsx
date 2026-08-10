'use client'

import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { reveal, revealStagger } from '@/lib/animations'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { GuideFlow } from '@/components/guide/guide-flow'

/* Guide "Hitta rätt lösning". Fas 2 shipped the designed container; fas 5 §9.1
   replaced the interim CTA with the native question tree. Heading and intro are
   verbatim from Fas0_produktdefinitioner.md §5, and every question, option and
   outcome below them comes from lib/guide.ts. No Voiceflow, no external host. */
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

          <SectionEyebrow className="mt-6 block">Guide</SectionEyebrow>

          <motion.h2
            id="guide-rubrik"
            variants={reveal}
            className="mt-3 text-balance text-fluid-h2 font-extrabold tracking-tight text-foreground"
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

          <motion.div variants={reveal}>
            <GuideFlow />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
