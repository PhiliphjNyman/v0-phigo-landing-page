export interface BlogPost {
    slug: string
    title: string
    description: string
    publishedAt: string
    updatedAt?: string
    status: 'published' | 'draft'
    category: string
    tags: string[]
    readingTime: number
    content: string
    ogImage?: string
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'vad-kostar-en-hemsida-smaforetag',
        title: 'Vad kostar en hemsida för småföretag?',
        description: 'En ärlig genomgång av vad en hemsida faktiskt kostar för dig som driver ett litet företag — och vad du får för pengarna.',
        publishedAt: '2026-04-01',
        status: 'draft',
        category: 'Guide',
        tags: ['Pris', 'Hemsida', 'Småföretag'],
        readingTime: 5,
        content: '',
        ogImage: '/images/blog/vad-kostar-en-hemsida.png',
    },
    {
        slug: 'hemsida-elektriker',
        title: 'Hemsida för elektriker — vad du behöver veta',
        description: 'Så bygger du en hemsida som ger dig fler förfrågningar som elektriker — utan att det behöver kosta skjortan.',
        publishedAt: '2026-04-08',
        status: 'draft',
        category: 'Branschguide',
        tags: ['Elektriker', 'Hantverkare', 'Hemsida'],
        readingTime: 4,
        content: '',
        ogImage: '/images/blog/hemsida-elektriker.png',
    },
    {
        slug: 'hemsida-frisor',
        title: 'Hemsida för frisör — vad som faktiskt ger fler bokningar',
        description: 'Vad ska finnas på en frisörs hemsida? Vi går igenom de viktigaste delarna som gör att besökare bokar tid.',
        publishedAt: '2026-04-15',
        status: 'draft',
        category: 'Branschguide',
        tags: ['Frisör', 'Bokningar', 'Hemsida'],
        readingTime: 4,
        content: '',
        ogImage: '/images/blog/hemsida-frisor.png',
    },
    {
        slug: 'hemsida-tandlakare',
        title: 'Hemsida för tandläkare — pris och vad som ingår',
        description: 'Allt du behöver veta om hemsida för tandläkare: vad det kostar, vad som ska finnas med och hur du får fler patienter att boka.',
        publishedAt: '2026-04-22',
        status: 'draft',
        category: 'Branschguide',
        tags: ['Tandläkare', 'Bokningar', 'Hemsida'],
        readingTime: 5,
        content: '',
        ogImage: '/images/blog/hemsida-tandlakare.png',
    },
    {
        slug: 'syns-inte-pa-google',
        title: 'Varför syns inte mitt företag på Google?',
        description: 'De vanligaste anledningarna till att ditt företag inte dyker upp när folk söker — och vad du kan göra åt det.',
        publishedAt: '2026-04-29',
        status: 'draft',
        category: 'Guide',
        tags: ['Google', 'Synlighet', 'Småföretag'],
        readingTime: 6,
        content: '',
        ogImage: '/images/blog/syns-inte-pa-google.png',
    },
    {
        slug: 'hemsida-pris-guide',
        title: 'Hemsida-guide: allt du behöver veta om pris och leverans',
        description: 'En komplett guide för dig som funderar på att skaffa ny hemsida — från pris och leveranstid till vad som faktiskt spelar roll.',
        publishedAt: '2026-05-06',
        status: 'draft',
        category: 'Guide',
        tags: ['Pris', 'Guide', 'Hemsida'],
        readingTime: 7,
        content: '',
        ogImage: '/images/blog/hemsida-guide.png',
    },
]

export function getBlogPosts() {
    return blogPosts
}

export function getPublishedBlogPosts() {
    return blogPosts.filter((p) => p.status === 'published')
}

export function getBlogPostBySlug(slug: string) {
    return blogPosts.find((p) => p.slug === slug) || null
}
