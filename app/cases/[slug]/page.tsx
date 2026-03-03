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
    if (!c) return { title: 'Case hittades inte | PHIGO' }

    return {
        title: `${c.title} – Case | PHIGO`,
        description: c.summary,
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
