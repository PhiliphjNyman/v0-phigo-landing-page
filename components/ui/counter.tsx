'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface CounterProps {
    value: number
    duration?: number
    className?: string
    prefix?: string
    suffix?: string
}

export function Counter({
    value,
    duration = 2,
    className,
    prefix = '',
    suffix = '',
}: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: '-50px' })
    // useSpring is not gated by <MotionConfig reducedMotion="user"> (that only
    // covers motion components), so honor the preference explicitly: jump to the
    // final value with no count-up.
    const prefersReducedMotion = useReducedMotion()
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    })

    useEffect(() => {
        if (!inView) return
        if (prefersReducedMotion) {
            if (ref.current) ref.current.textContent = `${prefix}${value}${suffix}`
            return
        }
        motionValue.set(value)
    }, [inView, value, motionValue, prefersReducedMotion, prefix, suffix])

    useEffect(() => {
        if (prefersReducedMotion) return
        return springValue.on('change', (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`
            }
        })
    }, [springValue, prefix, suffix, prefersReducedMotion])

    return (
        <span
            ref={ref}
            className={`tabular-nums${className ? ` ${className}` : ''}`}
            aria-label={`${prefix}${value}${suffix}`}
        >
            {prefix}0{suffix}
        </span>
    )
}
