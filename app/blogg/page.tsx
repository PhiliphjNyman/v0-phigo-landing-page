import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getPublishedBlogPosts, getBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
    title: 'Blogg | PHIGO',
    description: 'Tips och guider för lokala företag som vill ha fler kunder via sin hemsida.',
    alternates: {
        canonical: 'https://phigo.se/blogg',
    },
    openGraph: {
        title: 'Blogg | PHIGO',
        description: 'Tips och guider för lokala företag som vill ha fler kunder via sin hemsida.',
        url: 'https://phigo.se/blogg',
        locale: 'sv_SE',
    },
}

export default function BloggPage() {
    const published = getPublishedBlogPosts()
    const planned = getBlogPosts().filter((p) => p.status === 'draft')

    return (
        <div className="min-h-dvh pt-24 pb-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Header */}
                <div className="mb-16 max-w-2xl">
                    <span className="text-sm font-bold uppercase text-primary">Blogg</span>
                    <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                        Tips för dig som driver ett lokalt företag
                    </h1>
                    <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                        Praktiska guider om hemsidor, priser och hur du syns när folk söker efter det du erbjuder.
                    </p>
                </div>

                {/* Published posts */}
                {published.length > 0 && (
                    <section className="mb-20" aria-label="Publicerade inlägg">
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {published.map((post) => (
                                <Link key={post.slug} href={`/blogg/${post.slug}`} aria-label={post.title}>
                                    <article className="group flex h-full flex-col rounded-3xl border border-border bg-card/50 p-8 transition-[border-color,background-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-primary/20 hover:bg-card hover:shadow-2xl hover:shadow-primary/5">
                                        <div className="mb-4 flex items-center justify-between">
                                            <Badge variant="secondary" className="rounded-lg bg-muted/50 text-xs font-semibold text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                                                {post.category}
                                            </Badge>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
                                                <Clock className="size-3" aria-hidden="true" />
                                                <span>{post.readingTime} min</span>
                                            </div>
                                        </div>
                                        <h2 className="flex-1 text-xl font-bold leading-snug text-foreground decoration-primary/30 decoration-2 transition-colors group-hover:underline">
                                            {post.title}
                                        </h2>
                                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80 line-clamp-2">
                                            {post.description}
                                        </p>
                                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                                            Läs artikel
                                            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Coming soon — planned posts */}
                {planned.length > 0 && (
                    <section aria-label="Kommande inlägg">
                        {published.length === 0 && (
                            <p className="mb-8 text-muted-foreground">
                                Vi skriver just nu — här är vad som är på gång:
                            </p>
                        )}
                        {published.length > 0 && (
                            <h2 className="mb-8 text-2xl font-bold text-foreground">På gång</h2>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {planned.map((post) => (
                                <div
                                    key={post.slug}
                                    className="flex flex-col rounded-3xl border border-border/50 bg-muted/20 p-8 opacity-60"
                                    aria-label={`Kommande: ${post.title}`}
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <Badge variant="outline" className="rounded-lg text-xs font-semibold text-muted-foreground/60 border-muted-foreground/20">
                                            {post.category}
                                        </Badge>
                                        <span className="text-[10px] font-semibold uppercase text-muted-foreground/40">
                                            Kommer snart
                                        </span>
                                    </div>
                                    <h2 className="text-lg font-bold leading-snug text-muted-foreground">
                                        {post.title}
                                    </h2>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground/60 line-clamp-2">
                                        {post.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
