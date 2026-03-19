'use client'

import { motion } from 'framer-motion'
import { Palette, Rocket, Settings, CheckCircle2 } from 'lucide-react'
import { fadeInUp, staggerContainer, containerStaggerFast } from '@/lib/animations'
import { Progress } from '@/components/ui/progress'

const services = [
  {
    icon: Palette,
    title: 'Konverteringsfokuserad design',
    description:
      'Design som inte bara ser bra ut -- utan som aktivt driver besökare till att bli kunder. Varje element är strategiskt placerat för maximal effekt.',
    features: ['UX-analys', 'A/B-testning', 'Mobiloptimering'],
    metric: 95,
    metricLabel: 'Design Score',
  },
  {
    icon: Rocket,
    title: 'Snabb och modern teknik',
    description:
      'Vi bygger med den senaste tekniken för blixtsnabb laddtid, sökmotoroptimering och skalbarhet. Resultatet är en sajt som presterar.',
    features: ['Next.js 15', 'Edge Computing', 'Lighthouse 100'],
    featured: true,
    metric: 100,
    metricLabel: 'Prestanda',
  },
  {
    icon: Settings,
    title: 'Enkelt att underhålla',
    description:
      'En sajt ska vara lätt att uppdatera, även utan teknisk bakgrund. Vi levererar lösningar som är intuitiva och framtidssäkra.',
    features: ['Headless CMS', 'Supportavtal', 'Utbildning'],
    metric: 90,
    metricLabel: 'Användarvänlighet',
  },
]

export function Services() {
  return (
    <section id="tjanster" className="relative border-t border-border bg-muted/10 py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
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
            className="text-sm font-bold uppercase tracking-widest text-primary"
          >
            Värdeerbjudande
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
          >
            Allt du behöver för en sajt som levererar
          </motion.h2>
        </motion.div>

        {/* Service cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mt-20 grid gap-8 md:grid-cols-3"
        >
          {services.map((service, i) => {
            const Icon = service.icon
            const isFeatured = service.featured

            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className={`group relative flex flex-col gap-6 rounded-[2.5rem] border border-border p-8 transition-[box-shadow,background-color] duration-200 hover:shadow-2xl ${isFeatured
                  ? 'bg-card md:-mt-4 md:mb-4 border-primary/20 shadow-xl shadow-primary/5'
                  : 'bg-card/40 hover:bg-card'
                  }`}
              >
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
                    Populärast
                  </div>
                )}

                <div className={`flex size-14 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3 ${isFeatured ? 'bg-primary shadow-lg shadow-primary/20 text-white' : 'bg-primary/10 text-primary'}`}>
                  <Icon className="size-7" aria-hidden="true" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
                    {service.description}
                  </p>
                </div>

                {/* Features list */}
                <motion.ul
                  variants={containerStaggerFast}
                  className="flex flex-col gap-3 border-t border-border pt-6"
                >
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2 text-sm font-medium text-foreground/70 group-hover:text-foreground">
                      <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </motion.ul>

                {/* Metric / Progress */}
                <div className="mt-auto pt-6">
                  <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span>{service.metricLabel}</span>
                    <span className="text-primary">{service.metric}%</span>
                  </div>
                  <Progress value={service.metric} className="h-1.5 bg-muted group-hover:bg-muted/10 transition-colors" />
                </div>

                {/* Interactive Glow for featured item */}
                {isFeatured && (
                  <div className="absolute inset-0 -z-10 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[2.5rem]" />
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
