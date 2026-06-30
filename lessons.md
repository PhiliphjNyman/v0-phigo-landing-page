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

### [2026-06] Verifiera mot en FÄRSK server — port 3000 kan ha en stale instans
- **Vad hände:** Vid Fas 6-verifiering av tema-toggeln byggde jag (`pnpm build`),
  men en server från en tidigare session låg redan kvar på port 3000. `pnpm start`
  gav EADDRINUSE, och Playwright-testet körde mot den gamla servern → 0 toggle-
  knappar i DOM (komponenten saknades). Misstolkades först som fel selector.
- **Varför:** Den körande processen serverade en gammal `.next`-build utan mina
  ändringar. En lyckad build på disk betyder inte att den körande servern laddat om.
- **Regel:** Innan verifiering, säkerställ att servern på 3000 kör senaste build:
  döda den befintliga processen (`Get-NetTCPConnection -LocalPort 3000 ... |
  Stop-Process`) och starta om med `run_in_background`. Om `pnpm start` ger
  EADDRINUSE — anta INTE att den gamla servern duger; den är troligen stale.

### [2026-06] Låg opacitet på `bg-muted/X` dödar sektionsrytmen i ljust läge
- **Vad hände:** Ljust läge såg nästan helvitt och platt — sektioner gick ihop.
  Orsaken: de "tonade" sektionerna använde `bg-muted/5`–`/20`. Med ljus `--muted`
  (0.96) och `--background` (0.975) så nära varandra blev 5–20 % opacitet helt
  omärkbart (blandat värde hamnade ~0.001 L från basen).
- **Varför:** En liten L-skillnad mellan två redan ljusa neutraler, ytterligare
  utspädd av opacitetsmodifierare, ger ingen synlig kontrast. Stripe-känslan kräver
  att den tonade ytan visas SOLID, och att vita kort (1.0) lyfter mot den.
- **Regel:** För sektionsrytm i ljust läge: använd solid `bg-muted` (inte `/10`),
  och håll tre neutrala nivåer med tillräckligt gap. Eftersom samma
  className styr båda lägena: skriv `bg-muted dark:bg-muted/10` så att mörkt läge
  behålls byte-för-byte (mörka tonade sektioner SKA vara svaga) medan ljust läge får
  solid ton. Ändra aldrig den delade opaciteten utan `dark:`-override — det ändrar
  mörkt läge.
- **Uppföljning (steg 2b):** muted 0.96 < base 0.975 (gap 0.015) var fortfarande
  för subtilt för att läsas. Fördjupat till **muted 0.94 < base 0.98 < card 1.0**
  (gap base→band 0.04, ~2,6× tydligare). Att HÖJA basen mot vitt (0.975→0.98)
  samtidigt som bandet sänks ger en renare "vit sajt med grå band" och får vita
  kort att lyfta mer — bättre än att bara mörka bandet. Tumregel: gap mellan två
  stora intilliggande neutralytor behöver ≥~0.03–0.04 oklch-L för att kännas.

### [2026-06] Neutral oklch → WCAG-kontrast kan räknas som L³
- **Vad hände:** Behövde verifiera AA efter att ha gjort `--background`/`--muted`
  gråare. För neutrala (chroma 0) oklch-färger är linjär sRGB = L³ per kanal, så
  relativ luminans Y = L³. Kontrast = (Yljus+0.05)/(Ymörk+0.05).
- **Regel:** Snabb AA-koll för neutrala ytor/text utan färgbibliotek: Y = L³.
  T.ex. foreground 0.20 på background 0.98 → 17.1:1; muted-foreground 0.50 på
  muted 0.94 → 5.03:1 (värsta fallet, klarar AA bekvämt).

### [2026-06] Mörkt-läge: WCAG-luminans underskattar hur väl en emerald-yta sticker ut
- **Vad hände:** Fas 6 steg 3 lade en djup emerald-anchor bakom hero + final CTA.
  I mörkt läge är sidan redan mörkgrön (--background oklch 0.12 chroma 0.030).
  Första emerald-värdena hade bara 1.07–1.27:1 WCAG-luminanskontrast mot sidan —
  "samma färg" enligt WCAG — men såg ändå urskiljbara ut tack vare chroma-skillnad.
- **Varför:** WCAG-kontrast mäter ENBART luminans (Y). Två mörkgröna ytor med olika
  chroma (0.030 vs 0.065) kan ha nästan identisk Y men ändå se tydligt olika ut för
  ögat. Att bara titta på WCAG-talet missar den perceptuella skillnaden.
