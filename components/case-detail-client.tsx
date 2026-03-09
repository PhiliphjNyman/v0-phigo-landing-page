'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Counter } from '@/components/ui/counter'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Case } from '@/lib/cases'

export function CaseDetailClient({ c, relatedCases }: { c: Case, relatedCases: Case[] }) {
    return (
        <div className="min-h-dvh pt-24 pb-12">
            <article className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Navigation & Breadcrumbs */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-8 mb-12"
                >
                    <Link
                        href="/cases"
                        className="group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                        Tillbaka till alla case
                    </Link>

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Start</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/cases">Case</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{c.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </motion.div>

                {/* Hero Section */}
                <section className="grid gap-12 lg:grid-cols-2 lg:items-center mb-20 lg:mb-32">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp}>
                            <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1 text-primary bg-primary/10">
                                {c.category}
                            </Badge>
                            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6">
                                {c.title}
                            </h1>
                            <p className="text-xl text-pretty text-muted-foreground leading-relaxed mb-8">
                                {c.shortDescription}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 items-center">
                            {c.stats?.map((stat, i) => (
                                <div key={i} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-1 shadow-sm">
                                    <span className="text-3xl font-black text-primary">
                                        <Counter
                                            value={parseInt(stat.value.replace(/[^0-9]/g, ''))}
                                            prefix={stat.value.includes('+') ? '+' : ''}
                                            suffix={stat.value.includes('%') ? '%' : ''}
                                        />
                                    </span>
                                    <span className="text-xs font-bold uppercase text-muted-foreground">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                            <a
                                href={c.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-[opacity,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            >
                                Besök hemsida
                                <span className="sr-only">(öppnas i ny flik)</span>
                                <ArrowUpRight className="size-4" aria-hidden="true" />
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate="visible"
                        className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl"
                    >
                        <Image
                            src={c.heroImage}
                            alt={c.title}
                            fill
                            className="object-cover object-top"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </motion.div>
                </section>

                {/* Content Section */}
                <div className="grid gap-16 lg:grid-cols-3 mb-24 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 prose prose-invert prose-lg max-w-none"
                    >
                        <h2 className="text-balance text-3xl font-bold text-foreground mb-6">Om projektet</h2>
                        <p className="text-pretty text-muted-foreground leading-loose whitespace-pre-wrap">
                            {c.description}
                        </p>
                    </motion.div>

                    <aside
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-muted/30 border border-border rounded-3xl p-8"
                        >
                            <h3 className="text-balance text-xl font-bold text-foreground mb-6">Vad vi gjorde</h3>
                            <ul className="space-y-4">
                                {c.tags.map((tag, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle2 className="size-5 text-primary shrink-0" aria-hidden="true" />
                                        <span>{tag}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 border-l-2 border-primary/20 bg-primary/5 rounded-r-3xl"
                        >
                            <p className="text-sm italic text-muted-foreground leading-relaxed">
                                "Arbetet med PHIGO har varit transformativt för vår digitala närvaro. De kombinerar teknisk spets med en djup förståelse för vår affär."
                            </p>
                            <p className="mt-4 text-sm font-bold text-primary">— Referens från projektet</p>
                        </motion.div>
                    </aside>
                </div>

                {/* Related Cases */}
                {relatedCases.length > 0 && (
                    <section className="border-t border-border pt-24 mb-24">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-balance text-3xl font-bold text-foreground">Relaterade kundcase</h2>
                            <Button variant="ghost" className="gap-2 group transition-[background-color,color]" asChild>
                                <Link href="/cases">
                                    Visa alla
                                    <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2">
                            {relatedCases.map((rc) => (
                                <Link key={rc.slug} href={`/cases/${rc.slug}`}>
                                    <article className="group relative overflow-hidden rounded-[2rem] border border-border bg-card/50 transition-[border-color,background-color] duration-200 hover:border-primary/20 hover:bg-card">
                                        <div className="flex flex-col md:flex-row h-full">
                                            <div className="relative aspect-video md:aspect-square md:w-48 overflow-hidden shrink-0">
                                                <Image
                                                    src={rc.heroImage}
                                                    alt={rc.title}
                                                    fill
                                                    className="object-cover transition-transform duration-150 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="p-6 flex flex-col justify-center gap-2">
                                                <Badge variant="outline" className="w-fit text-[10px] uppercase text-muted-foreground group-hover:text-primary transition-colors">
                                                    {rc.category}
                                                </Badge>
                                                <h3 className="text-lg font-bold text-foreground group-hover:underline">{rc.title}</h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2">{rc.shortDescription}</p>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Big CTA */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="rounded-[3rem] bg-foreground text-background p-12 lg:p-20 text-center relative overflow-hidden"
                >
                    <h2 className="text-balance text-4xl lg:text-5xl font-black mb-8 relative z-10">Vill du ha liknande resultat?</h2>
                    <p className="text-pretty text-xl text-background/70 max-w-2xl mx-auto mb-12 relative z-10">
                        Vi hjälper er att definiera er digitala framtid och bygga lösningar som levererar mätbara framgångar.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <Button size="lg" className="h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:scale-105 transition-transform" asChild>
                            <Link href="/#kontakt">Boka en kostnadsfri analys</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl border-background/20 text-background hover:bg-background/10 font-bold" asChild>
                            <Link href="/cases">Se fler case</Link>
                        </Button>
                    </div>
                </motion.section>
            </article>
        </div>
    )
}
