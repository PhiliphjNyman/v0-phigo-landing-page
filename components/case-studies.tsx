'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, TrendingUp, Zap, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'
import { Counter } from '@/components/ui/counter'

import Link from 'next/link'
import { getCases } from '@/lib/cases'

const cases = getCases()

const accentMap = {
  amber: 'group-hover:border-amber-500/30 text-amber-500 bg-amber-500/10',
  emerald: 'group-hover:border-emerald-500/30 text-emerald-500 bg-emerald-500/10',
  cyan: 'group-hover:border-cyan-500/30 text-cyan-500 bg-cyan-500/10',
}

const iconMap: Record<string, any> = {
  'leendekliniken': Heart,
  'andersson-el': Zap,
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
              className="text-sm font-bold uppercase text-primary"
            >
              Exempel
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
            >
              Så kan din hemsida se ut
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md text-pretty text-center text-muted-foreground sm:text-right"
          >
            Här är exempel på hemsidor vi byggt åt företag som ditt. Varje sajt
            är byggd för att besökare ska ta kontakt — inte bara titta.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cases.map((c) => {
            const stat = c.stats?.[0]
            const MetricIcon = iconMap[c.slug] || TrendingUp
            const accentStyles = accentMap[c.accent]

            return (
              <Link key={c.slug} href={`/cases/${c.slug}`} aria-label={c.title}>
                <motion.article
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/50 transition-[border-color,background-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-primary/20 hover:bg-card hover:shadow-2xl hover:shadow-primary/5 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                    <Image
                      src={c.heroImage}
                      alt={`Webbplats mockup för ${c.title}`}
                      fill
                      className="object-cover transition-transform duration-150 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-4 p-7">
                    <div className="flex flex-col gap-2">
                      {/* Case type badge */}
                      <span className="text-[10px] font-semibold uppercase text-muted-foreground/60">
                        {c.caseType === 'concept' ? 'Designexempel' : 'Kundcase'}
                      </span>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="rounded-lg bg-muted/50 text-xs font-semibold text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                        >
                          {c.category}
                        </Badge>
                        {stat && (
                          <div className={`flex items-center gap-1.5 text-sm font-bold transition-colors duration-500 ${accentStyles.split(' ')[1]}`}>
                            <MetricIcon className="size-4" aria-hidden="true" />
                            <Counter
                              value={parseInt(stat.value.replace(/[^0-9]/g, ''))}
                              prefix={stat.value.includes('+') ? '+' : ''}
                              suffix={stat.value.includes('%') ? '%' : ''}
                            />
                            <span className="text-[10px] font-medium uppercase text-muted-foreground/60 ml-1">
                              {stat.label}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground decoration-primary/30 decoration-2 transition-colors group-hover:underline">
                      {c.title}
                    </h3>

                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground/80 group-hover:text-muted-foreground transition-colors line-clamp-2">
                      {c.shortDescription}
                    </p>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                        Se case detaljer
                        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-4 right-4 h-1.5 w-1.5 rounded-full transition-[transform,opacity] duration-500 group-hover:scale-[8] group-hover:opacity-20 ${accentStyles.split(' ')[1].replace('text-', 'bg-')}`} aria-hidden="true" />
                </motion.article>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
