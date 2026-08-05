'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export type ProductPriceProps = {
  setup: string
  setupUnit?: string
  monthly: string
  /* Descriptive copy under the price (e.g. the receptionist minute-pool line).
     Product copy — always from the fas 0 definitions. */
  lead?: string
  bullets?: string[]
  cta: { label: string; href: string }
  footnote?: string
  /* Split-payment trust line. ONLY the Hemsida product may pass this
     (see fas 0 §1 / regel 6) — never the receptionist, chatbot or packages. */
  trust?: string
}

export function ProductPrice({
  setup,
  setupUnit = 'uppsättning',
  monthly,
  lead,
  bullets,
  cta,
  footnote,
  trust,
}: ProductPriceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="relative mx-auto flex max-w-md flex-col gap-6 rounded-3xl border border-primary/30 bg-card p-6 shadow-2xl shadow-primary/5 sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-primary/5" />

      <div className="text-center sm:text-left">
        <p className="text-sm font-semibold uppercase text-primary">Pris</p>
        <div className="mt-3 flex items-end justify-center gap-2 sm:justify-start">
          <span className="text-4xl font-black text-foreground sm:text-5xl">{setup}</span>
          <span className="mb-1 text-sm text-muted-foreground">{setupUnit}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground/70">exkl. moms</p>
        <p className="mt-1 text-sm text-muted-foreground">
          + <span className="font-semibold text-foreground">{monthly}</span>{' '}
          <span className="text-xs text-muted-foreground/70">(exkl. moms)</span>
        </p>
      </div>

      {lead && (
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{lead}</p>
      )}

      {trust && (
        <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <ShieldCheck className="size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-left text-sm font-medium text-foreground">{trust}</p>
        </div>
      )}

      {bullets && bullets.length > 0 && (
        <ul className="flex flex-col gap-2 border-t border-border pt-6">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start"
            >
              <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <Button
        asChild
        size="lg"
        className="h-auto min-h-12 w-full cursor-pointer whitespace-normal rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-[transform,background-color,box-shadow] duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-2xl active:scale-[0.98] sm:min-h-14 sm:py-0 sm:text-base"
      >
        <a href={cta.href}>
          {cta.label}
          <ArrowRight className="ml-2 size-5" aria-hidden="true" />
        </a>
      </Button>

      {footnote && <p className="text-center text-xs text-muted-foreground">{footnote}</p>}
    </motion.div>
  )
}
