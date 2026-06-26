'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function FinalCta() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 lg:px-6 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="anchor-emerald relative overflow-hidden rounded-3xl border border-white/10 px-6 py-16 text-center shadow-2xl shadow-primary/10 sm:px-12 lg:px-20"
        >
          {/* Decorative glow — soft light sheen over the emerald */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 size-60 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative">
            <motion.h2
              variants={fadeInUp}
              className="text-balance text-3xl font-bold tracking-tight text-anchor-fg sm:text-4xl"
            >
              Vill du veta var din hemsida tappar kunder?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-anchor-fg-muted"
            >
              Vi granskar din sajt och visar konkret vad som kan förbättras,
              kostnadsfritt och utan förpliktelse.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="cursor-pointer rounded-xl bg-white px-8 text-anchor-ink shadow-lg shadow-black/25 hover:bg-white/90 hover:shadow-xl hover:shadow-black/30 focus-visible:border-white focus-visible:ring-white/70 active:scale-[0.98] transition-[transform,background-color,box-shadow] duration-200"
              >
                <a href="#kontakt">
                  Skicka din sajt, vi visar vad du missar
                  <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </a>
              </Button>
              <p className="text-xs text-anchor-fg-muted">
                Kostnadsfritt &middot; Svar inom 24h
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
