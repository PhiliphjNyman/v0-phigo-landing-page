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
          className="relative overflow-hidden rounded-3xl bg-primary/10 px-6 py-16 text-center sm:px-12 lg:px-20"
        >
          {/* Decorative glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="relative">
            <motion.h2
              variants={fadeInUp}
              className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Redo att se vad er hemsida kan prestera?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground"
            >
              Få en kostnadsfri analys från PHIGO med konkreta
              förbättringsförslag för er nuvarande webbplats.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="cursor-pointer rounded-xl bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-[background-color,box-shadow] duration-200"
              >
                <a href="#kontakt">
                  Få en kostnadsfri webbplatsanalys
                  <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                Inget säljkrangel &middot; Svar inom 24h
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
