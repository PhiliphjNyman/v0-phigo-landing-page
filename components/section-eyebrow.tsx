'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { reveal } from '@/lib/animations'

/* Canonical section eyebrow (moment 6) — the small uppercase accent label above
   a section heading. The style is locked in ONE place: 12px, bold, uppercase,
   0.15em tracking, primary. Renders a motion.span on the shared `reveal` variant
   so it drops into the existing `revealStagger` parents unchanged. `className` is
   merged LAST (twMerge) so a caller on a dark surface can override the color
   (e.g. text-anchor-fg-muted on the demo-CTA) or add layout (mt-6 block). Extra
   props (aria-hidden, or initial/whileInView for standalone use) pass through. */
export function SectionEyebrow({
  className,
  children,
  ...props
}: HTMLMotionProps<'span'>) {
  return (
    <motion.span
      variants={reveal}
      className={cn(
        'text-xs font-bold uppercase tracking-[0.15em] text-primary',
        className,
      )}
      {...props}
    >
      {children}
    </motion.span>
  )
}
