# Lessons Learned — PHIGO

Granska denna fil vid start av varje Claude Code-session.
Lägg till nya lessons efter varje korrigering.

## Format per lesson

### [DATUM] Kort beskrivning
- **Vad hände:** Beskriv felet eller insikten
- **Varför:** Grundorsak
- **Regel:** Ny regel att följa framöver

---

## Lessons

### [2026-03] Aldrig React/Tailwind för kundhemsidor
- **Vad hände:** Diskussion om teknikval för kundsajter.
- **Varför:** React löser ett problem målgruppen inte har. Vanilla HTML/CSS/JS 
  är snabbare att leverera, har noll dependencies, ingen build-step, och kunden 
  kan hosta det var som helst.
- **Regel:** Kundhemsidor byggs ALLTID i vanilla HTML/CSS/JS. Komponentbibliotek 
  som 21st.dev och shadcn/ui används som visuell inspiration — bygg om effekterna 
  i ren CSS istället för att dra in React som dependency. React/Tailwind används 
  bara på PHIGOs egen sajt och egna produkter.

### [2026-03] Single-page som standard — multi-page är en uppsäljning
- **Vad hände:** Diskussion om one-page vs multi-page.
- **Varför:** Lokala småföretag har ett mål: få besökaren att boka. Varje klick till en ny sida tappar dem. Undersidor med tre meningar ser mindre proffsigt ut än samma innehåll integrerat i en sektion. Multi-page motiveras bara om kunden har genuint unikt innehåll per tjänst.
- **Regel:** Standard i 8 000 kr-paketet = single-page. Fördjupningssidor erbjuds som uppgradering om kunden har innehåll som motiverar det.

### [2026-03] Skriv aldrig tekniskt på kundytan
- **Vad hände:** PHIGO-sajten använde termer som "Next.js 15", "Edge Computing", "Lighthouse 100", "Headless CMS", "SEO", "UX", "CTA".
- **Varför:** Målgruppen (tandläkare, elektriker, frisörer) förstår inte och bryr sig inte om dessa begrepp. De vill veta: vad får jag, vad kostar det, och när är det klart.
- **Regel:** Översätt ALLT till resultat. "SEO" → "Syns i Google". "Mobilanpassad" → "Funkar perfekt på mobilen". "CTA" → "Tydliga knappar som gör det lätt att ta kontakt". Se ordlistan i sajtkopia-dokumentet.

### [2026-03] "B2B" resonerar inte med målgruppen
- **Vad hände:** Hemsidan sa "Vi hjälper B2B-företag".
- **Varför:** En tandläkare tänker inte "jag är ett B2B-företag". De tänker "jag driver en tandklinik". B2B är intern terminologi.
- **Regel:** Använd "lokala företag" eller "företagare". Ännu bättre: nämn branscher direkt.

### [2026-03] Fiktiva logotyper skapar misstroende
- **Vad hände:** Sajten hade en logotyp-karusell med NordicTech, Storberg, Avenio etc.
- **Varför:** Besökare googlar företagsnamn. Fiktiva namn upptäcks och förstör förtroende.
- **Regel:** Antingen riktiga kundlogotyper eller ta bort karusellen helt tills ni har dem.

### [2026-03] Offer-strukturen (Outcome → Mechanism → Boundaries → Price)
- **Vad hände:** Vi byggde PHIGO:s offer enligt ramverket.
- **Varför:** Ett bra erbjudande är inte en lista av tjänster. Det är: vad kunden får (outcome), hur det händer (mechanism, max 3 steg), varför det fungerar (differentiator), vad det är och inte är (boundaries), och vad det kostar (price).
- **Regel:** Varje nytt erbjudande PHIGO skapar ska följa detta ramverk. Ska kunna sägas på 15 sekunder.

