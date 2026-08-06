'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeIn } from '@/lib/animations'
import { PhigoMetricsBlock } from '@/components/ui/phigo-metrics-block'
import { SplitPaymentPromise } from '@/components/split-payment-promise'
import { HeroMesh } from '@/components/hero-mesh'
import { HeroOrb } from '@/components/hero-orb'

export function HeroSection() {
  const arrowRef = useRef(null)
  const isArrowInView = useInView(arrowRef)
  const arrowControls = useAnimation()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    if (isArrowInView) {
      arrowControls.start({
        opacity: [0, 1],
        y: [-20, 0],
        transition: { delay: 2, duration: 1, repeat: Infinity, repeatType: 'reverse' },
      })
    } else {
      arrowControls.stop()
    }
  }, [isArrowInView, arrowControls, prefersReducedMotion])

  // DEV-ONLY comparison toggle for judging the orbs: ?orbs=off to start hidden,
  // or press "o" to flip on the fly (ignored while typing in a field). Gated to
  // development so no judging tool ships to visitors — in production showOrbs
  // stays true and the listener is never attached.
  const [showOrbs, setShowOrbs] = useState(true)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('orbs') === 'off') setShowOrbs(false)
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      if (e.key === 'o' || e.key === 'O') setShowOrbs((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section data-hero className="hero-shell relative flex items-center overflow-hidden pt-20 pb-16 lg:pt-32">
      {/* Background — Stripe-style emerald mesh sweep (top-right, fades to center-left) */}
      <HeroMesh />

      {/* Orbs (moment 2). Rendered above the mesh but before the content, so
          text/CTAs always stack on top (content is z-10). Orbs may only live
          WHERE THE MESH GIVES THEM ATMOSPHERE — the upper-right glow along the
          mesh diagonal — never on the bare white left/lower area (reads as a
          sticker). They form ONE cluster: a large primary + a smaller secondary
          near each other (clear size difference = composition, not sprinkles),
          each with its own period/direction so they never spin in sync. Only the
          primary reacts to the pointer. Toggle with ?orbs=off / the "o" key. */}
      {showOrbs && (
        <>
          {/* DESKTOP (lg+) — the interactive cluster in the top-right glow. */}
          {/* PRIMARY — heart of the glow, full size/contrast, the only interactive
              one, biggest parallax. */}
          <HeroOrb
            size={200}
            period={45}
            direction={1}
            parallax={0.32}
            interactive
            textureOpacity={0.95}
            label="primary"
            glow="tr"
            className="hidden top-[12%] right-[6%] lg:block"
          />
          {/* SECONDARY — smaller, offset upper-left of the primary, still inside
              the glow, forming a diagonal big+small cluster. */}
          <HeroOrb
            size={104}
            period={57}
            direction={-1}
            parallax={0.22}
            textureOpacity={0.5}
            label="cluster-sm"
            glow="tr"
            className="hidden top-[8%] right-[22%] lg:block"
          />
          {/* MOBILE/TABLET (<lg) — one discrete flat sphere in the top-right glow,
              low opacity, static, no pointer logic. Text owns the centre. */}
          {/* Sized to clear the H1: the mobile trust pill (moment 6) makes the
              centered hero content taller, raising the H1; a smaller flat orb keeps
              the top-right accent clear of the heading (see visual-rules R2). */}
          <HeroOrb
            flat
            size={68}
            textureOpacity={0.5}
            label="mobile"
            glow="tr"
            className="block top-[9%] right-[8%] opacity-60 lg:hidden"
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Text Content */}
          <div className="hero-entrance flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="mt-8 text-balance text-fluid-h1 font-extrabold tracking-tight text-foreground">
              Din hemsida borde ge dig{' '}
              <span className="relative">
                <span className="relative z-10 text-primary">kunder</span>
                <svg className="absolute -bottom-2 lg:-bottom-4 left-0 -z-10 w-full" viewBox="0 0 358 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1 }}
                    d="M3 17C118.333 5.66667 239.667 5.66667 355 17"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="text-primary/20"
                  />
                </svg>
              </span>
              . Inte bara finnas.
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Vi bygger hemsidor åt lokala företag som faktiskt gör att folk tar
              kontakt. Fast pris, live inom 14 dagar.
            </p>

            {/* CTA group — G-fix (LCP): the primary CTA is the homepage's
                mobile LCP element, so the group animates via CSS
                (.hero-entrance__cta) and paints before JS hydrates, like the
                H1/p above it. Replaces the framer fadeInUp mount animation. */}
            <div className="hero-entrance__cta mt-12 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="h-auto w-full cursor-pointer rounded-2xl bg-primary px-6 py-4 text-base font-semibold whitespace-normal text-center text-primary-foreground shadow-xl shadow-primary/20 transition-[transform,background-color,box-shadow] duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98] sm:h-14 sm:w-auto sm:whitespace-nowrap sm:px-10 sm:py-0"
              >
                <a href="#kontakt">
                  Se vad din hemsida missar, kostnadsfritt
                  <ArrowRight className="ml-2 size-5 shrink-0" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-14 cursor-pointer text-base font-medium text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              >
                <a href="#case">
                  Se exempel
                  <ChevronDown className="ml-2 size-5" aria-hidden="true" />
                </a>
              </Button>
            </div>

            {/* Mobile trust promise — the split-payment line gets a place below
                the CTAs on <lg (the desktop stat block that carries it is hidden
                here). Compact one-liner, same glass style, placed after the CTAs
                so it never pushes them down. */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-6 w-full max-w-sm lg:hidden"
            >
              <SplitPaymentPromise className="py-2.5" />
            </motion.div>

            {/* Microcopy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-6 flex items-center gap-4 text-xs text-muted-foreground font-medium"
            >
              <span><span aria-hidden="true">✓</span> Tar 30 sekunder</span>
              <span className="size-1 rounded-full bg-border" aria-hidden="true" />
              <span><span aria-hidden="true">✓</span> Ingen förpliktelse</span>
            </motion.div>
          </div>

          {/* Hero Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="relative perspective-1000 hidden lg:block"
          >
            <PhigoMetricsBlock />
          </motion.div>
        </div>
      </div>

      {/* Bottom arrow indicator */}
      <motion.div
        ref={arrowRef}
        animate={arrowControls}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/30"
        aria-hidden="true"
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  )
}
