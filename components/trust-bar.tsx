'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { fadeIn } from '@/lib/animations'

const placeholderLogos = [
  'NordicTech',
  'Storberg',
  'Avenio',
  'KlarDigital',
  'Brandfokus',
  'GlobalLink',
  'SveaIT',
  'CoreWeb',
]

export function TrustBar() {
  const marqueeRef = useRef(null)
  const isInView = useInView(marqueeRef)
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({ x: '-50%', transition: { duration: 30, repeat: Infinity, ease: 'linear' } })
    } else {
      controls.stop()
    }
  }, [isInView, controls])

  return (
    <section className="border-y border-border bg-muted/20 py-12 relative overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeIn}
        className="mx-auto max-w-7xl px-4 lg:px-8"
      >
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-10">
          Företag litar på PHIGO för modern webbutveckling
        </p>

        {/* Infinite Marquee Loop */}
        <div className="relative flex overflow-hidden" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent md:w-32" />
          <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent md:w-32" />

          <motion.div
            ref={marqueeRef}
            initial={{ x: 0 }}
            animate={controls}
            className="flex min-w-full shrink-0 items-center justify-around gap-12 lg:gap-24 px-12"
          >
            {[...placeholderLogos, ...placeholderLogos].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-lg font-black tracking-tighter text-muted-foreground/30 uppercase select-none whitespace-nowrap transition-colors hover:text-primary/50"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Sub-label toast-like micro-animations could go here if needed, 
          but for now the marquee is the priority */}
    </section>
  )
}
