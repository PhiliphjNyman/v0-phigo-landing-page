export interface CaseStat {
    label: string
    value: string
}

export interface Case {
    slug: string
    title: string
    category: string
    city: string
    shortDescription: string
    description: string
    tags: string[]
    liveUrl: string
    heroImage: string
    stats?: CaseStat[]
    featured: boolean
    accent: 'amber' | 'emerald' | 'cyan'
    caseType: 'concept' | 'real'
}

export const cases: Case[] = [
    {
        slug: 'leendekliniken',
        title: 'Leendekliniken',
        category: 'Tandvård',
        city: 'Linköping',
        shortDescription: 'En tandklinik som fick fler bokningar genom en sajt som minskar tröskeln att ta kontakt.',
        description: `Det här är ett konceptcase — ett designexempel vi skapat för att visa hur en hemsida för en tandklinik kan se ut och fungera. Leendekliniken är ett fiktivt företag.\n\nBakgrunden\n\nMånga tandkliniker i Sverige har en hemsida som existerar mest för att finnas — inte för att hjälpa nya patienter att faktiskt ta kontakt. Besökaren hittar kanske öppettider och ett telefonnummer, men det är sällan tydligt vilka behandlingar som erbjuds, ungefär vad de kostar, eller hur man enklast bokar en tid.\n\nDet gör att besökare som aktivt söker efter en tandläkare i Linköping lämnar sidan utan att ha tagit kontakt. Inte för att de inte är intresserade — utan för att tröskeln att ta nästa steg är för hög.\n\nVad vi ville visa\n\nVi ville skapa ett tydligt exempel på hur en modern tandkliniks hemsida bör fungera. En sajt som inte bara ser professionell ut, utan som aktivt guidar besökaren från "letar efter tandläkare" till "jag bokar en tid."\n\nFyra saker vi fokuserade på:\n\nTydliga behandlingsbeskrivningar. Varje tjänst — från lagning och rotfyllning till tandblekning och Invisalign — beskrivs på ett sätt som är enkelt att förstå. Ingen medicinsk jargong. Bara klartext som svarar på det en besökare faktiskt undrar.\n\nOmdömen som bygger förtroende. Att välja en ny tandläkare innebär ett stort förtroende. Berättelser från nöjda patienter är ett av de mest effektiva sätten att minska tveksamheten hos en ny besökare och ge dem tryggheten att ta kontakt.\n\nEtt enkelt sätt att boka tid. Kontaktformuläret är reducerat till det absoluta minimum. Namn, e-postadress och vilken behandling de är intresserade av. Ju färre fält, desto fler som faktiskt skickar.\n\nFunkar perfekt på mobilen. De flesta söker efter tandläkare från sin telefon — ofta på språng, mellan möten eller på lunchen. Sajten laddar snabbt och är lika enkel att använda på mobilen som på datorn.\n\nResultatet\n\nKonceptsajten för Leendekliniken visar hur ett genomtänkt upplägg kan se ut för en tandvårdsverksamhet i Linköping. Varje sektion svarar på en fråga besökaren har — och är sedan designad för att göra det enkelt att ta nästa steg mot en bokning.\n\nDet är precis den typen av hemsida vi bygger åt verkliga kliniker och mottagningar. Fast pris. Live inom 14 dagar.\n\nVill du se hur en liknande sajt kan se ut för din verksamhet? Vi tittar gärna på din nuvarande hemsida och visar konkret vad som kan förbättras — utan kostnad och utan förpliktelse.`,
        tags: ['Konceptcase', 'Tandvård', 'Linköping'],
        liveUrl: 'https://tandlakare.phigo.se/',
        heroImage: '/images/case-leendekliniken.png',
        featured: true,
        accent: 'cyan',
        caseType: 'concept',
    },
    {
        slug: 'cafe-alma',
        title: 'Café Alma',
        category: 'Restaurang / Café',
        city: 'Linköping',
        shortDescription: 'Ett brunchcafé som ville synas lokalt och göra det enkelt för gäster att hitta och boka bord.',
        description: `Det här är ett konceptcase — ett designexempel vi skapat för att visa hur en hemsida för ett café kan se ut och fungera. Café Alma är ett fiktivt företag.\n\nBakgrunden\n\nCafé Alma är ett brunchcafé i Linköping med ett unikt utbud — hemlagad mat, säsongsbetonade rätter och en avslappnad atmosfär som gästerna älskar. Men utan en tydlig digital närvaro var det svårt för nya gäster att hitta dit, och det saknades ett enkelt sätt att boka bord.\n\nStamgästerna hittade hit via rekommendationer, men potentiella nya gäster — de som sökte efter "brunch Linköping" eller "café i Linköping" — hittade inte dit. Och även de som hittade en gammal sida visste inte om det gick att boka bord, vilka tider som gällde, eller ens vilken mat som serverades.\n\nVad vi ville visa\n\nVi ville skapa ett exempel på hur ett café med personlighet kan presentera sig online på ett sätt som speglar upplevelsen i lokalen. Inte en generisk mallsajt, utan en hemsida som faktiskt lockar gäster att komma dit.\n\nDet vi fokuserade på:\n\nEn meny som lockar. En tydlig och inbjudande meny med de populäraste rätterna gör det enkelt för besökaren att förstå vad som väntar. Det skapar aptit redan innan de kliver in genom dörren.\n\nÖppettider och adress — alltid lättillgängliga. Det låter självklart, men otroligt många caféer och restauranger har denna information begravd i sidfoten. Vi placerar den synligt och tydligt.\n\nBokningsformulär. Att kunna boka bord direkt via sajten sänker tröskeln rejält. Gästen slipper ringa under rusningstid — och caféet slipper missa samtal.\n\nEn sida som speglar caféets karaktär. Bildval, typografi och ton är valda för att kännas personliga och omhändertagna — inte generiska.\n\nFunkar perfekt på mobilen. De flesta söker efter caféer och restauranger från telefonen, ofta direkt när de bestämmer sig för var de ska gå. Sajten är snabb och enkel att använda oavsett enhet.\n\nResultatet\n\nKonceptsajten för Café Alma visar hur ett litet café kan ha en digital närvaro som faktiskt arbetar för verksamheten — dygnet runt, utan att ägaren behöver tänka på det.\n\nDet är den typen av hemsida vi bygger åt restauranger, caféer och andra verksamheter med en tydlig personlighet. Fast pris. Live inom 14 dagar.\n\nVill du se hur en liknande sajt kan se ut för ditt café eller din restaurang?`,
        tags: ['Konceptcase', 'Café', 'Linköping'],
        liveUrl: 'https://restaurang.phigo.se',
        heroImage: '/images/case-cafe-alma.png',
        featured: true,
        accent: 'amber',
        caseType: 'concept',
    },
    {
        slug: 'andersson-el',
        title: 'Andersson El',
        category: 'Elektriker / Hantverkare',
        city: 'Linköping',
        shortDescription: 'En elektriker som gick från att förlita sig på mun-till-mun till att få förfrågningar via sin sajt.',
        description: `Det här är ett konceptcase — ett designexempel vi skapat för att visa hur en hemsida för en elektriker kan se ut och fungera. Andersson El är ett fiktivt företag.\n\nBakgrunden\n\nAnders Andersson driver en lokal elfirma i Linköping. Han har jobbat som elektriker i över tio år och har aldrig haft brist på uppdrag — nästan alla kunder kom via personliga rekommendationer. Det fungerade länge, men den typen av tillväxt har ett tak.\n\nProblemet var att kunder som sökte efter "elektriker Linköping" på sin telefon aldrig hittade honom. Och utan en tydlig hemsida var det svårt för rekommendationer att bli till faktiska uppdrag — många som hörde talas om honom sökte upp honom online, och hittade ingenting.\n\nVad vi ville visa\n\nVi ville skapa ett tydligt exempel på hur en lokal hantverkare kan använda en enkel hemsida för att nå nya kunder — utan att behöva bli expert på marknadsföring.\n\nDet vi fokuserade på:\n\nTydliga tjänster. En lista på vad som erbjuds — elinstallationer, felsökning, säkringsbyten, laddboxar och mer — gör det enkelt för besökaren att snabbt förstå om de hamnat rätt.\n\nServiceområde. Att tydligt visa vilket geografiskt område man arbetar i sparar tid för alla parter. Kunden vet om det är värt att ta kontakt. Elfirman slipper förfrågningar utanför sitt upptagningsområde.\n\nEn enkel väg att ta kontakt. Formuläret är avskalat: namn, telefonnummer och vad ärendet gäller. En förfrågan kan skickas på 30 sekunder — utan att behöva ringa och hoppas att någon svarar.\n\nOmdömen som bygger förtroende. Att anlita en elektriker innebär att man släpper in någon i sitt hem. Omdömen från andra kunder i Linköping gör den beslutsprocessen enklare.\n\nFunkar perfekt på mobilen. De flesta som behöver en elektriker söker i akuta situationer — från telefonen, direkt när behovet uppstår. Sajten är snabb och enkel att använda oavsett enhet.\n\nResultatet\n\nKonceptsajten för Andersson El visar hur en lokal hantverkare kan ha en hemsida som faktiskt arbetar för verksamheten — och som ger nya kunder i Linköping och närliggande kommuner en tydlig anledning att ta kontakt.\n\nDet är precis den typen av hemsida vi bygger åt elektriker, rörmokare, målare och andra hantverkare. Fast pris. Live inom 14 dagar.\n\nVill du se hur din verksamhet kan se ut online? Vi tittar gärna på vad du har idag och visar vad som kan förbättras — kostnadsfritt.`,
        tags: ['Konceptcase', 'Hantverkare', 'Linköping'],
        liveUrl: 'https://elektriker.phigo.se/',
        heroImage: '/images/case-andersson-el.png',
        featured: true,
        accent: 'amber',
        caseType: 'concept',
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
