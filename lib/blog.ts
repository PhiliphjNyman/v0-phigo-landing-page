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
        publishedAt: '2026-03-27',
        status: 'published',
        category: 'Guide',
        tags: ['Google', 'Synlighet', 'Småföretag'],
        readingTime: 6,
        content: `
<p>Du driver ett bra företag. Dina kunder är nöjda. Men när någon i närheten söker på det du gör — dyker ditt namn inte upp.</p>

<p>Det är ett vanligt problem, och det finns nästan alltid en konkret förklaring. Här är de vanligaste anledningarna till att lokala företag inte syns på Google — och vad du kan göra åt varje enskild.</p>

<h2>1. Du har ingen Google-företagsprofil</h2>

<p>Det här är den vanligaste orsaken av alla.</p>

<p>Google visar lokala företag i sin karta och i de tre första resultaten baserat på din <strong>Google-företagsprofil</strong>. Det är en gratis profil som du skapar på <a href="https://business.google.com" rel="noopener noreferrer">business.google.com</a>.</p>

<p>Har du ingen profil är chansen liten att du syns när folk söker lokalt — oavsett hur bra din hemsida är.</p>

<p><strong>Vad du gör:</strong> Skapa eller bekräfta din Google-företagsprofil. Fyll i adress, telefonnummer, öppettider och kategori. Lägg till minst fem foton. Det tar ungefär en timme och är förmodligen den enskilt mest effektiva åtgärden du kan ta.</p>

<h2>2. Din hemsida saknas eller är inte kopplad</h2>

<p>Google läser igenom hemsidor för att förstå vad du gör, var du finns och vem du riktar dig till. Om du inte har en hemsida alls — eller om den är felkonfigurerad — har Google väldigt lite att gå på.</p>

<p>En saknad hemsida är som att ha en butik utan skylt på en bakgata. De som redan vet om dig kan hitta dig, men ingen ny kund hittar dig av en slump.</p>

<p><strong>Vad du gör:</strong> Se till att du har en hemsida och att den är länkad från din Google-företagsprofil. Hemsidan behöver inte vara stor — men den måste tydligt beskriva vad du gör och var du finns.</p>

<h2>3. Hemsidan funkar inte på mobilen</h2>

<p>Mer än hälften av alla Google-sökningar görs från en telefon. Google vet det, och prioriterar sajter som fungerar bra på mobil när de väljer vad de ska visa i sökresultaten.</p>

<p>En hemsida som är svårläst, långsam eller som kräver att man zoomar och scrollar i sidled — den straffas.</p>

<p><strong>Vad du gör:</strong> Testa din sajt på din telefon just nu. Är texten läsbar? Är knapparna enkla att trycka på? Laddar sidan snabbt? Om svaret är nej på någon av frågorna är det dags att se över sajten.</p>

<h2>4. Google förstår inte vad du gör eller var du finns</h2>

<p>Google läser din hemsida som text och försöker lista ut vad ditt företag gör, vilka tjänster du erbjuder och vilket geografiskt område du verkar i. Om hemsidan saknar tydlig text om detta vet Google inte när den ska visa dig.</p>

<p>Vanliga misstag:</p>
<ul>
  <li>Hemsidan säger "vi jobbar med det du behöver" istället för "vi är elektriker i Linköping"</li>
  <li>Adressen och telefonnumret finns inte på sajten</li>
  <li>Det finns ingen sida som listar dina tjänster med namn</li>
</ul>

<p><strong>Vad du gör:</strong> Kontrollera att din hemsida tydligt nämner vad du gör, var du gör det och hur man når dig. Ju mer specifikt, desto bättre. "Rörmokare i Norrköping — dygnet runt" är bättre än "Din lokala hantverkare".</p>

<h2>5. Du har inga eller för få recensioner</h2>

<p>Google väger in recensioner när det rangordnar lokala företag. Ett företag med tjugo Google-recensioner och snittbetyg 4,7 syns nästan alltid före ett företag utan en enda recension — även om de annars är jämförbara.</p>

<p>Recensioner fungerar som ett bevis för Google — och för potentiella kunder — att du faktiskt gör ett bra jobb.</p>

<p><strong>Vad du gör:</strong> Börja fråga nöjda kunder om de kan lämna ett omdöme. Skicka länken direkt till din Google-profil — det sänker tröskeln rejält. Tre till fem nya recensioner kan göra märkbar skillnad.</p>

<h2>6. Din hemsida är för ny</h2>

<p>Har du precis lanserat en ny sajt? Då kan det ta tid innan Google hittar den och börjar visa den i sökresultaten — normalt några veckor upp till ett par månader. Det är inget fel, det är bara så det fungerar.</p>

<p><strong>Vad du gör:</strong> Skapa ett Google-konto för webbansvariga (Google Search Console) och anmäl din sajts adress manuellt. Det påskyndar processen. Länka också hemsidan från din Google-företagsprofil — det hjälper Google hitta den snabbare.</p>

<h2>Snabb checklista — syns ditt företag?</h2>

<ul>
  <li>☐ Har du en bekräftad Google-företagsprofil med fullständig info?</li>
  <li>☐ Är hemsidan länkad från din Google-profil?</li>
  <li>☐ Funkar hemsidan bra på mobilen?</li>
  <li>☐ Framgår det tydligt på sajten vad du gör och var du finns?</li>
  <li>☐ Har du minst fem Google-recensioner?</li>
</ul>

<p>Stämmer alla fem? Bra — då har du gjort grunden. Stämmer bara ett par av dem finns det konkreta saker att ta tag i som kan ge tydlig skillnad på relativt kort tid.</p>

<h2>Vill du ha hjälp?</h2>

<p>En hemsida som är byggd rätt från start — med tydliga texter, snabb laddning och korrekt uppbyggnad — gör att Google förstår ditt företag utan att du behöver göra ett stort arbete efteråt.</p>

<p>Vi på PHIGO bygger hemsidor åt lokala företag som ska synas och ge fler förfrågningar. Fast pris, live inom 14 dagar. <a href="/#kontakt">Kontakta oss</a> om du vill att vi tittar på din sajt — det kostar ingenting.</p>
        `.trim(),
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
