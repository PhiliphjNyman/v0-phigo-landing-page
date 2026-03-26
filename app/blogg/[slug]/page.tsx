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
            ...(post.ogImage && {
                images: [{ url: post.ogImage, width: 1200, height: 630, alt: post.title }],
            }),
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
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: {
            '@type': 'Organization',
            name: 'PHIGO',
            url: 'https://phigo.se',
        },
        publisher: {
            '@type': 'Organization',
            name: 'PHIGO',
            url: 'https://phigo.se',
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

                    {/* Post content */}
                    <div className="prose prose-invert prose-lg max-w-none leading-loose text-foreground/75 prose-p:mb-8 prose-headings:mt-12 prose-headings:mb-4 prose-li:mb-2 prose-table:my-8">
                        {post.content ? (
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        ) : null}
                    </div>

                    {/* CTA */}
                    <div className="mt-20 rounded-3xl bg-foreground text-background p-10 text-center">
                        <h2 className="text-balance text-2xl font-extrabold mb-4">
                            Vill du veta hur din hemsida kan ge dig fler kunder?
                        </h2>
                        <p className="text-background/70 mb-8 leading-relaxed">
                            Vi granskar din nuvarande sajt och visar konkret vad som kan förbättras — kostnadsfritt och utan förpliktelse.
                        </p>
                        <Button
                            size="lg"
                            className="h-12 px-8 rounded-2xl bg-primary text-primary-foreground font-bold hover:scale-105 transition-transform"
                            asChild
                        >
                            <Link href="/#kontakt">Skicka din sajt — vi visar vad du missar</Link>
                        </Button>
                    </div>
                </article>
            </div>
        </>
    )
}
