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

    return {
        title: `${c.title} – Case | PHIGO`,
        description: c.shortDescription,
        alternates: {
            canonical: `https://phigo.se/cases/${slug}`,
        },
        openGraph: {
            title: `${c.title} – Case | PHIGO`,
            description: c.shortDescription,
            url: `https://phigo.se/cases/${slug}`,
            type: 'article',
            locale: 'sv_SE',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${c.title} – Case | PHIGO`,
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

    return <CaseDetailClient c={c} relatedCases={relatedCases} />
}
