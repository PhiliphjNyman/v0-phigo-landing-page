'use client'

import { motion } from 'framer-motion'
import { Search, Paintbrush, RocketIcon } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Vi lär känna ditt företag',
    description:
      'Vi ställer ett par frågor om din verksamhet, dina kunder och vad du vill att sajten ska göra. Det tar ungefär 30 minuter.',
  },
  {
    number: '02',
    icon: Paintbrush,
    title: 'Vi bygger din sajt',
    description:
      'Vi bygger en enkel, snabb och tydlig hemsida som gör det lätt för besökare att ta kontakt. Du ser och godkänner innan vi går live.',
  },
  {
    number: '03',
    icon: RocketIcon,
    title: 'Din sajt går live',
    description:
      'Inom 14 dagar är sajten live. Vi ser till att den alltid är uppe, funkar på mobilen och hjälper dig med ändringar löpande.',
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
            className="text-sm font-bold uppercase text-primary"
          >
            Så funkar det
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
          >
            Din nya hemsida på 14 dagar
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground"
          >
            Tre enkla steg från första kontakt till live sajt.
            Du behöver inte kunna något om teknik.
          </motion.p>
        </motion.div>

        {/* Steps Pipeline */}
        <div className="relative mt-24">
          {/* Connector Path for Desktop */}
          <div className="absolute top-[4.5rem] left-[15%] right-[15%] hidden h-0.5 bg-border md:block">
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
                  <div className="relative z-10 mb-8 flex size-36 items-center justify-center rounded-full bg-muted/30 p-4 transition-[transform] duration-200 group-hover:scale-105">
                    <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <div className="relative flex flex-col items-center gap-2">
                      <motion.span
                        initial={{ opacity: 0.2, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.15 }}
                        className="text-4xl font-black text-primary/40 transition-colors duration-200 group-hover:text-primary"
                      >
                        {step.number}
                      </motion.span>
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-card shadow-xl border border-border group-hover:border-primary/30 transition-[border-color]">
                        <Icon className="size-7 text-primary" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Rotating border effect on hover */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-balance text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-pretty text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
                      {step.description}
                    </p>

                  </div>

                  {/* Decorative Connector on Mobile */}
                  {i < steps.length - 1 && (
                    <div className="mt-8 h-12 w-px bg-border md:hidden" />
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
