'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export function PageBackground() {
    const { scrollYProgress } = useScroll()

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.6, 0.6, 0.2])

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            {/* Primary morphing shape */}
            <motion.div
                style={{ rotate, scale, opacity }}
                className="absolute top-1/4 -left-1/4 size-[800px] rounded-full bg-primary/10 blur-[120px]"
            />

            {/* Secondary shape */}
            <motion.div
                style={{
                    rotate: useTransform(scrollYProgress, [0, 1], [360, 0]),
                    scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.2])
                }}
                className="absolute bottom-1/4 -right-1/4 size-[600px] rounded-full bg-emerald-500/5 blur-[100px]"
            />

            {/* Central accent that moves with scroll */}
            <motion.div
                style={{
                    y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                    opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.4, 0.4, 0])
                }}
                className="absolute top-0 left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-primary/10 blur-[150px]"
            />
        </div>
    )
}
