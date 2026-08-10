# IMPLEMENTATIONPLAN — PHIGO-sajten: scroll-liv + produktombyggnad

> **Denna fil är SJÄLVBÄRANDE.** Den ersätter den tidigare 8-momentsprompten
> (som inte finns i repot) och innehåller allt Code behöver utöver CLAUDE.md
> och lessons.md. Faserna körs i STRIKT ordning uppifrån och ned — en fas
> godkänns innan nästa påbörjas.
>
> **Ribba för hela planen: SÄLJBART, INTE PERFEKT.** Deadline: deploybar sajt
> senast 13 aug. Polering sker efter deploy, inte före.
>
> **Stående regel — statusrutor:** varje fas och moment nedan bär en statusruta
> (✅ klar / 🔄 pågår / ⬜ ej påbörjad). Rutorna uppdateras vid VARJE
> delsteg-commit, så en ny session direkt ser var arbetet står. Uppdatera både
> statustabellen (§1) och den berörda momentrubriken i samma commit.

---

## 0. Läsordning för varje session

1. `/clear` (fräsch kontext)
2. `CLAUDE.md` — regler; särskilt pnpm-only, ingen push utan OK, hårda regler 1–16
3. `lessons.md` — dyrköpta läxor
4. Senaste session-handoff (om en finns)
5. **Denna fil** — hitta första ej avbockade fasen, bygg den

Vid konflikt: CLAUDE.md > lessons.md > denna fil.
CLAUDE.md:s hårda regel 1 ("inga sektioner utanför briefingen") — **denna fil ÄR
briefingen** för produktombyggnaden; fas 2 är alltså sanktionerad, inget utöver den.

---

## 1. Status & ordning

| # | Fas | Innehåll | Status |
|---|---|---|---|
| — | Moment 1–2 | Jank-diagnos + orbs | ✅ KLAR (se §2) |
| 0 | Produktdefinitioner | Prosa, Hugo levererar — blockerar fas 2 | ✅ KLAR (se `Fas0_produktdefinitioner.md`) |
| 1 | Moment 3 + 4 | Lagerdjup + reveal-refaktorn | ✅ KLAR (3B parallax uppskjuten, se §5) |
| 2 | Produktombyggnad | Produktsidor, navigering, guide-yta | ✅ KLAR (delstatus i §6) |
| 3 | Moment 5 + 6 | Swipe-kort + typografisk skärpa (sajtbrett inkl. nya sidor) | ✅ KLAR |
| 4 | Moment 7 + 8 | Viewport/a11y + slutmätning | ✅ KLAR (M7 godkänd; M8 mätt: CLS 0 + LCP<2s + R3, formell Lighthouse vid deploy) |
| 5 | Integrationer | Chatbot-widget, guiden (nativ), receptionist-nummer | 🔄 KÖRS PÅ BRANCHEN före merge (omsekvenserat 2026-08-06; guiden nativ sedan 2026-08-10, se §9 + §9.1) |
| 6 | Audits + deploy | Skills-audits, push-OK, prod-verifiering | 🔄 F–H ✅ (H godkänd 2026-08-06); merge väntar på fas 5:s hårda krav |

Branch: `feature/scroll-liv-och-diagnos`. Inget pushas utan uttryckligt OK.
Commit per godkänt delmoment. Bocka av tabellen ovan när en fas godkänts.

---

## 2. Skeppat läge ✅ KLAR (moment 1–2 — RÖR EJ utan explicit uppdrag)

- **Moment 1 (jank):** header med rAF-throttlad scroll-lyssnare; solid bar
  (`bg/90`) på mobil, glas på desktop. Hero-höjd `100vh; 100svh;` — svh är en
  MEDVETEN avvikelse (dvh orsakade adressfälts-hopp, se lessons.md). Verifierat
  på riktig mobil.
- **Moment 2 (orbs):** 3D-objektsfärer (ej blur-dimma) — CSS-skulpterade,
  rotationslager under FAST belysning, spårbar textur (kontrastband + stormfläck
  + foreshortening). Kluster i mesh-glöden övre höger (stor + liten), proximity
  endast på primären, 2 anchor-orbs, flat statisk orb på mobil. Motor:
  `components/hero-orb.tsx` (props: flat, onDark, glow, interactive, parallax).
- **Atmosfär-principen** (kodad i `scripts/visual-rules.mjs` R1–R5): orbs bor
  ENDAST i mesh-/gradientglöd, aldrig bar vit yta; helt synliga ELLER
  innehålls-skymda, aldrig kant-/sektionsklippta.
- Mesh urtunnad till opacity 70/80 — preliminärt, omvärderas i fas 3.
- Hydration: ThemeToggle använder mounted-mönster; konsolen ska förbli ren.

---

## 3. Gemensamma arbetsregler (gäller ALLA faser)

- **Undersök först:** rapport om nuläget innan något ändras. Fas 1:s moment 4
  och hela fas 2 kräver dessutom separat plangodkännande före rivning/nybygge.
- **Grind före varje moment-/fasgodkännande:**
  1. `pnpm exec node scripts/visual-rules.mjs` → ALL RULES PASS (server på :3000)
  2. Screenshot-granskning mot explicit checklista (ej fri smak), båda färglägena
  3. Hugos ögon — mobilkänsla ALLTID på riktig enhet via lokalt IP
     (`pnpm dev -- -H 0.0.0.0`)
  - Mänskliga fynd som kan formuleras som regel flyttas in i visual-rules.mjs.
