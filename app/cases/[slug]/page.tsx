import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getCaseBySlug, getRelatedCases, getCases } from '@/lib/cases'
import { CaseDetailClient } from '@/components/case-detail-client'

export async function generateStaticParams() {
    const cases = getCases()
    return cases.map((c) => ({
        slug: c.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const c = getCaseBySlug(slug)
    if (!c) return { title: 'Case hittades inte | PHIGO', robots: { index: false } }

    const seoTitle = `${c.title} – ${c.category} i ${c.city} | PHIGO`

    return {
        title: seoTitle,
        description: c.shortDescription,
        alternates: {
            canonical: `https://phigo.se/cases/${slug}`,
        },
        openGraph: {
            title: seoTitle,
            description: c.shortDescription,
            url: `https://phigo.se/cases/${slug}`,
            type: 'website',
            locale: 'sv_SE',
            images: [{ url: c.heroImage, width: 1200, height: 630, alt: c.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: c.shortDescription,
        },
    }
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const c = getCaseBySlug(slug)

    if (!c) {
        notFound()
    }

    const relatedCases = getRelatedCases(c.slug)

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
                name: 'Exempel',
                item: 'https://phigo.se/cases',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: c.title,
                item: `https://phigo.se/cases/${c.slug}`,
            },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <CaseDetailClient c={c} relatedCases={relatedCases} />
        </>
    )
}
