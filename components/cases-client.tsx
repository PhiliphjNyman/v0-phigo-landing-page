'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, TrendingUp, Filter, Zap, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Counter } from '@/components/ui/counter'
import { fadeInUp } from '@/lib/animations'
import { Case } from '@/lib/cases'

const industries = ['Alla', 'B2B konsulttjänster', 'E-handel', 'Lokalt tjänsteföretag']

const accentMap = {
    amber: 'group-hover:border-amber-500/30 text-amber-500 bg-amber-500/10',
    emerald: 'group-hover:border-emerald-500/30 text-emerald-500 bg-emerald-500/10',
    cyan: 'group-hover:border-cyan-500/30 text-cyan-500 bg-cyan-500/10',
}

const iconMap: Record<string, any> = {
    'nordic-consulting': TrendingUp,
    'storberg-ehandel': Zap,
    'avenio-fastigheter': Users,
}

export function CasesClient({ allCases }: { allCases: Case[] }) {
    const [activeFilter, setActiveFilter] = useState('Alla')

    const filteredCases = activeFilter === 'Alla'
        ? allCases
        : allCases.filter(c => c.industry === activeFilter)

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
                    <Filter className="size-4" />
                    <span>Filtrera:</span>
                </div>
                {industries.map((industry) => (
                    <Button
                        key={industry}
                        variant={activeFilter === industry ? 'default' : 'outline'}
                        onClick={() => setActiveFilter(industry)}
                        className="rounded-full px-6 transition-all"
                    >
                        {industry}
                    </Button>
                ))}
            </motion.div>

            {/* Case Grid */}
            <motion.div
                layout
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
                <AnimatePresence mode="popLayout">
                    {filteredCases.map((c) => {
                        const metric = c.metrics[0]
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
                                                src={c.image}
                                                alt={c.title}
                                                fill
                                                className="object-cover transition-transform duration-150 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                                        </div>

                                        <div className="flex flex-1 flex-col gap-4 p-7">
                                            <div className="flex items-center justify-between">
                                                <Badge
                                                    variant="secondary"
                                                    className="rounded-lg bg-muted/50 text-xs font-semibold text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                                                >
                                                    {c.industry}
                                                </Badge>
                                                <div className={`flex items-center gap-1.5 text-sm font-bold transition-all duration-500 ${accentStyles.split(' ')[1]}`}>
                                                    <MetricIcon className="size-4" />
                                                    <Counter
                                                        value={parseInt(metric.value.replace(/[^0-9]/g, ''))}
                                                        prefix={metric.value.includes('+') ? '+' : ''}
                                                        suffix={metric.value.includes('%') ? '%' : ''}
                                                    />
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-foreground transition-all group-hover:underline">
                                                {c.title}
                                            </h3>

                                            <p className="flex-1 text-sm leading-relaxed text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
                                                {c.summary}
                                            </p>

                                            <div className="mt-4 pt-4 border-t border-border/50">
                                                <div className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3">
                                                    Läs mer om projektet
                                                    <ArrowUpRight className="size-4" />
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
