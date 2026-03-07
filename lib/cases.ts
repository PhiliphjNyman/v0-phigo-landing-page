export interface CaseMetric {
    label: string
    value: string
    // Icon removed to be serializeable between RSC and Client components
}

export interface Case {
    slug: string
    title: string
    industry: string
    summary: string
    description: string
    services: string[]
    metrics: CaseMetric[]
    year?: string
    image: string
    featured: boolean
    accent: 'amber' | 'emerald' | 'cyan'
}

export const cases: Case[] = [
    {
        slug: 'nordic-consulting',
        title: 'Nordic Consulting',
        industry: 'B2B konsulttjänster',
        summary: 'Omdesign av en föråldrad hemsida till en modern, konverteringsoptimerad sajt.',
        description: 'Nordic Consulting behövde en digital närvaro som matchade deras expertis inom B2B. Vi fokuserade på att skapa ett tydligt värderbjudande, förenkla navigeringen och implementera strategiska call-to-actions för att maximera leadgenerering.',
        services: ['UX/UI Design', 'Next.js Development', 'Conversion Optimization', 'Technical SEO'],
        metrics: [
            { label: 'Fler leads', value: '+68%' },
            { label: 'Högre konvertering', value: '+42%' },
            { label: 'Lägre bounce rate', value: '-28%' },
            { label: 'Sidladdning', value: '1.2s' },
        ],
        year: '2023',
        image: '/images/case-nordic.jpg',
        featured: true,
        accent: 'amber',
    },
    {
        slug: 'storberg-ehandel',
        title: 'Storberg E-handel',
        industry: 'E-handel',
        summary: 'Ny e-handelslösning med blixtsnabb laddtid och sömlöst köpflöde.',
        description: 'För Storberg var prestanda kritiskt. Vi byggde en modern e-handel med fokus på Core Web Vitals och en mobil-först upplevelse. Genom att optimera laddtider och förenkla kassan såg vi en direkt inverkan på konverteringsgraden.',
        services: ['E-commerce Strategy', 'Headless CMS', 'Performance Engineering', 'Mobile UX'],
        metrics: [
            { label: 'Snabbare laddtid', value: '-40%' },
            { label: 'Fler genomförda köp', value: '+31%' },
            { label: 'Mobiltrafik', value: '+55%' },
            { label: 'Lighthouse Score', value: '97' },
        ],
        year: '2024',
        image: '/images/case-storberg.jpg',
        featured: true,
        accent: 'emerald',
    },
    {
        slug: 'avenio-fastigheter',
        title: 'Avenio Fastigheter',
        industry: 'Lokalt tjänsteföretag',
        summary: 'Digital närvaro med modernt formspråk och integrerad bokningsfunktion.',
        description: 'Avenio Fastigheter ville sticka ut på en traditionell marknad. Vi skapade en visuell upplevelse som andas förtroende och modernitet, komplett med ett intuitivt system för att boka visningar och hantera prospekt.',
        services: ['Brand Identity', 'Web Design', 'Custom Booking System', 'Local SEO'],
        metrics: [
            { label: 'Fler besökare', value: '+120%' },
            { label: 'Fler bokningsförfrågningar', value: '+89%' },
            { label: 'Sökordsranking', value: 'Top 3' },
            { label: 'Sidor per session', value: '+2.4x' },
        ],
        year: '2023',
        image: '/images/case-avenio.jpg',
        featured: true,
        accent: 'cyan',
    },
]

export function getCases() {
    return cases
}

export function getCaseBySlug(slug: string) {
    return cases.find((c) => c.slug === slug) || null
}

export function getRelatedCases(slug: string, limit = 2) {
    const currentCase = getCaseBySlug(slug)
    if (!currentCase) return []

    return cases
        .filter((c) => c.slug !== slug && (c.industry === currentCase.industry || c.featured))
        .slice(0, limit)
}
