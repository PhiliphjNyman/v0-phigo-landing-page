'use client'

import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { reveal, revealStagger } from '@/lib/animations'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { cn } from '@/lib/utils'

/* Boundaries statement (fas 0 "Boundaries" copy) rendered as a calm trust card.
   Copy is passed verbatim from the product definition — never authored here. */
export function ProductBoundaries({
  id,
  eyebrow,
  title,
  text,
  tone = 'plain',
}: {
  id?: string
  eyebrow: string
  title: string
  text: string
  tone?: 'plain' | 'muted'
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden py-24 lg:py-32',
        tone === 'muted' && 'border-t border-border bg-muted dark:bg-muted/10',
      )}
    >
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={revealStagger}
          className="flex flex-col items-center text-center"
        >
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <motion.h2
            variants={reveal}
            className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            {title}
          </motion.h2>

          <motion.div
            variants={reveal}
            className="card-depth mt-10 flex items-start gap-4 rounded-3xl border border-border bg-card p-6 text-left sm:p-8"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </div>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">{text}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
