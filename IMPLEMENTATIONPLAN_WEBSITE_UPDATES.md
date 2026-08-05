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
| 2 | Produktombyggnad | Produktsidor, navigering, guide-yta | 🔄 PÅGÅR (delstatus i §6) |
| 3 | Moment 5 + 6 | Swipe-kort + typografisk skärpa (sajtbrett inkl. nya sidor) | ⬜ |
| 4 | Moment 7 + 8 | Viewport/a11y + slutmätning | ⬜ |
| 5 | Integrationer | Chatbot-widget, guide-embed, receptionist-nummer | ⬜ |
| 6 | Audits + deploy | Skills-audits, push-OK, prod-verifiering | ⬜ |

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

## 6. FAS 2 — Produktombyggnad 🔄 PÅGÅR

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

## 7. FAS 3 — Moment 5 + 6 ⬜ EJ PÅBÖRJAD (appliceras sajtbrett INKL. fas 2:s nya ytor)

### Moment 5: Swipe-kort på mobil ⬜ (scroll-snap)
- CASE-KORTEN görs om till horisontellt svepbar rad på mobil (<768px):
  `scroll-snap-type: x mandatory` på containern, `scroll-snap-align: center`
  på korten. Ett kort ~85vw så nästa skymtar i kanten. Ingen JS för swipen,
  inga bibliotek.
- Inventera sajten och FÖRESLÅ vilka övriga sektioner som passar samma mönster
  (3+ likvärdiga kort i grid) — produktöversikten från fas 2 är trolig kandidat.
  Lista förslag, invänta godkännande innan ombygge.
- Dölj scrollbaren visuellt, behåll scrollbarheten. Prick-indikatorer under
  korten (ren CSS + minimal JS). Desktop: grid som tidigare.

### Moment 6: Typografisk skärpa ⬜
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

## 8. FAS 4 — Moment 7 + 8 ⬜ EJ PÅBÖRJAD (viewport, tillgänglighet, slutmätning)

### Moment 7: Mobilexakt viewport + tillgänglighet ⬜
- Hero-höjden: redan löst i moment 1 (`100vh; 100svh;`) — RÖR EJ.
- `overflow-x: clip` på body som säkerhetsbälte.
- Safe areas: padding via `env(safe-area-inset-left/right)` på yttersta containern.
- `prefers-reduced-motion: reduce` → all parallax/drift/rotation av, reveals
  blir omedelbar opacity. Ska redan vara inbyggt per moment — verifiera
  sajtbrett här, inkl. fas 2:s ytor.
- Endast transform/opacity animeras. `will-change: transform` enbart på element
  som rör sig.

### Moment 8: Slutverifiering med siffror ⬜
- Playwright-mätning: stabil 60 fps vid scroll (mobilemulering 4× CPU), hela
  sajten inkl. nya sidor. Slutkänsla ALLTID på riktig mobil + desktop.
- Ingen horisontell scroll vid 360px.
- Lighthouse mobile ≥ 90 performance, LCP < 2 s throttlad 4G, CLS < 0.05.
- visual-rules.mjs ALL RULES PASS.
- Rapportera siffror före/efter (baseline: main).

---

## 9. FAS 5 — Integrationer ⬜ EJ PÅBÖRJAD (körs när respektive del finns)

- [ ] **Chatbot-widget:** Voiceflow-snippet på sajten. Laddas efter interaktiv —
      får inte påverka LCP. Verifiera moment 8-siffrorna igen efter inkoppling.
- [ ] **Guide-embed:** Voiceflow-flödet in i guide-ytan (fas 2). Utfall enligt
      Johnny-regeln; svar + kontaktuppgifter → HubSpot som lead med valen ifyllda.
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

Om Voiceflow-delarna inte är klara blockerar de INTE fas 6 — guide-ytan skeppar
med telefon/mejl-CTA och embedden görs i efterhand (femminutersjobb).

---

## 10. FAS 6 — Audits + deploy ⬜ EJ PÅBÖRJAD

Efter moment 8, FÖRE push (ordning enligt CLAUDE.md):
1. `/baseline-ui` — AI-slop, spacing, typografi
2. `/fixing-accessibility` — tangentbord, aria, fokus
3. `/fixing-motion-performance` — animationsprestanda
4. `/fixing-metadata` — SEO, OG, favicon
5. `/mindset` — ALL ny copy från fas 2 (produkttexter, guide-utfall, CTA:er)
6. `/security-audit` — nya ytor: Voiceflow-embed, HubSpot-lead-flöde, formulär

Deploy-sekvens:
1. Alla grindar gröna + audits åtgärdade
2. Hugo ger uttryckligt push-OK → push → deploy (Vercel)
3. Skarp prod-verifiering: riktig mobil, ring receptionisten, klicka guiden,
   QR-koden från visitkorten
4. Session-handoff skrivs → frys (ingen ny funktionalitet efter detta)

---

## 11. Medvetet UTANFÖR planen (backlog, rörs ej)

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
| Voiceflow ej klar | Guide-ytan skeppar med telefon/mejl-CTA; embed i efterhand (fas 5 blockerar aldrig fas 6) |
| Copy skrivs på känsla | Förbjudet (6.3) — all copy från fas 0, annars STANNA och fråga |
| Sista-kvällen-deploy | Frysen är hård: hellre en sektion mindre än trasig prod |
