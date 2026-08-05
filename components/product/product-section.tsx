'use client'

import { motion } from 'framer-motion'
import { reveal, revealStagger } from '@/lib/animations'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { cn } from '@/lib/utils'

/* Shared shell for a product-page section: optional muted tone (solid in light
   per lessons.md, muted/10 in dark so shipped dark mode stays byte-for-byte),
   an uppercase accent eyebrow, a heading and an optional lead paragraph — all on
   the reveal system. The section body is passed as children. */
export function ProductSection({
  id,
  eyebrow,
  title,
  lead,
  tone = 'plain',
  className,
  children,
}: {
  id?: string
  eyebrow: string
  title: string
  lead?: string
  tone?: 'plain' | 'muted'
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden py-24 lg:py-32',
        tone === 'muted' && 'border-t border-border bg-muted dark:bg-muted/10',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={revealStagger}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <motion.h2
            variants={reveal}
            className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>
          {lead && (
            <motion.p
              variants={reveal}
              className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              {lead}
            </motion.p>
          )}
        </motion.div>

        <div className="mt-16">{children}</div>
      </div>
    </section>
  )
}
