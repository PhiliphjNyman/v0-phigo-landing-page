'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, TrendingUp, Zap, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const cases = [
  {
    company: 'Nordic Consulting',
    industry: 'B2B Konsulttjanster',
    description:
      'Omdesign av en foraldrad hemsida till en modern, konverteringsoptimerad sajt med fokus pa leadgenerering och trovardig positionering.',
    metric: '+68% fler leads',
    metricIcon: TrendingUp,
    image: '/images/case-nordic.jpg',
  },
  {
    company: 'Storberg E-handel',
    industry: 'E-handel',
    description:
      'Ny e-handelslosning med blixtsnabb laddtid, mobilvanlighet och somlost kopflode som ledde till okad konvertering.',
    metric: '40% snabbare laddtid',
    metricIcon: Zap,
    image: '/images/case-storberg.jpg',
  },
  {
    company: 'Avenio Fastigheter',
    industry: 'Lokalt tjansteforetag',
    description:
      'En helt ny digital narvarol med modernt formsprak, tydligt varderbjudande och integrerad bokningsfunktion.',
    metric: '+120% besokare',
    metricIcon: Users,
    image: '/images/case-avenio.jpg',
  },
]

export function CaseStudies() {
  return (
    <section id="case" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
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
            className="text-xs font-semibold uppercase tracking-wider text-primary"
          >
            Exempel pa leveranser
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Utvalda projekt fran PHIGO
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground"
          >
            Vi hjalper foretag att sta ut digitalt med design och teknik som gor
            skillnad pa riktigt.
          </motion.p>
        </motion.div>

        {/* Case cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {cases.map((c) => {
            const MetricIcon = c.metricIcon
            return (
              <motion.article
                key={c.company}
                variants={fadeInUp}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/30"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={c.image}
                    alt={`Webbplats mockup for ${c.company}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="text-xs text-muted-foreground"
                    >
                      {c.industry}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs font-medium text-primary">
                      <MetricIcon className="size-3.5" />
                      {c.metric}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {c.company}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>
                  <a
                    href="#kontakt"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Se case
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
