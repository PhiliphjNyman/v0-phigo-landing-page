'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'

const placeholderLogos = [
  'NordicTech',
  'Storberg',
  'Avenio',
  'KlarDigital',
  'Brandfokus',
]

export function TrustBar() {
  return (
    <section className="border-y border-border bg-muted/30 py-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeIn}
        className="mx-auto max-w-6xl px-4 lg:px-6"
      >
        <p className="text-center text-sm text-muted-foreground">
          Foretag litar pa PHIGO for moderna, snabba och skalbara webbplatser.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 lg:gap-14">
          {placeholderLogos.map((name) => (
            <span
              key={name}
              className="text-sm font-semibold tracking-wide text-muted-foreground/50 uppercase select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
