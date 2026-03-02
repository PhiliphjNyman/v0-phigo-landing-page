'use client'

import { motion } from 'framer-motion'
import { Palette, Rocket, Settings } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const services = [
  {
    icon: Palette,
    title: 'Konverteringsfokuserad design',
    description:
      'Design som inte bara ser bra ut -- utan som aktivt driver besokare till att bli kunder. Varje element ar strategiskt placerat for maximal effekt.',
  },
  {
    icon: Rocket,
    title: 'Snabb och modern teknik',
    description:
      'Vi bygger med den senaste tekniken for blixtsnabb laddtid, sokmotoroptimering och skalbarhet. Resultatet ar en sajt som presterar.',
  },
  {
    icon: Settings,
    title: 'Enkelt att underhalla',
    description:
      'En sajt ska vara latt att uppdatera, aven utan teknisk bakgrund. Vi levererar losningar som ar intuitiva och framtidssakra.',
  },
]

export function Services() {
  return (
    <section id="tjanster" className="border-t border-border bg-muted/20 py-20 lg:py-28">
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
            Vara tjanster
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Allt ni behover for en sajt som levererar
          </motion.h2>
        </motion.div>

        {/* Service cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/20"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