- **Regel:** För att en mörk färgad yta ska "sticka ut" mot en mörk fond i mörkt
  läge: höj BÅDE luminans (sikta ≥~1.8:1 mot fonden) OCH chroma (~2×+), och förstärk
  med en hairline-border (white/10) + mjuk glow/shadow. Lita inte på WCAG-luminans
  ensam för att avgöra urskiljbarhet — den är till för text/bakgrund, inte för
  "syns det här blocket mot sin granne".

### [2026-06] Tema-medveten gradient-yta: klass i globals.css, ljus text via tokens
- **Vad hände:** Emerald-anchorn behövde olika gradient i ljust/mörkt läge men SAMMA
  ljusa text i båda. Lösning: `.anchor-emerald` + `.dark .anchor-emerald` för
  gradienten (oklch-stops får inte ligga i JSX), och text-tokens (--anchor-fg m.fl.)
  i `:root` ENBART eftersom texten är ljus i båda lägena (cascade räcker, ingen
  `.dark`-override).
- **Regel:** När en yta byter utseende per läge men dess text inte gör det: lägg
  gradient/ytfärg i en `.dark`-overridad klass, och text-tokens i `:root` utan
  override. Registrera färg-tokens i `@theme inline` (--color-anchor-fg: …) för att
  få `text-anchor-fg`-utilities (jfr lesson om accent-tokens). Worst case för
  ljus-text-kontrast = gradientens LJUSASTE stop (inkl. radial-highlight-toppen) —
  räkna AA mot den, inte mot basfärgen.

### [2026-06] Fixerad (icke-tema-medveten) färgyta: definiera klassen UTAN .dark-override
- **Vad hände:** Emerald-anchorn flyttades från hero (revertad till ljus/neutral
  i båda lägena) till FINAL CTA, som ska se IDENTISK ut i ljust + mörkt läge —
  alltid den djupa mörk-emeralden (den som såg bra ut i hero i mörkt läge).
- **Varför:** Den gamla `.anchor-emerald` var tema-medveten (separat ljus gradient
  + `.dark .anchor-emerald`). En yta som ska se LIKADAN ut i båda lägena ska INTE
  ha en `.dark`-override — då ärver båda lägena samma värde via cascade. Att i
  stället sätta ljusa-läges-värdet = mörka-läges-värdet vore dubbel kod.
- **Regel:** Vill du ha en yta/färg som är identisk i båda lägena: definiera
  klassen EN gång (med de önskade värdena, här .dark-emeraldens) utan
  `.dark`-variant. Tema-medvetna ytor = klass + `.dark`-override; fixerade ytor =
  klass utan override. (Jfr lesson om tema-medveten gradient — detta är motsatsen.)
- **Städning:** När en token bara användes av den revertade delen (här
  `--anchor-highlight`, hero-ordet "kunder"), ta bort både `:root`-definitionen
  OCH `@theme inline`-mappningen — lämna ingen död CSS. Verifiera med grep att
  ingen `.tsx` refererar tokenen innan borttag. Kontraster på final-CTA mot
  mörk-emeralden (värsta fall = gradientens ljusaste stop): rubrik 10,5:1,
  undertext 8,2:1, knapptext (mörk-emerald på vit) 11,5:1 — alla klarar AA.

### [2026-06] Stripe-lik mesh-sweep: STATISK mask + blobbar som animerar ENBART transform
- **Vad hände:** Fas 6 steg 4 lade en animerad emerald mesh-gradient i hero
  (`components/hero-mesh.tsx` + `.hero-mesh*` i globals.css). Sweepen ska kännas
  som Stripe: mjuka emerald-moln koncentrerade uppe till HÖGER som löses upp diffust
  mot center-vänster, utan hårda kanter, med långsam meditativ rörelse.
- **Teknik som funkade:** 4 absolut-positionerade radial-gradient-"blobbar" (ljus →
  mid → djup → nära-svart emerald, hue ~160), var och en `filter: blur(64px)`
  (statiskt, aldrig animerat). Den diffusa uttoningen görs av en **statisk**
  `mask-image: radial-gradient(... at 100% 0%, #000 .. , transparent 66%)` på
  containern — inte av animerade properties. Blobbarna driver med
  `@keyframes` som ENBART rör `transform: translate3d()/scale()` (20–31 s loopar).
  Resultat: varje frame är GPU-komponerad, ingen repaint (blur/mask/bakgrund är
  konstanta). Vilo-läget (utan transform) är redan en komplett mesh.
