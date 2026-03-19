'use client'

import { useEffect } from 'react'
import { motion, MotionConfig } from 'framer-motion'

export const MotionDiv = motion.div
export const MotionSpan = motion.span
export const MotionH1 = motion.h1
export const MotionH2 = motion.h2
export const MotionP = motion.p
export const MotionSection = motion.section
export const MotionArticle = motion.article

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
