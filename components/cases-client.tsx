'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, TrendingUp, Zap, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Counter } from '@/components/ui/counter'
import { Case } from '@/lib/cases'

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
    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allCases.map((c) => {
                const stat = c.stats?.[0]
                const MetricIcon = iconMap[c.slug] || TrendingUp
                const accentStyles = accentMap[c.accent]

                return (
                    <motion.div
                        key={c.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link href={`/cases/${c.slug}`} aria-label={c.title}>
                            <article
                                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/50 transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/20 hover:bg-card hover:shadow-2xl hover:shadow-primary/5 cursor-pointer"
                            >
                                <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                                    <Image
                                        src={c.heroImage}
                                        alt={`Webbplats mockup för ${c.title}`}
                                        fill
                                        className="object-cover transition-transform duration-150 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col gap-4 p-7">
                                    <div className="flex flex-col gap-2">
                                        {/* Designexempel badge */}
                                        <span className="text-[10px] font-semibold uppercase text-muted-foreground/60">
                                            Designexempel
                                        </span>
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
        </div>
    )
}