- **Färsk server:** döda zombie-/stale dev-servrar före all verifiering
  (CLAUDE.md "Verifikation innan klar"). Prod-perf mäts med
  `pnpm exec next start -p 3001` (INTE `pnpm start -- -p` — manglar argumentet).
- **Headless ser inte allt:** Playwright/emulering ser varken GPU-kostnad eller
  adressfälts-reflow — slutkänsla alltid på riktig mobil + desktop.
- Inga nya produktionsberoenden. Dev-verktyg (t.ex. Playwright) ok efter godkännande.
- **Stat-siffrorna är låsta:** 8 000 kr / 14 dagar / 399 kr/mån / <1 sek.
  Ändra inga värden, lägg inte till siffror, hitta ALDRIG på kundantal/historik.
- Brand vid tvekan: `brand_assets/BRAND.md`. Grönt = accent, aldrig yta i ljust
  läge; mörk gradient endast hero/anchor; Inter; klarspråk enligt CLAUDE.md:s
  ordlista; inga em-dash i synlig text (hård regel 15).

### Designreferens (Insperation/: boltgroup desktop + mobil)
Applicera PRINCIPERNA, kopiera inte designen:
- Innehållet ÄR designen: typografi, siffror, rytm. Inga stockfoton.
- Små uppercase-etiketter (12px, letter-spacing) i accentgrönt ovanför rubriker.
- Rubriker där nyckelord får accentfärg eller tonas ned för hierarki.
- Stora stat-block som bevis.
- Mobil = samma innehåll och ordning i en kolumn, typografi skalar med clamp().
  INTE en reducerad desktop.
- Deras mörka tema och lila/lime-palett ska INTE med. PHIGO är ljus med grön accent.

---

## 4. FAS 0 — Produktdefinitioner ✅ KLAR (prosa, FÖRE fas 2 — ingen kod)

Hugo levererar/godkänner. Varje produkt definieras enligt offer-ramverket i
CLAUDE.md (Outcome → Mechanism → Differentiator → Boundaries → Price) plus
primär CTA:

- [x] **Hemsida** — 8 000 kr + 399 kr/mån (kärnprodukten; befintligt offer i
      CLAUDE.md är utgångspunkt). "Betala hälften nu, resten först när du är
      nöjd" är sajtens viktigaste förtroenderad.
- [x] **AI-Receptionist** — paketering + pris låst (7 000 kr + 1 495 kr/mån).
      Demo = ring receptionist-numret (samma som visitkorten).
- [x] **Chatbot** — paketering + pris låst (4 000 kr + 695 kr/mån). Demo =
      widgeten på sajten.
- [x] ~~Ev. **Underhåll / Sociala medier**~~ — struken, ej med i
      fas 0-leveransen.
- [x] **Guide-flödets frågor** (5–7 st) + utfallsmallar per svar-kombination.