- **Regel/perf:** För en kontinuerligt animerad gradient-atmosfär: animera ALDRIG
  blur-radie, `background-position`, mask eller färg. Lägg blur+mask statiskt och
  animera bara `transform` på blobbarna. `will-change: transform` ENDAST i den
  media-query där animationen faktiskt körs (`min-width:768px` +
  `prefers-reduced-motion: no-preference`) — så mobil och reduced-motion får den
  statiska meshen utan att hålla tomma compositor-lager. Eftersom vilo-läget är en
  hel mesh blir reduced-motion-fallbacken gratis (en ren statisk version).
- **Ljus vs mörk:** Samma emerald-shades i båda lägena (oklch-stops i CSS-klass,
  inte JSX — jfr anchor-lessonen). Endast wrapper-opaciteten skiljer:
  `opacity-65 dark:opacity-100`, så sweepen blir en mjuk hörn-accent på den nära-vita
  heron i ljust läge och ett fylligare sken på den mörka heron — sidan läser
  fortfarande som LJUS i ljust läge.
- **Glas-kort över mesh:** Metrics-korten gjordes till ljust glas
  (`bg-card/60 dark:bg-card/45 backdrop-blur-md`) så meshen syns mjukt bakom. Glaset
  + blur normaliserar ytan; uppmätt kontrast (kanvas-konverterade textfärger mot
  uppmätt glas-yta): ljust läge värde 17,0:1 / brödtext 5,65:1, mörkt läge
  15,5:1 / 5,55:1 — alla klarar AA.

### [2026-06] Mät kontrast mot UPPMÄTT yta — computed `color` kan vara oklab
- **Vad hände:** Vid kontrollen av kort-text över meshen ville jag mäta riktiga
  ratios. `getComputedStyle(el).color` returnerade `oklab(...)`/`oklch(...)` (inte
  rgb), så naiv regex-parsning kraschade.
- **Regel:** Konvertera valfri CSS-färg till sRGB i webbläsaren via en 1×1 canvas
  (`ctx.fillStyle = col; ctx.fillRect(); getImageData`) innan WCAG-beräkning. Och
  när text ligger på en halvtransparent yta över en gradient: sampla den FAKTISKT
  renderade ytfärgen från en screenshot (medelvärde av en tom kort-yta) — räkna inte
  mot tokenens nominella bakgrund, för glas + mesh ger en annan effektiv yta.

### [2026-06] Woven BANDS, inte en blob: elongerade ellipser med olika vinklar
- **Vad hände:** Fas 6 steg 4b. Den första mesh-versionen (4 cirkulära
  `closest-side`-radialer med blur(64px)) läste som EN diffus grön blob — ingen
  riktning, ingen struktur. Målet var Stripes form: flera distinkta emerald-
  ribbons i olika SHADES som väver om varandra.
- **Varför blob:** Cirkulär radial (lika bred/hög) + tung blur = ingen riktning,
  och 64px blur smälter ihop alla lager till ett moln. Strukturen försvinner.
- **Teknik som gav woven bands:** Byt cirkel → **elongerad ellips**
  (`radial-gradient(ellipse closest-side ...)` i en bred/låg box, t.ex. 80%×26%),
  och rotera varje band till sin EGEN basvinkel (-43°, -26°, -13°, +17°, +34°) så
  de korsar varandra. **Lättare blur (30–52px, inte 64)** så ribbonsen förblir
  separerbara istället för att smälta till blob. Inre platå i gradienten
  (`färg 0% → färg ~22% → transparent ~76%`) ger varje ribbon en solid kärna som
  tonar ut — mer ribbon-känsla än en ren radial. 5 band (ljus wash → mid body →
  djup → nära-svart hörn → tunn ljus highlight-streak) ger den vävda formen.
- **Rotation + animation:** Basvinkeln sätts som `transform: rotate(Xdeg)` i
  default-regeln (statiskt/reduced-motion ser roterade ribbons). Keyframes MÅSTE
  inkludera basrotationen (`rotate(-26deg) translate3d(...) scale(...)`) annars
  snäpper bandet platt vid animationsstart. Animerar fortfarande ENBART transform
  (drift + liten rotate-wobble + scale); blur/mask/färg statiska → GPU-komponerat,
  ingen repaint. Reduced-motion = `animationName: none` på alla band (verifierat).
