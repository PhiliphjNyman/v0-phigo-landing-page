'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroOrb } from '@/components/hero-orb'
import { reveal, revealStagger } from '@/lib/animations'

export function FinalCta() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 lg:px-6 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={revealStagger}
          data-anchor
          className="anchor-emerald relative overflow-hidden rounded-3xl border border-white/10 px-6 py-16 text-center shadow-2xl shadow-primary/10 sm:px-12 lg:px-20"
        >
          {/* Decorative glow — soft light sheen over the emerald */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 size-60 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          </div>

          {/* Anchor orbs — a lower-left cluster on the emerald card (text-dense
              centre; the lower-left is the free atmospheric area). onDark forces
              the silhouette rim (the card is dark in both themes). Rotation +
              parallax, NO proximity. Desktop only — the mobile card is too text-
              dense to place one without covering the heading (fewer on mobile). */}
          <HeroOrb
            size={124}
            period={62}
            direction={1}
            parallax={0.24}
            textureOpacity={0.55}
            onDark
            glow="card"
            label="anchor-lg"
            className="hidden bottom-[9%] left-[4%] lg:block"
          />
          <HeroOrb
            size={72}
            period={48}
            direction={-1}
            parallax={0.16}
            textureOpacity={0.5}
            onDark
            glow="card"
            label="anchor-sm"
            className="hidden bottom-[34%] left-[15%] lg:block"
          />

          <div className="relative z-10">
            <motion.h2
              variants={reveal}
              className="text-balance text-3xl font-bold tracking-tight text-anchor-fg sm:text-4xl"
            >
              Vill du veta var din hemsida tappar kunder?
            </motion.h2>
            <motion.p
              variants={reveal}
              className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-anchor-fg-muted"
            >
              Vi granskar din sajt och visar konkret vad som kan förbättras,
              kostnadsfritt och utan förpliktelse.
            </motion.p>
            <motion.div
              variants={reveal}
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
