'use client'

import { motion } from 'framer-motion'
import { reveal, revealStagger } from '@/lib/animations'

export type ProductStep = {
  title: string
  description: string
}

/* 3-step mechanism (Vi lär den ditt företag -> ...). Numbered cards on the
   reveal system, mirroring the offer-section step pattern for site consistency. */
export function ProductSteps({ steps }: { steps: ProductStep[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealStagger}
      className="grid gap-8 md:grid-cols-3"
    >
      {steps.map((step, i) => (
        <motion.div
          key={step.title}
          variants={reveal}
          className="card-depth group relative flex flex-col gap-4 rounded-3xl border border-border bg-card/40 p-8 transition-[box-shadow,background-color] duration-200 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-lg font-black text-primary">
            {i + 1}
          </div>
          <h3 className="text-balance text-xl font-bold text-foreground">{step.title}</h3>
          <p className="text-sm leading-relaxed text-pretty text-muted-foreground/80 transition-colors group-hover:text-muted-foreground">
            {step.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}
