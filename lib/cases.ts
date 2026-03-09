export interface CaseStat {
    label: string
    value: string
}

export interface Case {
    slug: string
    title: string
    category: string
    shortDescription: string
    description: string
    tags: string[]
    liveUrl: string
    heroImage: string
    stats?: CaseStat[]
    featured: boolean
    accent: 'amber' | 'emerald' | 'cyan'
}

export const cases: Case[] = [
    {
        slug: 'leendekliniken',
        title: 'Leendekliniken',
        category: 'Tandvård',
        shortDescription: 'Modern hemsida för tandklinik med fokus på förtroende, tjänsteöversikt och enkel bokning.',
        description: 'En komplett sajt för en tandklinik i Linköping. Elegant design i marinblått och korallrött som bygger förtroende. Tydlig tjänstestruktur med priser, social proof via patientrecensioner, team-sektion och kontaktformulär. Designad för att minska tandläkarskräck och driva bokningar.',
        tags: ['UX Design', 'Konverteringsoptimering', 'Responsiv Design', 'Varumärkesdesign'],
        liveUrl: 'https://tandlakare-demo-phigo.vercel.app/',
        heroImage: '/images/case-leendekliniken.png',
        featured: true,
        accent: 'cyan',
    },
    {
        slug: 'andersson-el',
        title: 'Andersson El',
        category: 'Elektriker / Hantverkare',
        shortDescription: 'Konverteringsoptimerad sajt för lokal elektriker med bokningsflöde och tydlig tjänstestruktur.',
        description: 'En single-page sajt för en enskild elektriker i Linköping. Fokus på tydlig tjänsteuppdelning med taggar (villa, lägenhet, företag), social proof via kundrecensioner, serviceområde och kontaktformulär som driver bokningar. Orange och mörkblå design som utstrålar trygghet och energi.',
        tags: ['UX Design', 'Konverteringsoptimering', 'Responsiv Design', 'SEO'],
        liveUrl: 'https://hantverkare-demo-elektriker.vercel.app/',
        heroImage: '/images/case-andersson-el.png',
        featured: true,
        accent: 'amber',
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
        .filter((c) => c.slug !== slug && (c.category === currentCase.category || c.featured))
        .slice(0, limit)
}
