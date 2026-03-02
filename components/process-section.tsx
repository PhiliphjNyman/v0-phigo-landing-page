'use client'

import { motion } from 'framer-motion'
import { Search, Paintbrush, RocketIcon } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Analys & strategi',
    description:
      'Vi borjar med att forsta ert foretag, era mal och er malgrupp. Darefter tar vi fram en strategi som styr hela projektet.',
  },
  {
    number: '02',
    icon: Paintbrush,
    title: 'Design & utveckling',
    description:
      'Vi designar och bygger er sajt med fokus pa konvertering, prestanda och anvandarvanlighet. Ni ar med i hela processen.',
  },
  {
    number: '03',
    icon: RocketIcon,
    title: 'Lansering & optimering',
    description:
      'Vi lanserar er nya sajt och foljer upp med data och insikter. Kontinuerlig optimering saker att resultaten haller over tid.',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-28">
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
            Var process
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Fran ide till lansering i tre steg
          </motion.h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              >
                {/* Connector line on desktop */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border md:block" />
                )}

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary/30">
                    {step.number}
                  </span>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
