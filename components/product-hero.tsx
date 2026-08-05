'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { reveal, revealStagger } from '@/lib/animations'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { cn } from '@/lib/utils'

type ProductCta = {
  label: string
  href: string
  /* External / non-router targets (tel:, #anchor on another page) use a plain
     anchor; internal routes still work with a plain anchor too, so we keep it
     simple and let the href decide. */
  icon?: LucideIcon
}

type ProductHeroProps = {
  label: string
  title: string
  description: string
  primaryCta: ProductCta
  secondaryCta?: ProductCta
  /* Short proof chips under the CTAs, e.g. "Från 8 000 kr", "Live inom 14 dagar". */
  chips?: string[]
}

export function ProductHero({
  label,
  title,
  description,
  primaryCta,
  secondaryCta,
  chips,
}: ProductHeroProps) {
  const PrimaryIcon = primaryCta.icon ?? ArrowRight
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Soft accent glow — decorative, accent-tint only (no green surface). */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[420px] w-full max-w-4xl -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]"
        aria-hidden="true"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={revealStagger}
        className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center lg:px-8"
      >
        <SectionEyebrow>{label}</SectionEyebrow>

        <motion.h1
          variants={reveal}
          className="mt-5 text-balance text-fluid-h1 font-extrabold tracking-tight text-foreground"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={reveal}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          {description}
        </motion.p>

        <motion.div
          variants={reveal}
          className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="h-auto w-full cursor-pointer rounded-2xl bg-primary px-6 py-4 text-base font-semibold whitespace-normal text-center text-primary-foreground shadow-xl shadow-primary/20 transition-[transform,background-color,box-shadow] duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98] sm:h-14 sm:w-auto sm:whitespace-nowrap sm:px-8 sm:py-0"
          >
            <a href={primaryCta.href}>
              {primaryCta.label}
              <PrimaryIcon className="ml-2 size-5 shrink-0" aria-hidden="true" />
            </a>
          </Button>

          {secondaryCta && (
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-14 cursor-pointer text-base font-medium text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            >
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </Button>
          )}
        </motion.div>

        {chips && chips.length > 0 && (
          <motion.div
            variants={reveal}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground"
          >
            {chips.map((chip, i) => (
              <span key={chip} className="flex items-center gap-4">
                {i > 0 && (
                  <span
                    className={cn('size-1 rounded-full bg-border')}
                    aria-hidden="true"
                  />
                )}
                <span>
                  <span aria-hidden="true">✓</span> {chip}
                </span>
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