- **Mer djup i ljust läge:** Höjde wrapper-opacitet 0.65 → 0.90 i ljust läge
  (`opacity-90 dark:opacity-100`). Djupet kommer från de MÖRKA banden (0.72/0.50/
  0.33 L), inte de ljusa — så när kontrast krävde nedtoning kunde de två LJUSASTE
  banden dämpas (0.88→0.85, 0.91→0.86) utan att tappa ljus-lägets rikedom.
  Sidan läser fortfarande ljus (rent vänster/center, sweep = djärv hörn-accent).
- **Kontrast-regression att se upp för:** Rikare/ljusare band läcker mer ljus
  genom glas-korten i MÖRKT läge → sänkte beskrivningstextens kontrast från 5,55:1
  till 4,06:1 (under AA). Fix: höj mörk-lägets glas-opacitet (`dark:bg-card/45` →
  `/66`) + dämpa de två ljusaste banden. Slutvärden (uppmätt mot ljusaste glas-yta
  under sweepen): ljust värde 16,4:1 / brödtext 5,45:1; mörkt värde 12,7:1 /
  brödtext 4,57:1 — alla AA. **Regel:** när du gör hero-meshen ljusare/rikare,
  mät ALLTID om glas-kortens text i MÖRKT läge — den ljusare ytan kan tippa den
  lilla brödtexten under 4,5:1.
- **Mät worst-case rätt:** Att sampla "tom kort-yta" på fasta fraktioner träffar
  ofta TEXT (etiketter/delta) eller anti-aliasade text-kanter (mid-grå pixlar med
  spread ≥5 som ser ut som yta). Filtrera bort dem: kräv låg patch-variance
  (`max per-kanal-spread < 14` = platt glas, inte glyf-kant) OCH `max(rgb) ≥ 4`
  (annars out-of-bounds svart från crop utanför bilden). Sampla ett tätt rutnät
  över alla kort och ta MIN-ratio (ljusaste mesh-ytan = värsta fallet i mörkt).

### [2026-06] Em-dash-svep: komma/punkt-regler + JSX `{' '}—`-fälla
- **Vad hände:** Fas 7 rensade em-dash (—) ur all kundvänd copy (komponenter,
  `lib/cases.ts`, `lib/blog.ts`, metadata-beskrivningar, integritetspolicy).
  Regel 15 lades till i CLAUDE.md.
- **Bedömning per instans:** hårt tankebrott (egen fullständig sats) → punkt +
  versal på nästa ord; lätt paus/apposition/antites ("X — inte Y", "X — och Y")
  → komma; parentetiska par ("ord — inskott — ord") → komma på båda; i listor där
  förklaringen efter strecket är en egen sats ("Term — den gör Z.") → punkt
  ("Term. Den gör Z.") för konsekvens.
- **Behölls medvetet (inte paus-streck):** en-dash i sifferintervall
  (`8 000–15 000 kr`, `Dag 1–3`, `150–300 kr/mån`), titelseparatorer i metadata
  (`Titel – PHIGO`, `... | PHIGO`) och interna mejlmallar i `app/api/contact/route.ts`
  (visas aldrig för besökaren). OG-`alt` och `aria-label` med "PHIGO – tagline"
  gjordes om till komma (läses upp av skärmläsare → räknas som synlig text).
- **JSX-fälla:** hero-rubriken var `...kunder</span>{' '}— inte bara finnas.`. När
  em-dash blir komma MÅSTE den explicita `{' '}` (mellanslaget) tas bort, annars
  renderas "kunder , inte" (komma med space före). Rätt: `</span>, inte bara finnas.`
  så att kommat sitter direkt mot ordet. (Hero-beslutet blev komma, inte punkt —
  "X, inte bara Y" är den naturliga svenska antites-konstruktionen, lugnare än en
  fragment-mening.)
- **Verifieringsfälla:** att strippa HTML-taggar till mellanslag gör att
  "kunder, inte" ser ut som "kunder , inte" i den strippade texten (taggen `</span>`
  blev ett mellanslag). Bekräfta kommats placering mot RÅ-HTML (`</span>, inte`),
  inte mot tag-strippad text. Räkna `—`/`–` i strippad text för att hitta läckor
  (0 = rent), men verifiera spacing i rå-HTML.