**Johnny-regeln (obligatorisk för alla produkttexter och guide-utfall):**
kunden får UTFALL + prisindikation + CTA ("En sajt som fångar bokningar dygnet
runt. Från 8 000 kr."), ALDRIG teknisk kravlista eller spec. Specen är vårt
samtalsunderlag, inte kundens leverabel.

**Om fas 0 inte är levererad när fas 2 ska börja: Code STANNAR och frågar.**
Code skriver aldrig produktcopy fritt.

---

## 5. FAS 1 — Moment 3 + 4 ✅ KLAR (scroll-liv)

### Moment 3: Lagerdjup i ljusa sektioner ✅ (Del A klar, Del B uppskjuten)
- ✅ **Del A (KLAR):** Kort/stat-block får mjuk flerlagerskugga med svag grön ton.
  Implementerat som `.card-depth`-utility + tema-tokens i `globals.css` (grön-tonad
  tvålagerskugga i ljust läge, `none` i mörkt så shippat mörkt läge bevaras).
  Applicerad sajtbrett på innehållskort (case, erbjudande-steg, varför-PHIGO,
  om-oss, case-detalj, blogg).
- ⬜ **Del B (UPPSKJUTEN — uppföljningssteg):** Vid scroll förskjuts kort och ev.
  accentdetalj (badge/etikett) marginellt olika (faktor ~1.0 vs ~1.3) för
  djupkänsla. Max ~12px. Desktop only, mobil/reduced-motion av. Byggs separat.
- INGET rastermönster eller bakgrundsbild i ljusa sektioner.

### Moment 4: Scroll-reveals sajtbrett ✅ KLAR (Framer-refaktorn)
- Ersätt de ~100 spridda `whileInView`-anropen med ETT gemensamt reveal-system:
  sektioner/kort tonar in (opacity 0→1 + translateY 16px→0), 300–400 ms
  ease-out, stagger 60–80 ms per kort i grid, triggas en gång.
- Systemets variants bor i `lib/animations.ts` (CLAUDE.md-konvention).
- **Detta är projektets största rivningsarbete.** Börja med
  undersök-först-rapport: hur reveals är kopplade idag, vilka sektioner berörs,
  refaktorplan — invänta Hugos plangodkännande INNAN något rivs.
- Slutresultatet ska KÄNNAS identiskt eller bättre, aldrig omotiverat annorlunda.

> Ordningsskäl: fas 2:s nya sidor byggs på reveal-systemet från dag ett —
> därför måste moment 4 vara klart först.

---

## 6. FAS 2 — Produktombyggnad ✅ KLAR

Sajten går från "en produkt + lös text" till "alla produkter snyggt
representerade". **Kräver fas 0 levererad + separat plangodkännande.**

**Delstatus (uppdateras per delsteg-commit):**
- [x] ✅ Flytt av hemsideinnehåll till `/hemsida` + Tjänster-nav
- [x] ✅ `/ai-receptionist` (delad produktmall)
- [x] ✅ `/chatbot` (variation på produktmallen, copy ur fas 0 §4)
- [x] ✅ Produktöversikt på startsidan (`#produkter`, 3 card-depth-kort)
- [x] ✅ Guide-yta "Hitta rätt lösning" (designad container, ingen Voiceflow)

### 6.1 Undersök-först (rapport före bygge)
- Nuvarande sidstruktur/routes, navigering, var produktinnehåll bor idag
  (offer-section.tsx m.fl.).
- Förslag på arkitektur enligt 6.2 med maximalt återbruk av befintliga sektioner.
- Ta ställning till: egna routes (`/hemsida`, `/ai-receptionist`, `/chatbot`)
  ELLER sektioner på startsidan — motivera utifrån innehållsmängd och SEO.
- Branchbeslut: fortsätt på `feature/scroll-liv-och-diagnos` eller ny
  `feature/produktsidor` från den — föreslå utifrån diff-storlek.
- **Invänta godkännande innan bygge.**

### 6.2 Målarkitektur
- **Startsida:** hero (orörd) → produktöversikt (kort per produkt, nya
  reveal-systemet) → cases → förtroendesektion (hälften nu/resten när nöjd) →
  process → varför PHIGO → FAQ → CTA + kontaktformulär. Befintlig
  sektionsordning i CLAUDE.md justeras endast med produktöversikten.
- **Per produkt:** utfall-rubrik, 3–4 konkreta fördelar (klarspråk), pris,
  demo-inslag, CTA. Riktmärke: en skärmhöjd desktop — kort och säljande,
  inte uttömmande.
- **AI-Receptionistens demo-CTA:** "Ring och prova själv" + nummer (läggs in i
  fas 5 om det inte är fastställt).
- **Guide-yta:** sektion/route "Hitta rätt lösning" — i denna fas en DESIGNAD
  CONTAINER med rubrik, kort förklaring och CTA. Själva flödet bor i Voiceflow
  och embeddas i fas 5. Bygg platsen, inte flödet.
- **Navigering:** produkterna nåbara från huvudmeny + mobilmeny (Sheet).
  Nav-texter i klarspråk enligt CLAUDE.md-mönstret.

### 6.3 Regler specifika för fas 2
- All copy från fas 0 — ordagrant eller godkänd omskrivning. Saknas text: fråga.
- Nya sektioner använder reveal-systemet (moment 4) + etikettmönstret
  (uppercase, 12px, accentgrönt) från start — fas 3 ska inte behöva städa här.
- Atmosfär-principen + visual-rules gäller även nya ytor.
- FAQ: baspris visas, tilläggspriser beskrivs utan siffra (hård regel 13).
- Kontaktformulärets fält/flöde röres ej i denna fas.

**Grind:** ordinarie tre steg + Hugo klickar igenom varje produktsida/-sektion
på riktig mobil.

---

## 7. FAS 3 — Moment 5 + 6 ✅ KLAR (appliceras sajtbrett INKL. fas 2:s nya ytor)

**Delstatus (uppdateras per delsteg-commit):**
- [x] ✅ Moment 6 — Eyebrow-migrering: delad `<SectionEyebrow>`, alla 15 sektionsetiketter migrerade till kanon (text-xs bold uppercase tracking-0.15em; on-dark demo-CTA via färg-override i className)
- [x] ✅ Moment 6 — Clamp-skala (text-fluid-h1/h2/stat, @theme, ankrad 360→1440) på 2 hero-H1 + 13 sektions-H2 + statvärde; verifierad emitterad i byggd CSS
- [x] ✅ Moment 6 — Hero-stats mobil förtroenderad: delad SplitPaymentPromise (1:1-swap i statblocket) + kompakt mobilplats under CTA (lg:hidden, ordning CTA→pill→mikrocopy)
- [x] ✅ Moment 5 — Swipe-rad på mobil (case-studies + produktöversikt): scroll-snap-center, dold scrollbar (.scrollbar-none), delad `<SwipeDots>` (rAF, reduced-motion-medveten). Desktop-grid: case 2-up sm→md, produktöversikt md 3-up oförändrad
- [x] ✅ Grind: visual-rules ALL PASS (ljus+mörkt @1440, mobil @360, R3 ingen h-scroll), `pnpm build` + `tsc --noEmit` rena. Två tuningar för att passera grinden: statvärdets clamp-max 56→48px (56px lyfte 2x2-blocket 2px in i hörn-orben @1440; 1024–1280 var redan rena) och mobil flat-orb 92→68px (förtroende-pillret höjde H1 16px in i orben). Screenshots granskade i båda lägen + båda bevakningspunkter (statblock 1024–1280, case-swipe 640–767→grid 768)
- [x] ✅ Mesh-omvärdering (mobilkoll): mörkt läge på mobil, sweepen repositionerad in i övre högra hörnet (mask, ej opacity) så hero-texten läser rent; ljust läge + mörkt desktop orörda
- [x] ✅ Övriga mobilkoll-fixar (innan push): premium blogg-tabeller (nowrap belopp + `.table-scroll`, R3), anchor-emerald-CTA på blogg + /cases + case-detalj (`bg-foreground`/`bg-muted/30` utfasad), /cases hydration-mismatch (animate→whileInView) + LCP-priority på Malte Örn-bilden

### Moment 5: Swipe-kort på mobil ✅ (scroll-snap)
- CASE-KORTEN görs om till horisontellt svepbar rad på mobil (<768px):
  `scroll-snap-type: x mandatory` på containern, `scroll-snap-align: center`
  på korten. Ett kort ~85vw så nästa skymtar i kanten. Ingen JS för swipen,
  inga bibliotek.
- Inventera sajten och FÖRESLÅ vilka övriga sektioner som passar samma mönster
  (3+ likvärdiga kort i grid) — produktöversikten från fas 2 är trolig kandidat.
  Lista förslag, invänta godkännande innan ombygge.
- Dölj scrollbaren visuellt, behåll scrollbarheten. Prick-indikatorer under
  korten (ren CSS + minimal JS). Desktop: grid som tidigare.

### Moment 6: Typografisk skärpa ✅
- Uppercase-etiketter i accentgrönt ovanför VARJE sektionsrubrik — konsekvent
  sajtbrett inkl. nya produktsidor (finns delvis).
- Rubriker med clamp() för flytande skalning.
- **Stat-raden i hero** (8 000 kr / 14 dagar / 399 kr/mån / <1 sek): exakt dessa
  siffror och texter. Typografisk tyngd: talet stort (clamp 32–56px, weight
  600), etiketten liten muted ovanför, enheten mindre än talet. Count-up vid
  viewport-entry (600–900 ms, ease-out) — ÅTERANVÄND
  `components/ui/counter.tsx`. Av vid reduced-motion.
- Förtroenderaden "Betala hälften nu, resten först när du är nöjd" ska ha
  tydlig visuell plats.
- **Här omvärderas mesh-urtunningen** (70/80) mot det nya helhetsintrycket.

---

## 8. FAS 4 — Moment 7 + 8 ✅ KLAR (viewport, tillgänglighet, slutmätning)

### Moment 7: Mobilexakt viewport + tillgänglighet ✅ KLAR (mobilkoll godkänd 2026-08-05)
- Hero-höjden: redan löst i moment 1 (`100vh; 100svh;`) — RÖR EJ.
- `overflow-x: clip` på body som säkerhetsbälte.
- Safe areas: padding via `env(safe-area-inset-left/right)` på yttersta containern.
- `prefers-reduced-motion: reduce` → all parallax/drift/rotation av, reveals
  blir omedelbar opacity. Ska redan vara inbyggt per moment — verifiera
  sajtbrett här, inkl. fas 2:s ytor.
- Endast transform/opacity animeras. `will-change: transform` enbart på element
  som rör sig.

**Byggt denna session (globals.css + layout.tsx + counter.tsx):**
- ✅ `overflow-x: clip` på body i `@layer base` (`clip`, ej `hidden` — ingen
  scroll-container, rör ej scroll-anchoring). R3 passerade redan; detta är bälte.
- ✅ Safe-area-golv på inre content-containrar via **en** oskiktad regel
  `.mx-auto.px-4 { padding-inline: max(1rem, env(safe-area-inset-left/right)) }`
  scopad `<1024px` (desktop-gutters lg:px-6/8 orörda; full-bleed-bakgrunder på
  `<section>` förblir kant-till-kant). Aktiverad av `viewportFit: 'cover'` i
  layout.tsx (utan cover är `env()` = 0; headern hade redan en
  `env(safe-area-inset-top)`-toppadding som låg inert). **Mobilkoll:** liggande
  läge på notch-telefon + status-bar-zon.
- ✅ `scroll-behavior: smooth` flyttad bakom `@media (prefers-reduced-motion:
  no-preference)` (ankarhopp blir direkta vid reduced-motion; globala reset:en
  rör bara animation/transition-duration).
- ✅ Counter (case-metrics) reduced-motion-medveten: hoppar till slutvärdet, ingen
  count-up (`useSpring` gate:as ej av `MotionConfig`). *Vilande i nuläget:*
  `lib/cases.ts` har inga `stats`, så ingen räknare renderas än — korrekt men
  ej live-observerad (verifierad via kod + build).
- ✅ Verifierat reduced-motion sajtbrett: orbs (early return), mesh (gate:ad),
  reveals (MotionConfig), swipe-dots (gate:ad), scroll-behavior (nu gate:ad).
  `transition-all` finns bara i vendored `ui/*` (rör ej), neutraliseras av reset.
- **Grind:** visual-rules ALL PASS (ljus+mörkt @1440, mobil @360, R3), `pnpm
  build` + `tsc --noEmit` rena, Playwright-beteendecheck grön (viewport-fit,
  overflow-x, gutter 16px @390, scroll-behavior smooth/auto).
- ✅ **Mobilkoll godkänd** (stående + liggande på notch-telefon): allt smooth,
  ingen h-scroll, header/status-bar/home-indicator korrekta. Bekräftat att
  content-gutter använder `max()`, inte `calc()` — den bredare landskapsmarginalen
  är förväntad safe-area, ingen ändring. Följdjustering: footerns bottenrad
  (copyright + Integritetspolicy) centreras staplad på mobil (Navigation/Kontakt
  kvar vänsterställda; sm+ oförändrad). Bonus: rensat en Tailwind-CSS-varning
  (en förkortad env-toppadding-notation i denna plan skannades av Tailwind och
  gav ogiltig CSS). OBS: skriv aldrig en `prefix`-arbitrary-value-token med
  hakparentes i markdown/kommentarer, Tailwind skannar även .md och genererar
  en regel av den, malformade ger byggvarning.

### Moment 8: Slutverifiering med siffror ✅ KLAR (mätt 2026-08-05; formell Lighthouse vid deploy/Fas 6)
- Playwright-mätning: stabil 60 fps vid scroll (mobilemulering 4× CPU), hela
  sajten inkl. nya sidor. Slutkänsla ALLTID på riktig mobil + desktop.
- Ingen horisontell scroll vid 360px.
- Lighthouse mobile ≥ 90 performance, LCP < 2 s throttlad 4G, CLS < 0.05.
- visual-rules.mjs ALL RULES PASS.
- Rapportera siffror före/efter (baseline: main).

**Mätresultat (`scripts/perf-scroll.mjs`, 390px, 4× CPU-throttle, prod-build):**

| Route | fps* | LCP (ms) | CLS | h-scroll @360 |
|---|---|---|---|---|
| `/` (branch, 3 sampl.) | 44–48 | 564–1108 (brus) | **0** | ok |
| `/` (main, baseline) | 44 | 652 | **0** | ok |
| `/hemsida` (branch-ny) | 50 | 552 | **0** | ok |
| `/ai-receptionist` (branch-ny) | 51 | 540 | **0** | ok |
| `/chatbot` (branch-ny) | 58 | 1116 | **0** | ok |
| `/cases` | 56 | 1036 | **0** | ok |

- **CLS = 0** på varje route och sample (branch + main) — scroll-liv (mesh, orbs,
  reveals, swipe, counters) ger noll layout-shift. Klarar CLS < 0.05 med marginal.
- **Ingen horisontell scroll @360** på någon route, inkl. de tre nya produktsidorna.
- **LCP < 2 s** överallt. Branch-homepage brusigt (564–1108 ms över 3 samples under
  4×-throttle) men klart inom målet; den skenbara "branch > main"-LCP:n var mätbrus.
- *fps 44–58 under SwiftShader (mjukvaru-GPU) + 4× CPU headless = **pessimistisk**
  main-tråds-/relativ-signal, INTE absolut GPU-sanning (se lessons.md 2026-07).
  Long-frame-count lågt (6–15). Riktig 60 fps signad av Hugo på enhet (M1–2 +
  M7-mobilkoll).
- visual-rules.mjs ALL PASS (ljus+mörkt @1440, mobil @360, R3).
- **Formell Lighthouse mobile ≥ 90** tas på deployad prod / PageSpeed Insights i
  **Fas 6** (headless-local ger ingen representativ Lighthouse-siffra; beslutat i
  undersök-först). main saknar produktsidorna (404) → de är branch-nya, ingen
  main-baseline för dem.

---

## 9. FAS 5 — Integrationer 🔄 (OMSEKVENSERAD 2026-08-06: körs PÅ BRANCHEN före merge)

> **Nytt beslut (Hugo, efter godkänd H):** main får inte ett mellanläge. Fas 5
> körs på `feature/scroll-liv-och-diagnos` och merge sker först när de HÅRDA
> kraven är uppfyllda:
> 1. **Chatbot-embedden live** på sajten (laddas efter interaktiv; LCP om-mäts)
> 2. **Receptionist-numret live** på /ai-receptionist
> 3. **CSP flippas** Report-Only → skarp när Voiceflow-konsolen är tyst
>
> **NYTT BESLUT 2026-08-10 — guiden byggs NATIVT, inte i Voiceflow.** Alla
> frågor, svarsalternativ och utfall är fasta, alltså finns ingen AI-uppgift.
> Nativt bygge ger egen design, mörkt läge, inga externa script, ingen CSP-flipp,
> ingen tredje prenumeration, och täcks av befintliga grindar. Guide-embedden
> utgår därmed som Voiceflow-steg och blir ett eget nativt byggsteg (§9.1).
> Sanningen för frågor, logik och copy är `Fas0_produktdefinitioner.md` §5.
>
> **Merge-grind (ersätter ny full H):** kort om-verifiering på preview efter
> embedden — ny PSI (mobil / + /hemsida), tyst konsol (noll CSP-violations →
> flip:en), cta-anchors ALL PASS, formuläret skickar. Hugos förkrav för
> receptionisten (n8n/ElevenLabs, transfer-test, engelska, kunskapsbas-priser)
> byggs parallellt utanför repot.

- [ ] **Chatbot-widget:** Voiceflow-snippet på sajten. Laddas efter interaktiv —
      får inte påverka LCP. Verifiera moment 8-siffrorna igen efter inkoppling.
- [ ] **Guiden (nativt bygge, se §9.1)** — ersätter det gamla guide-embed-steget.
- [ ] **Receptionist-numret** live på AI-receptionistytan (samma som visitkorten).

      **Förkrav från `RECEPTIONIST_SYSTEMRAPPORT.md` innan numret publiceras:**
      - [ ] HMAC-härdning av post-call-webhooken (fail-closed)
      - [ ] Transfer-test ×2 i skarp miljö
      - [ ] Engelska verifierad live
      - [ ] Legacy-workflow 04 `send_call_summary` avaktiverat + testsvit grön
      - [ ] Agentens kunskapsbas uppdaterad med fas 0-produkter och priser
            (chatbot, receptionist), testsvit grön efteråt
      - [ ] Demo-inramning på `/ai-receptionist`: numret är den skarpa
            receptionisten, bokning innebär att Hugo ringer upp den tiden

Om Voiceflow-delarna inte är klara blockerar de INTE fas 6. Guiden är sedan
2026-08-10 nativ och därmed oberoende av Voiceflow.

### 9.1 Guiden "Hitta rätt lösning" — nativt bygge ✅ BYGGD (väntar på Hugos ögon + skarp mejlverifiering)

Deterministiskt frågeträd i Next.js. Ersätter interim-CTA:n i
`components/guide-section.tsx`. Ingen ny extern host, alltså ingen påverkan på
CSP-flippen. Inga nya beroenden.

**Arkitektur (godkänd av Hugo 2026-08-10):**
- `lib/guide.ts` — frågor, alternativ, ekofraser, utfallsordning, resolver.
  Ren logik utan JSX, svaren lagras som id:n (aldrig etiketter) så servern kan
  validera med `z.enum()` och HubSpot-kopplingen läser samma id:n i fas 5.
- `components/guide/` — flow, frågesteg, utfallskort, kontaktsteg.
- **Leverans via BEFINTLIG `/api/contact`** — ingen ny endpoint. Routen grenar
  på `source`; kontaktformuläret skickar inget `source` och rörs därför inte.
  Två godkända ändringar: rate limit-nyckeln blir `${ip}:${source}` (en
  guide-testare får inte bränna formulärets fem försök) och `replyTo` utelämnas
  när e-post saknas (telefonnumret hamnar i ämnesraden i stället).

**Delstatus:**
- [x] ✅ **G1. Undersök-först** — arkitekturrapport + 8 öppna frågor, alla
      besvarade av Hugo 2026-08-10 (fas 0 §5 uppdaterad i samma svep)
- [ ] **G2. Logiklager + matrisgrind** — `lib/guide.ts` + `scripts/guide-matrix.mjs`
- [x] ✅ **G3. Utfallscopy** — signerad av Hugo 2026-08-10. Allt-i-ett verbatim ur
      §5, övriga tre omskrivna ur §2–4:s Outcome-stycken. Halveringsraden är en
      femte del ENDAST i hemsideutfallet (Hugos beslut: guiden är säljögonblicket
      där priset syns först). Rad två hänger på regel-id, inte på utfall, eftersom
      rad 4 och fallbacken delar utfall men inte människa
- [x] ✅ **G4. Komponenter** — `guide-flow` (tillstånd, progress, tillbaka, fokus),
      `guide-question-step`, `guide-outcome-step`. Utfall och kontaktsteg delar
      kort enligt §5:s mall. Höjdgolvet `.guide-step-shell` är MÄTT till 26rem
- [x] ✅ **G5. Endpoint-gren** — `/api/contact` grenar på `?source=guide` (i
      query-strängen så rate limiten kan hinkas per källa FÖRE kroppen parsas).
      Formulärets gren orörd. Svaren valideras med `z.enum()` mot `lib/guide.ts`
- [x] ✅ **G6. Beteendegrind** — `scripts/guide-flow.mjs`, 294 kontroller gröna:
      CLS 0 på alla vägar, konstant stegshöjd 416px, fokusflytt vid stegbyte,
      tillbaka behåller svar, fråga 6 faller bort vid omval, fokusring 3px,
      Enter väljer. Fann höjdgolvsbuggen (402 mot 384 på desktop)

**Grind för varje G-commit** = fas 6:s stående grind (`pnpm lint` + `tsc --noEmit`
+ `pnpm build` + `visual-rules.mjs` + `cta-anchors.mjs`) plus de två nya
guide-scripten.

**Kvar innan guiden kan kallas klar:**
- [ ] **Skarp mejlverifiering på preview.** Lokalt går guide-leadet hela vägen
      genom validering och mejlrendering men fastnar på Resend med
      "API key is invalid". Kontaktformuläret failar IDENTISKT på samma server,
      alltså är den lokala nyckeln död och det är ingen regression. Att leadet
      faktiskt landar i info@phigo.se måste verifieras på preview, precis som
      formuläret verifierades i steg H.
- [ ] **Hugos ögon** på riktig mobil (guiden är ny yta, mobilkänslan är hans
      grind enligt §3).
- [ ] **Nya strängar utan fas 0-källa** som behöver Hugos ord eller ett OK:
      hjälptexten under telefon/e-post, "Jag vill inte lämna mina uppgifter nu",
      "Tack"-rubriken i bekräftelsen, "Tillbaka", samt valideringsmeddelandena.

---

## 10. FAS 6 — Audits + deploy 🔄 PÅGÅR

Ordningen är omprioriterad efter undersök-först: branchen ligger nu på en publik
preview-URL, så säkerhetssteget körs FÖRST. Skill-avvikelser (godkända): `/mindset`
och `/security-audit` finns inte installerade, de ersätts av manuell
copy-granskning mot klarspråkslistan respektive skillen `security-review`.

**Stående grind för varje audit-steg i fas 6** (utökad efter steg A:s CTA-fynd):
`pnpm lint` (0 errors) + `tsc --noEmit` + `pnpm build` + `visual-rules.mjs` ALL PASS
+ `cta-anchors.mjs` ALL PASS (färsk prod-server på :3001). Cta-anchors-grinden är
beteendeverifiering av konverteringsflödet: den mäter att besökaren faktiskt landar
på kontaktformuläret, inte bara att klicket inte kraschar.

**Delstatus (uppdateras per delsteg-commit):**
- [x] ✅ **F. Säkerhet** — `security-review` på branch-diffen (0 nya fynd) + härdning
      av fyra befintliga risker: HTML-escaping i kontaktmejlet, http(s)-only href,
      rate limit, guardad JSON-parse, HSTS, CSP i Report-Only med Voiceflow-hostar
      förberedda för fas 5
- [x] ✅ **Verktyg** — `pnpm lint` lever igen (eslint 9 + eslint-config-next 16 i flat
      config), `ignoreBuildErrors` satt till false (bygget typkollar nu på riktigt),
      kommentar på next/font-raden. Lintens 5 kvarvarande errors är agendan för steg A
- [x] ✅ **A.** `/baseline-ui` — lintens 5 errors åtgärdade + AI-slop-svep. **Viktigast:**
      verifieringen av `<a>`→`<Link>`-bytet avslöjade att plain `<a href="/#kontakt">`
      ALDRIG landade på kontaktsektionen. Träffade produktsidornas hero-CTA och
      demo-CTA (href kommer som prop, osynlig för eslint). Ny `<CtaLink>` + ny grind
      `scripts/cta-anchors.mjs` (32 kombinationer: 8 CTA × mobil/desktop × ljust/mörkt)
- [x] ✅ **B.** `/fixing-accessibility` — grunden var redan god (aria-hidden på ikoner,
      formulärfel via shadcn Form, Sheet-fokusfälla, aria-current i nav). Tillagt:
      skip-länk "Hoppa till innehållet" (header → `<main id="innehall">` på alla 6
      routes), global fokusring-golv i globals.css (3px `--ring` via `:where` så
      shadcn-ringar vinner), SwipeDots aria-current-polish. Beteendeverifierat med
      Playwright: skip-länk, fokusindikatorer, Escape/fokusretur i mobilmenyn
- [x] ✅ **C.** `/fixing-motion-performance` — kodgranskning (M8-siffrorna fanns redan).
      Rent: alla keyframes transform/opacity-only, passiva rAF-throttlade lyssnare,
      IO-baserade reveals, reduced-motion sajtbrett. Ett fynd åtgärdat: orbens
      rAF-loop stannar nu via IntersectionObserver när orben är ur viewport
      (körde tidigare hela sessionen på desktop). Playwright-verifierad:
      kör-i-vy/fryst-ur-vy/återupptas. Flaggat utan ändring: mesh-CSS-looparna
      kör off-screen (medvetet parkerat i §11), desktop-headerns backdrop-blur
      (signad M1)
- [x] ✅ **D.** `/fixing-metadata` — metadata-täckningen var redan komplett (title/
      description/canonical/OG på alla routes, generateMetadata på slug-sidor).
      Fynd 5+6: ny `lib/site-urls.ts` som ENDA URL-källa för sitemap + IndexNow
      (IndexNow saknade produktsidorna; /integritetspolicy in i båda — dess noindex
      togs bort så robots/sitemap inte motsäger varandra). Fynd 7: FAQ-datan
      utbruten till `lib/faq.ts` (stabila id:n, ikoner kvar i komponenten) och
      FAQPage-schema på /hemsida byggt från SAMMA data. Validerat lokalt: all
      JSON-LD parsad + fältkontrollerad på 9 routes, FAQ-schematext verifierad
      identisk med renderad HTML, canonical=og:url på produktsidorna
- [x] ✅ **D-tillägg.** `/seo-audit` — åtgärdat: 4 interna länkar blogg→/hemsida
      (wrappade befintliga fraser, ingen copyändring), `<ArticleHtml>` som routar
      artikel-HTML:ens interna länkar genom Next-routern (blogginläggens
      /#kontakt-CTA:er hade steg A-buggen), /blogg-titel 13→49 tecken,
      /integritetspolicy-description 67→146 tecken. Rent vid kontroll: alt-texter,
      H1 ×1/route, title/desc-längder övriga routes, lazy-loading. Väntar på Hugo:
      inga fynd berörde frusen copy. Väntar på deploy (G): Search Console,
      indexeringsstatus, riktig Rich Results-test, PSI
- [x] ✅ **E.** Copy-granskning (klarspråk, em-dash, Johnny-regeln, fas 0-spårbarhet).
      Produktsidornas copy verbatim-verifierad mot fas 0 §1–5 (priser, minutpool,
      halveringsvillkorets placering, FAQ 5/5, steg, boundaries). Inga em-dash i
      synlig text (alla träffar = kodkommentarer; en-dash endast i metadata-titlar
      och sifferintervall). 4 regelbrott fixade: "hosting"→"drift" ×2 i lib/faq.ts
      (ordlistan), "URL"→"webbadress" i formulärvalidering, utropstecken bort ur
      success-rubriken (hård regel). Flaggat utan källa (ej ändrat): guide-yttans
      fallback-rad + "Hjälp mig välja", success-statens brödtext ("omedelbart" vs
      24h-löftet), toast-utropstecknet, bloggens pedagogiska "SEO/Hosting"-
      definitioner. Väntar på Hugo: inga hero-/metatitel-avvikelser hittade
- [x] ✅ **G.** Perf mot preview (Lighthouse lokalt mot preview-URL:en; PSI-API:t
      är stängt utan nyckel — formell PSI körs i webbläsare i H). CLS 0 överallt.
      Huvudfynd: alla mobil-LCP-element var hydration-gatade framer-mount-
      animationer; Chrome exkluderar dessutom CSS-animerade-från-0-element ur
      LCP-kandidatur, så fixen krävde att HELA heron (H1, beskrivning, CTA-rad,
      chips, mobilpill, mikrocopy) gick över till CSS-entrance (M1-mönstret,
      identisk timing). Mobil före→efter: /hemsida 65→87, /chatbot 63→90,
      /ai-receptionist 69→82–86, / 53→65 (kvarvarande gap = JS-vikt, fynd 2 i
      §11-backloggen). Desktop 83–99. Hero-ytorna kräver Hugos omsignering i H.
      Console-fyndet (upgrade-insecure-requests i Report-Only) fixat
- [x] ✅ **H.** Slutgrind godkänd av Hugo 2026-08-06 mot preview: formulär (mejl
      framme, XSS-escaping verifierad), mobilkoll 7 sidor, hero-OMSIGNERING
      (CSS-entrance godkänd), footer/om-oss, CTA-stickprov, skip-länk. Formell
      PSI: / mobil 82 / desktop 99, /hemsida mobil 81 / desktop 91, CLS 0,
      SEO 100. 82 accepterat (gap = JS-vikt §11 + preview-miljö). Konsol:
      vercel.live-brus är preview-only; analytics på prod täcks av CSP
      ('self' för /_vercel/* + va.vercel-scripts.com/vitals i policyn)

**CSP-beslut (fas 5-förberedelse):** policyn skeppar som
`Content-Security-Policy-Report-Only` med `cdn.voiceflow.com`,
`general-runtime.voiceflow.com` och `*.voiceflow.com` redan tillåtna. Den flippas
till skarp `Content-Security-Policy` FÖRST när fas 5-embedden är live och konsolen
rapporterar noll överträdelser. `'unsafe-inline'` i script-src är ett medvetet val:
Next App Routers hydrerings-payload kräver det, och nonce-alternativet tvingar varje
sida dynamisk och kostar oss den statiska prerendern av samtliga 23 routes.

Deploy-sekvens (OMSEKVENSERAD 2026-08-06 — fas 5 FÖRE merge, se §9):
1. ✅ Audits F–E åtgärdade, G mätt, H godkänd av Hugo (2026-08-06)
2. Fas 5 hårda krav på branchen: chatbot-embed live + receptionist-nummer live
   + CSP flippad skarp (Voiceflow-konsolen tyst). Guide-embed = mjukt krav,
   Hugos beslut när Voiceflow-lägets status syns.
3. **Merge-grind** (kort om-verifiering på preview, INTE ny full H): ny PSI
   (mobil / + /hemsida), tyst konsol, cta-anchors ALL PASS, formuläret skickar
4. Hugo ger uttryckligt merge-klartecken → merge till main → skarp deploy
5. Skarp prod-verifiering: riktig mobil, ring receptionisten, klicka
   chatbotten/guiden, QR-koden från visitkorten, IndexNow-ping
   (INDEXNOW_SECRET finns i Production)
6. Session-handoff skrivs → frys (ingen ny funktionalitet efter detta)

---

## 10b. Vercel-läge (Fas 6, uppdateras vid behov)

- Branchen deployar till TVÅ Vercel-projekt: `v0-phigo-landing-page`
  (huvudprojekt, kopplat till phigo.se, RESEND_API_KEY på All Environments)
  och `v0-phigo-landing-page-cklb` (dubblett, tomma env-vars). All mätning
  och test sker ENBART mot huvudprojektets preview.
- **Efter lansering (fråga till Philip):** ska cklb-dubbletten arkiveras/
  raderas så vi slipper dubbla builds per push?
- `INDEXNOW_SECRET` saknas i Vercel — endpointen är fail-closed (401 utan
  variabeln), så inget kraschar, men IndexNow-ping kan inte köras förrän den
  är satt i Production. Behövs inte för preview-testerna.

## 11. Medvetet UTANFÖR planen (backlog, rörs ej)

- **JS-vikt startsidan (G-fynd 2):** en chunk bär framer + alla klientkomponenter
  (~3s script-eval under mobil-throttle; / är tyngst även på desktop). Möjlig
  åtgärd: dynamisk import av under-fold-sektioner. Efter lansering.
- **Positioneringspaketet (Hugos helhetsgranskning, ändras i ETT svep):**
  footer-taglinen + Organization-schemats description + startsidans meta
  title/description ska bära SAMMA formulering av vad PHIGO är (webbyrå vs
  allt-i-ett). Även då: footer-länkarna "Så funkar det"/"Vanliga frågor"
  (→ /hemsida#...) och /blogg-descriptionen omprövas.
- **Svarslöftet: "en arbetsdag" vs "24 timmar"** (beslutspunkt, bokförd
  2026-08-10). Guiden lovar "inom en arbetsdag" (fas 0 §5), kontaktformuläret
  "inom 24 timmar" (CLAUDE.md). Båda är låsta i sina egna källor och en besökare
  kan se båda på startsidan. Ingetdera ändras nu. Hugo tar formuleringen med
  positioneringspaketet ovan.
- **Branded 404-sida** (custom not-found.tsx med copy + CTA). Efter lansering.
- Demo-bild-generatorn (parkerad, väntar på 48h-testet)
- Written Pathway-automatisering + IRL Pathway
- Röstkloning som kundfeature (upsell)
- Blogg/SEO-innehåll, fler case, trust-bar (väntar på riktiga kundlogotyper)
- Mesh-pausfixen (endast om framtida desktop-hack uppstår)
- All polering bortom "säljbart"

---

## 12. Risker & fördefinierade beslut

| Risk | Beslut |
|---|---|
| Fas 2 sväller | Fas 0 låser scopet; en skärmhöjd/produkt som riktmärke; inga bonus-sektioner (hård regel 1) |
| Moment 4-refaktorn drar ut | Om tidsnöd: fas 2 krymper till produktöversikt på startsidan + EN produktyta (AI-receptionisten, den har demo-numret); övriga produkter blir kort med CTA |
| Voiceflow ej klar | Gäller nu bara chatbot-widgeten (fas 5 blockerar aldrig fas 6). Guiden är nativ sedan 2026-08-10 och berörs inte |
| Copy skrivs på känsla | Förbjudet (6.3) — all copy från fas 0, annars STANNA och fråga |
| Sista-kvällen-deploy | Frysen är hård: hellre en sektion mindre än trasig prod |
