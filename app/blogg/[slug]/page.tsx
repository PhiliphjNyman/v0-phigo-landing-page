import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getPublishedBlogPosts, getBlogPostBySlug } from '@/lib/blog'
import { ArticleHtml } from '@/components/article-html'

export async function generateStaticParams() {
    const posts = getPublishedBlogPosts()
    return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = getBlogPostBySlug(slug)

    if (!post || post.status !== 'published') {
        return { title: 'Inlägg hittades inte | PHIGO', robots: { index: false } }
    }

    const seoTitle = `${post.title} | PHIGO`

    return {
        title: seoTitle,
        description: post.description,
        alternates: {
            canonical: `https://phigo.se/blogg/${slug}`,
        },
        openGraph: {
            title: seoTitle,
            description: post.description,
            url: `https://phigo.se/blogg/${slug}`,
            type: 'article',
            locale: 'sv_SE',
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt ?? post.publishedAt,
            images: post.ogImage
                ? [{ url: post.ogImage, width: 1200, height: 630, alt: post.title }]
                : [{ url: '/og-image.jpg', width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: post.description,
        },
    }
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default async function BloggPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getBlogPostBySlug(slug)

    if (!post || post.status !== 'published') {
        notFound()
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Hem',
                item: 'https://phigo.se',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blogg',
                item: 'https://phigo.se/blogg',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://phigo.se/blogg/${post.slug}`,
            },
        ],
    }

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: {
            '@type': 'Organization',
            '@id': 'https://phigo.se/#organization',
            name: 'PHIGO',
            url: 'https://phigo.se',
        },
        publisher: {
            '@id': 'https://phigo.se/#organization',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://phigo.se/blogg/${post.slug}`,
        },
        url: `https://phigo.se/blogg/${post.slug}`,
        ...(post.ogImage && { image: `https://phigo.se${post.ogImage}` }),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            <div className="min-h-dvh pt-24 pb-24">
                <article className="mx-auto max-w-3xl px-4 lg:px-8">
                    {/* Back + breadcrumb */}
                    <div className="mb-12 flex flex-col gap-6">
                        <Link
                            href="/blogg"
                            className="group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                            Tillbaka till bloggen
                        </Link>

                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Start</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/blogg">Blogg</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{post.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* Post header */}
                    <header className="mb-12">
                        <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1 text-primary bg-primary/10">
                            {post.category}
                        </Badge>
                        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-6">
                            {post.title}
                        </h1>
                        <p className="text-xl text-pretty text-muted-foreground leading-relaxed mb-8">
                            {post.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/70 border-t border-border pt-6">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="size-4" aria-hidden="true" />
                                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="size-4" aria-hidden="true" />
                                <span>{post.readingTime} min läsning</span>
                            </div>
                        </div>
                    </header>

                    {/* Post content. Each <table> is wrapped in a horizontally
                        scrollable box so wide price tables scroll inside their own
                        container on narrow screens; the page body never scrolls
                        sideways (R3). ArticleHtml routes internal links through
                        the Next router so /#kontakt lands on the contact form
                        (the step A cross-page fragment fix). */}
                    <div className="prose prose-invert prose-lg max-w-none leading-loose text-foreground/75 prose-p:mb-8 prose-headings:mt-12 prose-headings:mb-4 prose-li:mb-2 prose-table:my-8">
                        {post.content ? (
                            <ArticleHtml
                                html={post.content
                                    .replace(/<table>/g, '<div class="table-scroll"><table>')
                                    .replace(/<\/table>/g, '</table></div>')}
                            />
                        ) : null}
                    </div>

                    {/* CTA — emerald anchor, identical in both themes (the same
                        fixed deep-emerald surface as the start page final CTA).
                        Reuses .anchor-emerald + the --anchor-* tokens; copy unchanged. */}
                    <div className="anchor-emerald relative mt-20 overflow-hidden rounded-3xl border border-white/10 px-6 py-14 text-center shadow-2xl shadow-primary/10 sm:px-12">
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -top-20 left-1/2 size-60 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-balance text-2xl font-extrabold text-anchor-fg mb-4">
                                Vill du veta hur din hemsida kan ge dig fler kunder?
                            </h2>
                            <p className="mx-auto max-w-xl text-anchor-fg-muted mb-8 leading-relaxed">
                                Vi granskar din nuvarande sajt och visar konkret vad som kan förbättras, kostnadsfritt och utan förpliktelse.
                            </p>
                            <Button
                                size="lg"
                                className="h-12 px-8 rounded-2xl bg-white text-anchor-ink font-bold shadow-lg shadow-black/25 hover:bg-white/90 hover:shadow-xl hover:shadow-black/30 focus-visible:border-white focus-visible:ring-white/70 active:scale-[0.98] transition-[transform,background-color,box-shadow] duration-200"
                                asChild
                            >
                                <Link href="/#kontakt">Skicka din sajt, vi visar vad du missar</Link>
                            </Button>
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}
