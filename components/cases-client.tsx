'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, TrendingUp, Filter, Zap, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Counter } from '@/components/ui/counter'
import { Case } from '@/lib/cases'

const categories = ['Alla', 'Tandvård', 'Elektriker / Hantverkare']

const accentMap = {
    amber: 'group-hover:border-amber-500/30 text-amber-500 bg-amber-500/10',
    emerald: 'group-hover:border-emerald-500/30 text-emerald-500 bg-emerald-500/10',
    cyan: 'group-hover:border-cyan-500/30 text-cyan-500 bg-cyan-500/10',
}

const iconMap: Record<string, any> = {
    'leendekliniken': Heart,
    'andersson-el': Zap,
}

export function CasesClient({ allCases }: { allCases: Case[] }) {
    const [activeFilter, setActiveFilter] = useState('Alla')

    const filteredCases = activeFilter === 'Alla'
        ? allCases
        : allCases.filter(c => c.category === activeFilter)

    return (
        <>
            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center justify-center gap-2 mb-12"
            >
                <div className="flex items-center gap-2 mr-4 text-muted-foreground text-sm font-medium">
                    <Filter className="size-4" aria-hidden="true" />
                    <span>Filtrera:</span>
                </div>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={activeFilter === category ? 'default' : 'outline'}
                        onClick={() => setActiveFilter(category)}
                        className="rounded-full px-6 transition-[background-color,color,border-color]"
                        aria-pressed={activeFilter === category}
                    >
                        {category}
                    </Button>
                ))}
            </motion.div>

            {/* Case Grid */}
            <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                aria-live="polite"
                aria-atomic="false"
            >
                <AnimatePresence mode="popLayout">
                    {filteredCases.map((c) => {
                        const stat = c.stats?.[0]
                        const MetricIcon = iconMap[c.slug] || TrendingUp
                        const accentStyles = accentMap[c.accent]

                        return (
                            <motion.div
                                key={c.slug}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link href={`/cases/${c.slug}`}>
                                    <article
                                        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/50 transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/20 hover:bg-card hover:shadow-2xl hover:shadow-primary/5 cursor-pointer"
                                    >
                                        <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                                            <Image
                                                src={c.heroImage}
                                                alt={c.title}
                                                fill
                                                className="object-cover transition-transform duration-150 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col gap-4 p-7">
                                            <div className="flex items-center justify-between">
                                                <Badge
                                                    variant="secondary"
                                                    className="rounded-lg bg-muted/50 text-xs font-semibold text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                                                >
                                                    {c.category}
                                                </Badge>
                                                {stat && (
                                                    <div className={`flex items-center gap-1.5 text-sm font-bold transition-colors duration-500 ${accentStyles.split(' ')[1]}`}>
                                                        <MetricIcon className="size-4" aria-hidden="true" />
                                                        <Counter
                                                            value={parseInt(stat.value.replace(/[^0-9]/g, ''))}
                                                            prefix={stat.value.includes('+') ? '+' : ''}
                                                            suffix={stat.value.includes('%') ? '%' : ''}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <h3 className="text-balance text-xl font-bold text-foreground group-hover:underline">
                                                {c.title}
                                            </h3>

                                            <p className="text-pretty flex-1 text-sm leading-relaxed text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
                                                {c.shortDescription}
                                            </p>

                                            <div className="mt-4 pt-4 border-t border-border/50">
                                                <div className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                                                    Läs mer om projektet
                                                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </motion.div>

            {filteredCases.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground">Inga case matchar ditt val.</p>
                    <Button
                        variant="link"
                        onClick={() => setActiveFilter('Alla')}
                        className="mt-4 text-primary"
                    >
                        Visa alla case
                    </Button>
                </div>
            )}
        </>
    )
}
