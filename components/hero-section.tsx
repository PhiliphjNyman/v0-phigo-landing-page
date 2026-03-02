'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations'
import { HeroVisual } from '@/components/hero-visual'

export function HeroSection() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20 pb-16 lg:pt-32">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Animated Blobs */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] mix-blend-screen"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.div variants={fadeIn}>
              <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
                Webbplatser som driver tillvaxt
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-8 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-6xl xl:text-7xl"
            >
              PHIGO bygger webbplatser som{' '}
              <span className="relative">
                <span className="relative z-10 text-primary">konverterar.</span>
                <svg className="absolute -bottom-2 lg:-bottom-4 left-0 -z-10 w-full" viewBox="0 0 358 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    d="M3 17C118.333 5.66667 239.667 5.66667 355 17"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="text-primary/20"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              Vi hjalper B2B-foretag att lansera eller frascha upp sin sajt med
              modern design, hog prestanda och matbara resultat.
            </motion.p>

            {/* CTA group */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="h-14 cursor-pointer rounded-2xl bg-primary px-10 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                <a href="#kontakt">
                  Fa en kostnadsfri analys
                  <ArrowRight className="ml-2 size-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-14 cursor-pointer text-base font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                <a href="#case">
                  Se vara case
                  <ChevronDown className="ml-2 size-5" />
                </a>
              </Button>
            </motion.div>

            {/* Microcopy */}
            <motion.div
              variants={fadeIn}
              className="mt-6 flex items-center gap-4 text-xs text-muted-foreground font-medium"
            >
              <span>✓ Tar 30 sekunder</span>
              <span className="size-1 rounded-full bg-border" />
              <span>✓ Ingen forpliktelse</span>
            </motion.div>
          </motion.div>

          {/* Hero Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="relative perspective-1000 hidden lg:block"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Bottom arrow indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/30"
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  )
}
