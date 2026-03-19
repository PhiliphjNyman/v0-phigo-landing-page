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
        shortDescription: 'En tandklinik som fick fler bokningar genom en sajt som minskar tröskeln att ta kontakt.',
        description: 'En tandklinik i Linköping som hade svårt att få besökare att boka tid online. Vi byggde en sajt med tydliga tjänstebeskrivningar, patientomdömen och ett enkelt kontaktformulär — vilket resulterade i att fler besökare valde att boka direkt.',
        tags: ['Konceptcase', 'Tandvård', 'Linköping'],
        liveUrl: 'https://tandlakare.phigo.se/',
        heroImage: '/images/case-leendekliniken.png',
        featured: true,
        accent: 'cyan',
    },
    {
        slug: 'cafe-alma',
        title: 'Café Alma',
        category: 'Restaurang / Café',
        shortDescription: 'Ett brunchcafé som ville synas lokalt och göra det enkelt för gäster att hitta och boka bord.',
        description: 'Ett brunchcafé i Linköping som inte syntes i sökningar och saknade ett sätt för gäster att boka bord online. Vi byggde en personlig sajt med meny, öppettider och bokningsformulär — som gör det lätt att hitta caféet och ta kontakt.',
        tags: ['Konceptcase', 'Café', 'Linköping'],
        liveUrl: 'https://cafe-alma-seven.vercel.app/',
        heroImage: '/images/case-cafe-alma.png',
        featured: true,
        accent: 'amber',
    },
    {
        slug: 'andersson-el',
        title: 'Andersson El',
        category: 'Elektriker / Hantverkare',
        shortDescription: 'En elektriker som gick från att förlita sig på mun-till-mun till att få förfrågningar via sin sajt.',
        description: 'En lokal elektriker i Linköping som fick alla sina uppdrag via rekommendationer — men saknade en sajt som jobbade för honom. Vi byggde en enkel sajt med tydliga tjänster, serviceområde och kontaktformulär, så att kunder kan ta kontakt direkt.',
        tags: ['Konceptcase', 'Hantverkare', 'Linköping'],
        liveUrl: 'https://elektriker.phigo.se/',
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
