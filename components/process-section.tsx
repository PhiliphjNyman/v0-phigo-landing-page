'use client'

import { motion } from 'framer-motion'
import { Search, Paintbrush, RocketIcon, ChevronRight } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Analys & strategi',
    description:
      'Vi börjar med att förstå ert företag, era mål och er målgrupp. Därefter tar vi fram en strategi som styr hela projektet.',
    accent: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    number: '02',
    icon: Paintbrush,
    title: 'Design & utveckling',
    description:
      'Vi designar och bygger er sajt med fokus på konvertering, prestanda och användarvänlighet. Ni är med i hela processen.',
    accent: 'from-primary/20 to-primary/5',
  },
  {
    number: '03',
    icon: RocketIcon,
    title: 'Lansering & optimering',
    description:
      'Vi lanserar er nya sajt och följer upp med data och insikter. Kontinuerlig optimering säkerställer att resultaten håller över tid.',
    accent: 'from-cyan-500/20 to-cyan-500/5',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-full max-w-5xl bg-primary/5 blur-[120px] rounded-full" />

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
            Vår process
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
          >
            Från idé till lansering i tre steg
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground"
          >
            Vi har förfinat vår process för att leverera högkvalitativa webbplatser
            snabbt och effektivt, utan att tulla på detaljerna.
          </motion.p>
        </motion.div>

        {/* Steps Pipeline */}
        <div className="relative mt-24">
          {/* Connector Path for Desktop */}
          <div className="absolute top-[4.5rem] left-[15%] right-[15%] hidden h-0.5 bg-gradient-to-r from-emerald-500/20 via-primary/50 to-cyan-500/20 md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className="absolute inset-0 h-full bg-primary origin-left shadow-[0_0_10px_rgba(var(--primary),0.5)]"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid gap-12 md:grid-cols-3 md:gap-8"
          >
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className="group relative flex flex-col items-center text-center md:items-start md:text-left"
                >
                  {/* Step Visual */}
                  <div className="relative z-10 mb-8 flex size-36 items-center justify-center rounded-full bg-muted/30 p-4 transition-[transform] duration-500 group-hover:scale-105">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                    <div className="relative flex flex-col items-center gap-2">
                      <motion.span
                        initial={{ opacity: 0.2, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.15 }}
                        className="text-4xl font-black tracking-tighter text-primary/40 transition-colors duration-500 group-hover:text-primary"
                      >
                        {step.number}
                      </motion.span>
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-card shadow-xl border border-border group-hover:border-primary/30 transition-[border-color]">
                        <Icon className="size-7 text-primary" />
                      </div>
                    </div>

                    {/* Spinning border effect on hover */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 opacity-0 transition-opacity duration-500 group-hover:animate-[spin_20s_linear_infinite] group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
                      {step.description}
                    </p>

                    {/* Step Features - micro interaction */}
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <span>Läs mer om fasen</span>
                      <ChevronRight className="size-4" />
                    </div>
                  </div>

                  {/* Decorative Connector on Mobile */}
                  {i < steps.length - 1 && (
                    <div className="mt-8 h-12 w-px bg-gradient-to-b from-primary/50 to-transparent md:hidden" />
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