- **Regel:** Följ CLAUDE.md regel 15. Vid em-dash → komma intill ett ord i JSX:
  ta bort ev. `{' '}` så kommat fäster direkt. Lämna sifferintervall och
  titelseparatorer som en-dash.

### [2026-06] "Kundcase" vs "Designexempel" — orden får aldrig glida ihop
- **Vad hände:** Ärlighetspass inför kall outreach. Konceptcasen (Leendekliniken,
  Café Alma, Andersson El, alla `caseType: 'concept'`) hade `shortDescription` som
  claimade levererade utfall ("fick fler bokningar", "gick från mun-till-mun till
  förfrågningar via sin sajt"), trots att de är fiktiva designexempel. Dessutom
  kallade den delade case-mallen (`case-detail-client.tsx`) ALLA case för
  "Relaterade kundcase" och visade CTA-rubriken "Vill du ha liknande resultat?"
  även på konceptsidor, vilket implicerar ett uppmätt resultat vi aldrig mätt.
- **Varför:** Att presentera koncept som levererade kunduppdrag (eller antyda
  mätbara resultat från dem) är samma förtroenderisk som fiktiva logotyper, se
  lessonen "Märk demos som demos". Besökare och kalla leads granskar case; en
  upptäckt överdrift dödar trovärdigheten precis när den behövs som mest.
- **Regel:** Håll isär två ord strikt. **"Kundcase"** = ENBART riktiga, levererade
  kunder (idag bara Malte Örn, `caseType: 'real'`) och får claima faktiska utfall.
  **"Designexempel"/"Konceptcase"** (`caseType: 'concept'`) = beskriv som vad vi
  KAN bygga ("Ett designkoncept som visar hur ...") — aldrig påstå mätbara resultat
  i vare sig `shortDescription` eller den långa beskrivningen. När delad UI-copy
  (rubriker, CTA) renderas för båda case-typerna: gör den villkorad på `caseType`
  (konceptsidor får "Vill du ha en sajt som den här?", riktiga case behåller "Vill
  du ha liknande resultat?") eller välj en neutral formulering som stämmer för båda
  ("Relaterade exempel", inte "Relaterade kundcase"). Källan till sanning är
  `lib/cases.ts` + `caseType` — granska alltid den långa beskrivningens
  "Resultatet"-stycke; den ska säga "Konceptsajten ... visar hur ...", inte
  påstå ett utfall.

### [2026-06] Logga-varianter: byt ALDRIG namn på phigo-logo.png
- **Vad hände:** E-postsignaturen pekade på `/public/brand/phigo-logo.png`. Den
  filen är mörk-läge-varianten (ljus "GO" #EEEEEE), så på vit mejlbakgrund
  försvann "GO" och det såg ut att stå bara "PHI". Vi tog fram en ljus-bakgrund-
  variant med mörk "GO" istället.
- **Varför:** Loggan finns i ett enda läge per fil. En fil byggd för mörk yta
  (ljus text) blir oläslig på ljus yta, och tvärtom. Signaturer renderas alltid
  på vit bakgrund.
- **Regel:** Vi har nu flera logga-varianter i `/public/brand/`, håll isär dem:
  - **`phigo-logo.png`** — mörk-läge (ljus "GO"), för MÖRK bakgrund. Full storlek
    (4400×1680).
  - **`phigo-logo-light.png`** — ljus-bakgrund (mörk "GO" #161616 = sajtens ljusa
    `--foreground`), för VIT/ljus bakgrund. Full storlek.
  - **`phigo-logo-email.png`** — samma som light men nedskalad till 600px bred
    (2x retina för ~120-150px visningsbredd), optimerad. Detta är den signaturen
    ska peka på: `https://phigo.se/brand/phigo-logo-email.png`.
  - **Byt ALDRIG namn på eller ta bort `phigo-logo.png`** (eller andra publicerade
    varianter). Redan utskickade mejl pekar på den exakta URL:en
    `https://phigo.se/brand/phigo-logo.png`; ett namnbyte släcker loggan i all
    historisk korrespondens. Lägg ENBART till nya varianter, ändra aldrig befintliga
    publika filnamn.
  - Filer i `/public` serveras från roten: `/public/brand/X.png` →
    `https://phigo.se/brand/X.png`.

---

## Att lägga till löpande

Varje gång Claude Code gör ett misstag, eller ni upptäcker något som borde gjorts annorlunda — lägg till en ny lesson här. Över tid blir detta dokument er viktigaste kvalitetssäkring.
