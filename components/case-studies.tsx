'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, TrendingUp, Zap, Users, ChevronRight, ChevronLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'
import { Counter } from '@/components/ui/counter'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const cases = [
  {
    company: 'Nordic Consulting',
    industry: 'B2B Konsulttjänster',
    description:
      'Omdesign av en föråldrad hemsida till en modern, konverteringsoptimerad sajt med fokus på leadgenerering och trovärdig positionering.',
    metricPrefix: '+',
    metricValue: 68,
    metricSuffix: '% fler leads',
    metricIcon: TrendingUp,
    image: '/images/case-nordic.jpg',
    accent: 'amber',
  },
  {
    company: 'Storberg E-handel',
    industry: 'E-handel',
    description:
      'Ny e-handelslösning med blixtsnabb laddtid, mobilvänlighet och sömlöst köpflode som ledde till ökad konvertering.',
    metricPrefix: '',
    metricValue: 40,
    metricSuffix: '% snabbare laddtid',
    metricIcon: Zap,
    image: '/images/case-storberg.jpg',
    accent: 'emerald',
  },
  {
    company: 'Avenio Fastigheter',
    industry: 'Lokalt tjänsteföretag',
    description:
      'En helt ny digital närvaro med modernt formspråk, tydligt värderbjudande och integrerad bokningsfunktion.',
    metricPrefix: '+',
    metricValue: 120,
    metricSuffix: '% besökare',
    metricIcon: Users,
    image: '/images/case-avenio.jpg',
    accent: 'cyan',
  },
]

const accentMap = {
  amber: 'group-hover:border-amber-500/30 text-amber-500 bg-amber-500/10',
  emerald: 'group-hover:border-emerald-500/30 text-emerald-500 bg-emerald-500/10',
  cyan: 'group-hover:border-cyan-500/30 text-cyan-500 bg-cyan-500/10',
}

export function CaseStudies() {
  return (
    <section id="case" className="py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="text-center sm:text-left"
          >
            <motion.span
              variants={fadeInUp}
              className="text-sm font-bold uppercase tracking-widest text-primary"
            >
              Exempel på leveranser
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
            >
              Utvalda projekt från PHIGO
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md text-pretty text-center text-muted-foreground sm:text-right"
          >
            Vi hjälper B2B-företag att stå ut digitalt med design och teknik som gör
            skillnad på riktigt.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-16"
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {cases.map((c) => {
                const MetricIcon = c.metricIcon
                const accentStyles = accentMap[c.accent as keyof typeof accentMap]

                return (
                  <CarouselItem key={c.company} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <motion.article
                      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/50 transition-all duration-500 hover:border-primary/20 hover:bg-card hover:shadow-2xl hover:shadow-primary/5"
                    >
                      {/* Image with Overlay */}
                      <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                        <Image
                          src={c.image}
                          alt={`Webbplats mockup for ${c.company}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col gap-4 p-7">
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="secondary"
                            className="rounded-lg bg-muted/50 text-xs font-semibold text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                          >
                            {c.industry}
                          </Badge>
                          <div className={`flex items-center gap-1.5 text-sm font-bold transition-all duration-500 ${accentStyles.split(' ')[1]}`}>
                            <MetricIcon className="size-4" />
                            <Counter
                              value={c.metricValue}
                              prefix={c.metricPrefix}
                              suffix={c.metricSuffix.split(' ')[0]}
                            />
                            <span className="text-[10px] font-medium uppercase text-muted-foreground/60">
                              {c.metricSuffix.split(' ').slice(1).join(' ')}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-foreground decoration-primary/30 decoration-2 transition-all group-hover:underline">
                          {c.company}
                        </h3>

                        <p className="flex-1 text-sm leading-relaxed text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
                          {c.description}
                        </p>

                        <div className="mt-4 pt-4 border-t border-border/50">
                          <a
                            href="#kontakt"
                            className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
                          >
                            Se case detaljer
                            <ArrowUpRight className="size-4" />
                          </a>
                        </div>
                      </div>

                      {/* Corner Accent */}
                      <div className={`absolute top-4 right-4 h-1.5 w-1.5 rounded-full transition-all duration-500 group-hover:scale-[8] group-hover:opacity-20 ${accentStyles.split(' ')[1].replace('text-', 'bg-')}`} />
                    </motion.article>
                  </CarouselItem>
                )
              })}
            </CarouselContent>

            {/* Carousel Controls */}
            <div className="mt-12 flex justify-center gap-4 lg:hidden">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-2xl bg-muted border-border hover:bg-primary hover:text-white" />
              <CarouselNext className="static translate-y-0 h-12 w-12 rounded-2xl bg-muted border-border hover:bg-primary hover:text-white" />
            </div>

            <div className="hidden lg:block">
              <CarouselPrevious className="-left-16 h-12 w-12 rounded-2xl bg-muted/50 border-border hover:bg-primary hover:text-white transition-all backdrop-blur-sm" />
              <CarouselNext className="-right-16 h-12 w-12 rounded-2xl bg-muted/50 border-border hover:bg-primary hover:text-white transition-all backdrop-blur-sm" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}
