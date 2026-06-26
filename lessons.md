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

### [2026-06] Wrappa aldrig en oklch-variabel i rgba()
- **Vad hände:** process-section hade `shadow-[0_0_10px_rgba(var(--primary),0.5)]`.
  `--primary` är ett `oklch()`-värde, så `rgba(oklch(...), 0.5)` är ogiltig CSS —
  glödet renderades aldrig (tyst trasigt, ingen byggfel).
- **Varför:** `rgba()`/`hsla()` förväntar sig numeriska kanaler, inte en
  färgfunktion. En token som är `oklch()` kan inte stoppas in där.
- **Regel:** För att lägga opacitet på en färg-token, använd
  `color-mix(in oklch, var(--token) 50%, transparent)` eller Tailwinds
  opacitetsmodifierare (`bg-primary/50`). Aldrig `rgba(var(--token), …)`.

### [2026-06] Tailwind 4: egna färg-tokens måste registreras i @theme inline
- **Vad hände:** Fas 3 införde `--accent-cases/--accent-process/--accent-hero`.
- **Varför:** En CSS-variabel i `:root`/`.dark` ger INTE automatiskt
  utilities som `text-accent-hero` eller `bg-accent-cases/10`. Tailwind 4
  genererar bara klassen om färgen är mappad som `--color-*` i `@theme inline`.
- **Regel:** När du tokeniserar en färg som ska användas som Tailwind-klass:
  definiera värdet i `:root` + `.dark` OCH lägg `--color-x: var(--x)` i
  `@theme inline`. Sätt token-värdet exakt lika med det gamla hårdkodade värdet
  (t.ex. amber-500 = `oklch(0.769 0.188 70.08)`) så att utseendet är identiskt.

### [2026-06] Playwright full-page-screenshot fångar scroll-animationer på opacity-0
- **Vad hände:** Vid Fas 4-preview av ljust läge såg `full_page`-screenshoten ut
  att ha tomma vita sektioner under hero, och enskilda kort (om-oss-kortet,
  kontakt-knappen) såg uttvättade/svaga ut. Misstolkades först som
  kontrastproblem i ljust läge.
- **Varför:** Sektionerna använder intersection-baserade entrance-animationer
  (Framer Motion, `opacity: 0` → 1). En `full_page`-screenshot renderar allt
  utanför viewporten innan animationen triggats, så det fångas på opacity-0.
  Elementen var i själva verket `bg-primary`/`text-primary` (solid emerald) —
  inget fel på paletten.
- **Regel:** För att verifiera färg/kontrast med Playwright: scrolla varje
  sektion in i viewporten och vänta ut animationen (eller inaktivera animationer)
  INNAN screenshot. Lita aldrig på en `full_page`-bild för kontrastbedömning av
  scroll-animerat innehåll.

### [2026-06] Vercel Analytics/Speed-Insights ger 404 i lokal `next start`
- **Vad hände:** Vid Fas 5-verifiering av tema visade konsolen fyra `error`-rader:
  404 + "Refused to execute script" för `/_vercel/insights/script.js` och
  `/_vercel/speed-insights/script.js`. Såg ut att bryta mot "Inga console errors".
- **Varför:** `@vercel/analytics` och `@vercel/speed-insights` injicerar skript som
  bara serveras av Vercels infrastruktur i produktion. Lokalt (`next start`/`dev`)
  finns inte routen, så den faller tillbaka till HTML 404 → MIME-fel. Förväntat.
- **Regel:** Dessa två 404/MIME-fel är miljöartefakter, inte riktiga buggar — räkna
  bort dem vid lokal konsollkontroll. Verifiera "inga console errors" mot riktiga
  app-fel (hydration, React, tema), inte Vercel-skriptens lokala 404.

### [2026-06] Verifiera OS-tema med Playwright `color_scheme`, inte class-byte
- **Vad hände:** Fas 5 kopplade in next-themes (defaultTheme="system"). För att
  bekräfta att OS-preferens styr läget användes `browser.new_context(color_scheme=
  'light'/'dark')` + avläsning av `<html>`-klassen och `body` bakgrundsfärg.
- **Varför:** next-themes med `enableSystem` läser `prefers-color-scheme`. Att
  manuellt sätta `.dark` testar inte systemvägen. Playwrights `color_scheme`
  emulerar OS-preferensen på riktigt och visar att klassen blir 'light'/'dark'
  automatiskt (samt att anti-FOUC-skriptet sätter klassen före paint).
- **Regel:** För att verifiera tema-via-OS: emulera `color_scheme` i ett nytt
  context och läs av `<html>`-klassen + computed `body` bakgrund. Bekräfta också
  att next-themes blockerande inline-skript finns i `<head>` (förhindrar flash).

### [2026-06] PowerShell `Start-Job` överlever inte mellan tool-anrop
- **Vad hände:** Startade `pnpm start` via `Start-Job` i ett PowerShell-anrop;
  nästa anrop fick ERR_CONNECTION_REFUSED — servern var död.
- **Varför:** Varje PowerShell-tool-anrop är en ny session; bakgrundsjobbet dödas
  när sessionen avslutas. Shell-state persisterar inte mellan anrop.
- **Regel:** För långkörande servrar under verifiering, använd tool-anropets
  `run_in_background` (håller processen vid liv mellan turer), inte `Start-Job`.

---

## Att lägga till löpande

Varje gång Claude Code gör ett misstag, eller ni upptäcker något som borde gjorts annorlunda — lägg till en ny lesson här. Över tid blir detta dokument er viktigaste kvalitetssäkring.
