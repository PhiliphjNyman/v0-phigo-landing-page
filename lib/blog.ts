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
        publishedAt: '2026-03-26',
        status: 'published',
        category: 'Guide',
        tags: ['Pris', 'Hemsida', 'Småföretag'],
        readingTime: 5,
        content: `
<p>Det är en fråga vi får ofta — och svaret är lite av ett "det beror på". Men vi ska försöka ge dig ett ärligt svar, utan krångel.</p>

<h2>Varför varierar priserna så mycket?</h2>

<p>En hemsida kan kosta alltifrån ingenting till flera hundratusen kronor. Spridningen beror på vem som gör jobbet, hur komplex sajten är och vad som faktiskt ingår i priset.</p>

<p>Grovt sett finns det tre vägar att gå:</p>

<ul>
  <li><strong>Gör det själv</strong> med ett verktyg som Wix, Squarespace eller WordPress. Kostnad: 0–200 kr/mån. Nackdelen är att det tar tid, resultatet ser ofta mallat ut, och du sköter allt underhåll själv.</li>
  <li><strong>Anlita en frilansare.</strong> Priset varierar enormt — från 5 000 kr till 30 000 kr eller mer. Kvaliteten varierar lika mycket. Vissa frilansare levererar utmärkt arbete, andra försvinner mitt i projektet.</li>
  <li><strong>Webbyrå.</strong> Professionellt men dyrt. Räkna med 30 000–150 000 kr eller mer för en genomarbetad sajt. Det kan vara rätt val för ett medelstort företag med komplexa behov, men det är sällan nödvändigt för ett litet lokalt företag.</li>
</ul>

<h2>Vad ingår i en bra hemsida?</h2>

<p>En hemsida som faktiskt gör nytta är mer än bara ett snyggt utseende. Det som spelar roll för ett litet företag är:</p>

<ul>
  <li><strong>Design som ser trovärdig ut</strong> — besökare bildar sig en uppfattning om ditt företag på några sekunder.</li>
  <li><strong>Texter som förklarar vad du gör</strong> och varför kunden ska välja just dig.</li>
  <li><strong>Tydliga kontaktmöjligheter</strong> — ett formulär, telefonnummer eller bokningsknapp som är lätt att hitta.</li>
  <li><strong>Snabb laddning och funkar på mobilen</strong> — mer än hälften av all webbtrafik kommer från telefoner.</li>
  <li><strong>SEO (sökmotoroptimering)</strong> — det betyder att sajten är uppbyggd på ett sätt som gör att Google förstår vad du erbjuder, och kan visa den när folk söker efter det du gör. En välgjord hemsida har detta inbyggt från start.</li>
  <li><strong>Hosting och underhåll</strong> — någon måste se till att sajten är uppe, säker och uppdaterad.</li>
</ul>

<h2>Vad kostar det egentligen?</h2>

<p>Här är en ärlig priskarta för en färdig hemsida anpassad för ett litet lokalt företag:</p>

<table>
  <thead>
    <tr>
      <th>Alternativ</th>
      <th>Engångskostnad</th>
      <th>Löpande kostnad</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>DIY (Wix, Squarespace)</td>
      <td>0 kr</td>
      <td>150–300 kr/mån</td>
    </tr>
    <tr>
      <td>Frilansare</td>
      <td>5 000–30 000 kr</td>
      <td>Varierar</td>
    </tr>
    <tr>
      <td>Webbyrå</td>
      <td>30 000–150 000 kr+</td>
      <td>1 000–5 000 kr/mån</td>
    </tr>
    <tr>
      <td>Fast pris (som vi på PHIGO erbjuder)</td>
      <td>8 000 kr</td>
      <td>399 kr/mån</td>
    </tr>
  </tbody>
</table>

<p>Vi på PHIGO har medvetet valt ett fast pris — 8 000 kr engång och 399 kr/mån för hosting, säkerhet och löpande support. Inget mer, inga dolda avgifter. Det passar ett litet företag som vill ha en professionell sajt utan att det ska bli ett stort projekt.</p>

<h2>Vad du bör fråga innan du bestämmer dig</h2>

<p>Oavsett vem du anlitar, ställ de här frågorna innan du skriver under:</p>

<ol>
  <li><strong>Vad ingår egentligen i priset?</strong> Texter? Bilder? Formulär? Hur många undersidor?</li>
  <li><strong>Vem äger sajten när den är klar?</strong> Du ska äga din hemsida — inte vara låst till en leverantör.</li>
  <li><strong>Vad händer om något slutar fungera?</strong> Finns det support? Hur snabbt?</li>
  <li><strong>Hur lång tid tar det?</strong> En rimlig leveranstid för en enklare hemsida är 2–4 veckor.</li>
  <li><strong>Syns sajten på Google?</strong> Fråga specifikt om SEO är inbyggt i leveransen — det är inte självklart att det ingår.</li>
</ol>

<h2>Sammanfattning</h2>

<p>För ett litet lokalt företag — en hantverkare, en frisör, en tandläkare — är 8 000–15 000 kr ett rimligt pris för en välgjord hemsida från en leverantör du kan lita på. Lägre än så, och du riskerar att få en generisk mall som ingen bryr sig om. Högre än så, och du betalar förmodligen för saker du inte behöver.</p>

<p>Det viktigaste är inte att hemsidan är snygg — det är att den faktiskt får folk att ta kontakt. Det är den enkla frågan du bör ställa: <em>Kommer den här sajten ge mig fler kunder?</em></p>
        `.trim(),
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
