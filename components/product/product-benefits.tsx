'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { reveal, revealStagger } from '@/lib/animations'

export type ProductBenefit = {
  icon: LucideIcon
  title: string
  description: string
}

/* Grid of benefit cards (icon + short label + one supporting line). Copy is
   product copy — always sourced from the fas 0 definitions, never authored. */
export function ProductBenefits({ benefits }: { benefits: ProductBenefit[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealStagger}
      className="grid gap-6 md:grid-cols-3"
    >
      {benefits.map((b) => {
        const Icon = b.icon
        return (
          <motion.div
            key={b.title}
            variants={reveal}
            className="card-depth group flex flex-col gap-4 rounded-3xl border border-border bg-card/40 p-8 transition-[box-shadow,background-color] duration-200 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <h3 className="text-balance text-lg font-bold text-foreground">{b.title}</h3>
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground/80 transition-colors group-hover:text-muted-foreground">
              {b.description}
            </p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
