'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

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
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    })

    useEffect(() => {
        if (inView) {
            motionValue.set(value)
        }
    }, [inView, value, motionValue])

    useEffect(() => {
        return springValue.on('change', (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`
            }
        })
    }, [springValue, prefix, suffix])

    return (
        <span ref={ref} className={className}>
            {prefix}0{suffix}
        </span>
    )
}
