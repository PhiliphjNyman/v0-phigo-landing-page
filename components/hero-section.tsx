'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, fadeIn } from '@/lib/animations'

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-16">
      {/* Background grid effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.17_160_/_0.08),transparent_70%)]" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 lg:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeIn}>
            <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              Webbplatser som driver tillvaxt
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            PHIGO bygger webbplatser som{' '}
            <span className="text-primary">konverterar.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Vi hjalper B2B-foretag att lansera eller frascha upp sin sajt med
            modern design, hog prestanda och matbara resultat.
          </motion.p>

          {/* CTA group */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              asChild
              size="lg"
              className="cursor-pointer rounded-xl bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              <a href="#kontakt">
                Fa en kostnadsfri webbplatsanalys
                <ArrowRight className="ml-1 size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <a href="#case">
                Se vara case
                <ChevronDown className="ml-1 size-4" />
              </a>
            </Button>
          </motion.div>

          {/* Microcopy */}
          <motion.p
            variants={fadeIn}
            className="mt-4 text-xs text-muted-foreground"
          >
            Tar 30 sekunder &middot; Ingen forpliktelse
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
