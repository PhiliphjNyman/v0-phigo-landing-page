'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Globe, PhoneCall, MessageCircle, ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { reveal, revealStagger } from '@/lib/animations'
import { SectionEyebrow } from '@/components/section-eyebrow'

/* Product overview on the start page. Order: Hemsida / AI-Receptionist /
   Chatbot. Card descriptions are VERBATIM from Fas0_produktdefinitioner.md §1
   (the price-block table); "från"-prices and the monthly line come from the
   same table. Each card links to its product page. */
type OverviewProduct = {
  name: string
  href: string
  icon: LucideIcon
  description: string
  priceFrom: string
  monthly: string
}

const products: OverviewProduct[] = [
  {
    name: 'Hemsida',
    href: '/hemsida',
    icon: Globe,
    description:
      'Sajt live inom 14 dagar. Drift, säkerhet, mindre ändringar och månadsrapport ingår.',
    priceFrom: 'Från 8 000 kr',
    monthly: '399 kr/mån',
  },
  {
    name: 'AI-Receptionist',
    href: '/ai-receptionist',
    icon: PhoneCall,
    description:
      'Svarar i telefon dygnet runt, bokar och tar meddelanden. Personlig uppsättning.',
    priceFrom: 'Från 7 000 kr',
    monthly: '1 495 kr/mån',
  },
  {
    name: 'Chatbot',
    href: '/chatbot',
    icon: MessageCircle,
    description:
      'Chatt på hemsidan tränad på verksamheten. Svarar dygnet runt, samlar leads.',
    priceFrom: 'Från 4 000 kr',
    monthly: '695 kr/mån',
  },
]

export function ProductOverview() {
  return (
    <section
      id="produkter"
      aria-labelledby="produkter-rubrik"
      className="relative overflow-hidden border-t border-border bg-muted dark:bg-muted/10 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={revealStagger}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionEyebrow>Tjänster</SectionEyebrow>
          <motion.h2
            id="produkter-rubrik"
            variants={reveal}
            className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Tre sätt att få fler kunder
          </motion.h2>
          <motion.p
            variants={reveal}
            className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Välj det som passar din verksamhet, eller kombinera flera.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={revealStagger}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {products.map((p) => {
            const Icon = p.icon
            return (
              <Link key={p.href} href={p.href} aria-label={`${p.name}, läs mer`} className="group">
                <motion.article
                  variants={reveal}
                  className="card-depth flex h-full flex-col gap-5 rounded-3xl border border-border bg-card p-8 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground">{p.name}</h3>

                  <p className="flex-1 text-sm leading-relaxed text-pretty text-muted-foreground/85 transition-colors group-hover:text-muted-foreground">
                    {p.description}
                  </p>

                  <div className="border-t border-border/60 pt-5">
                    <span className="text-2xl font-black text-foreground">{p.priceFrom}</span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      + {p.monthly}{' '}
                      <span className="text-xs text-muted-foreground/70">exkl. moms</span>
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Läs mer
                    <ArrowUpRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </motion.article>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
