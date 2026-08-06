import type { Variants, Transition } from 'framer-motion'

export const springTransition: Transition = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
  mass: 0.8,
}

/* Shared scroll-reveal system (moment 4). ONE fade-and-rise used site-wide for
   sections and cards: opacity 0→1 + translateY 16px→0, ~0.35s ease-out. Reduced
   motion is handled globally by <MotionConfig reducedMotion="user"> (see
   framer-exports.tsx) — it drops the y-translate and keeps a plain fade. Pair
   `revealStagger` on a container with `reveal` on its children for staggered
   grids/lists (60–80ms between children). Bespoke, non-generic motion (hero
   entrance, process line-draw + number pop, counters, price-card emphasis,
   contact success pop, case-detail image pop) stays out of this system. */
const easeOut = [0.22, 0.61, 0.36, 1] as const

export const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeOut },
  },
}

export const revealStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
}

/* Hero-only (moment 1–2, shipped — do not fold into the reveal system).
   fadeInUp was retired in fas 6 G: the hero CTA group now uses the CSS
   entrance (.hero-entrance__cta) so it paints before hydration (LCP). */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/* Bespoke pop — case-detail hero image + contact-form success confirmation. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
}
