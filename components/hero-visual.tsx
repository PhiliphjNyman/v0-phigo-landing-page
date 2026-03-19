'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Monitor, Smartphone, Layout, MousePointer2 } from 'lucide-react'

export function HeroVisual() {
    const containerRef = useRef<HTMLDivElement>(null)
    const cachedRect = useRef<DOMRect | null>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 })
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 })

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

    function handleMouseEnter() {
        if (containerRef.current) {
            cachedRect.current = containerRef.current.getBoundingClientRect()
        }
    }

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = cachedRect.current
        if (!rect) return
        x.set((event.clientX - rect.left) / rect.width - 0.5)
        y.set((event.clientY - rect.top) / rect.height - 0.5)
    }

    function handleMouseLeave() {
        cachedRect.current = null
        x.set(0)
        y.set(0)
    }

    return (
        <div
            ref={containerRef}
            className="relative flex h-full items-center justify-center py-12"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            aria-hidden="true"
        >
            {/* Static shadow layer — kept off the rotating element to avoid continuous repaint */}
            <div className="absolute aspect-video w-[600px] rounded-2xl shadow-2xl" />
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className="relative aspect-video w-[600px] rounded-2xl border border-white/10 bg-white/5 p-4"
            >
                {/* Title Bar */}
                <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                    <div className="flex gap-1.5">
                        <div className="size-2.5 rounded-full bg-red-500/50" />
                        <div className="size-2.5 rounded-full bg-yellow-500/50" />
                        <div className="size-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex-1 text-center">
                        <div className="mx-auto h-4 w-32 rounded-md bg-white/5" />
                    </div>
                </div>

                {/* Content Area */}
                <div className="grid h-[calc(100%-40px)] grid-cols-12 gap-4 pt-4">
                    <div className="col-span-3 space-y-4">
                        <div className="h-20 rounded-xl bg-primary/20" />
                        <div className="space-y-2">
                            <div className="h-3 w-full rounded bg-white/5" />
                            <div className="h-3 w-4/5 rounded bg-white/5" />
                        </div>
                    </div>
                    <div className="col-span-9 space-y-4">
                        <div className="relative h-48 overflow-hidden rounded-xl bg-white/5 px-6 pt-10">
                            <div className="h-4 w-3/4 rounded bg-primary/30" />
                            <div className="mt-4 h-3 w-1/2 rounded bg-white/10" />
                            <div className="mt-6 flex gap-3">
                                <div className="h-8 w-24 rounded-lg bg-primary" />
                                <div className="h-8 w-20 rounded-lg bg-white/10" />
                            </div>

                            {/* Floating elements with Z translation */}
                            <motion.div
                                style={{ translateZ: 50 }}
                                className="absolute -right-4 top-10 flex h-32 w-24 items-center justify-center rounded-xl border border-white/10 bg-card shadow-xl"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Layout className="size-4 text-primary" />
                                    </div>
                                    <div className="h-2 w-12 rounded bg-white/10" />
                                    <div className="h-2 w-8 rounded bg-white/5" />
                                </div>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-20 rounded-xl bg-white/5 p-3 space-y-2">
                                    <div className="size-6 rounded-lg bg-white/10" />
                                    <div className="h-2 w-full rounded bg-white/5" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                    style={{ translateZ: 100 }}
                    className="absolute -bottom-6 -left-6 flex gap-2 rounded-2xl border border-white/10 bg-background p-3 shadow-xl"
                >
                    <Smartphone className="size-5 text-muted-foreground" />
                    <Monitor className="size-5 text-primary" />
                </motion.div>

                <motion.div
                    style={{ translateZ: 80, rotate: 12 }}
                    className="absolute -top-10 -right-4 flex items-center gap-2 rounded-xl bg-emerald-500/90 px-4 py-2 text-[10px] font-bold text-white shadow-lg"
                >
                    <MousePointer2 className="size-3" />
                    LIVE DESIGN
                </motion.div>
            </motion.div>

            {/* Glow Effect */}
            <div className="absolute inset-0 -z-10 bg-primary/20 blur-[100px] opacity-20" />
        </div>
    )
}