### [2026-03] Sänk aldrig priset till 5 000 kr
- **Vad hände:** Diskussion om att sänka priset.
- **Varför:** 5 000 kr signalerar "billigt/Fiverr". 8 000 kr signalerar "professionellt fastpris". Skillnaden är obetydlig för en etablerad företagare men uppfattningen är helt annorlunda. Marginalen krymper dessutom drastiskt.
- **Regel:** 8 000 kr är golvpriset. Höj om leveransen motiverar det — sänk aldrig.

### [2026-03] Ett offer i taget — inga tre paket dag ett
- **Vad hände:** Diskussion om att erbjuda tiers direkt.
- **Varför:** Flera paket späder ut säljkraften. Kör ett erbjudande tills ni har 5-10 kunder och en repeterbar process. Sedan lägg till tier 2 (multi-page, 15-20k) som naturlig uppsäljning.
- **Regel:** Lansera nya erbjudanden först när det befintliga är bevisat.

### [2026-03] FAQ ska inte visa priser på tilläggstjänster
- **Vad hände:** Ville skriva "2 000 kr" i FAQ för admin-systemet.
- **Varför:** FAQ ska sälja idén, inte starta en prisförhandling. Priset ges i samtalet. Om ni höjer priset senare behöver ni inte uppdatera sajten.
- **Regel:** Baspriset (8 000 kr + 399 kr/mån) visas tydligt. Tillägg beskrivs som "tillägg utöver baspaketet" utan specifik siffra.

### [2026-03] Admin/CMS är ett tillägg — aldrig inkluderat i bas
- **Vad hände:** FAQ lovade att kunden kan uppdatera sajten själv.
- **Varför:** CMS kräver extra arbete (2-4 timmar per kund). Att inkludera det i 8 000 kr äter marginal.
- **Regel:** Baspaketet = vi gör ändringar åt kunden (ingår i 399 kr/mån). CMS/admin = tillägg som säljs vid leverans.

### [2026-03] Nudga mot månadsavtalet — tvinga aldrig
- **Vad hände:** Fråga om kunder som bara vill köpa sajten utan drift.
- **Varför:** "Du ansvarar själv för hosting, säkerhet och uppdateringar" är tillräckligt för att 90% väljer 399 kr/mån. Inget behov av att höja engångspriset eller tvinga.
- **Regel:** Erbjud alltid möjligheten att köpa utan drift. Formulera det så att drift framstår som det smarta valet.

### [2026-03] Case-beskrivningar ska berätta en historia
- **Vad hände:** Cases listade features: "Modern hemsida med fokus på förtroende och tjänsteöversikt."
- **Varför:** Kunder relaterar till problem och resultat, inte feature-listor.
- **Regel:** Case-format: [Typ av företag] som hade [problem]. Vi byggde [lösning] som resulterade i [resultat/beteende].

### [2026-03] Formspree för kontaktformulär på demo-sajter
- **Vad hände:** Fråga om backend behövdes för demo-cases.
- **Varför:** Inget behov av egen backend. Formspree ger fungerande formulär via en URL-ändring. Gratis, noll underhåll.
- **Regel:** Kontaktformulär på kundhemsidor = Formspree eller Web3Forms. Ingen egen backend om det inte krävs av funktionaliteten.

### [2026-03] Deploya via Vercel + GitHub
- **Vad hände:** Valde hosting-strategi.
- **Varför:** Gratis tier, automatisk CI/CD, snabb CDN, preview-deploys. DNS pekas från Loopia mot Vercel. Mail (Google Workspace) påverkas inte.
- **Regel:** Alla sajter deployar via GitHub → Vercel. Loopia hanterar bara DNS och mail.

### [2026-03] Märk demos som demos
- **Vad hände:** Cases på sajten var mockups, inte riktiga kunder.
- **Varför:** Att presentera demos som riktiga kundprojekt kan upptäckas och förstöra förtroende.
- **Regel:** Märk tydligt som "Konceptcase" eller "Demo" tills riktiga kundprojekt finns.

---

## Att lägga till löpande

Varje gång Claude Code gör ett misstag, eller ni upptäcker något som borde gjorts annorlunda — lägg till en ny lesson här. Över tid blir detta dokument er viktigaste kvalitetssäkring.
