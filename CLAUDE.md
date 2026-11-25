# CLAUDE.md — PHIGO Webbplats (Next.js)

## Vem vi är

PHIGO bygger moderna, konverteringsoptimerade hemsidor åt lokala småföretag, plus AI-receptionist och chatbot. Detta projekt är **PHIGOs egen hemsida** — den ska demonstrera vår kompetens och fungera som primärt säljverktyg. Kvalitetskravet är maximalt: varje detalj ska utstråla premium.

> **Bygger du en kundsida?** Läs `PLAYBOOK_kundsidor.md` — samlade lärdomar från den här sajten, översatta till kundbyggen (vanilla HTML/CSS/JS).

---

## Sessionsrutiner

### Vid start av varje session
1. Kör `/clear` för fräsch kontext och tokenbesparingar
2. Läs denna fil (`CLAUDE.md`)
3. Läs `lessons.md` — undvik att upprepa misstag
4. Fråga Hugo eller Philip om oklarheter innan du börjar koda

### Vid avslut av varje session
1. Uppdatera `lessons.md` om korrigeringar gjordes
2. Kort sammanfattning av vad som gjordes och vad som återstår
3. Pusha INTE om jag inte sagt det

---

## Erbjudande & Affärskontext

### Nuvarande offer (detta ska sajten sälja)

Tre produkter, var och en med egen sida (uppdaterat 2026-11-25). Priser exkl. moms;
källan för all kundvänd copy är `Fas0_produktdefinitioner.md`.

| Del | Detalj |
|---|---|
| **Hemsida** (`/hemsida`) | 8 000 kr (engång) — mobilanpassad, konverteringsstruktur. Betala hälften vid start, resten när du är nöjd |
| **Drift** | 399 kr/mån — hosting, säkerhet, backup, support, mindre ändringar, månadsrapport |
| **AI-receptionist** (`/ai-receptionist`) | 7 000 kr uppsättning + 1 495 kr/mån (300 minuter ingår) |
| **Chatbot** (`/chatbot`) | 4 000 kr uppsättning + 695 kr/mån |
| **Paket** | Hemsida + chatbot *från* 10 995 kr + 995 kr/mån; allt-i-ett *från* 14 995 kr + 2 295 kr/mån. Ordet "från" är obligatoriskt |
| **Admin-system / tillägg** | Inget fast pris — prissätts i förväg efter avstämning |
| **Leveranstid** | Hemsida live inom 14 dagar |

### Offer-strukturen (varje erbjudande följer detta ramverk)

1. **Outcome** — Vad kunden får: "Gå från en sajt som ingen agerar på till en som genererar bokningar varje vecka"
2. **Mechanism** — Hur det händer (max 3 steg): Analysera → Bygga → Drifta
3. **Differentiator** — Varför det fungerar: "De flesta hemsidor behandlar alla besökare likadant — vi bygger ett konverteringsflöde"
4. **Boundaries** — Vad det är och inte är: "Fixar konvertering, bygger inte om hela din marknadsföring"
5. **Price** — Tydligt: 8 000 kr + 399 kr/mån

### Målgrupp

Lokala, etablerade småföretag med bevisad verksamhet men låg digital mognad. Tandläkare, elektriker, frisörer, caféer, hantverkare. De tänker INTE på sig själva som "B2B-företag" — de tänker "jag driver en tandklinik."

---

## Tech Stack

| Kategori | Verktyg |
|---|---|
| Framework | Next.js 16 (App Router) |
| Språk | TypeScript |
| Styling | Tailwind CSS 4 + shadcn/ui (new-york) |
| Animationer | Framer Motion |
| Formulär | React Hook Form + Zod |
| Ikoner | Lucide React |
| Tema | next-themes (ljust + mörkt läge, ljust som standard) |
| Toast | Sonner |
| Pakethanterare | pnpm |
| Chatt | ElevenLabs ConvAI-widget (`@elevenlabs/convai-widget-embed`, version pinnad i `components/chat-widget.tsx`) |
| Säkerhetsheaders | CSP i `next.config` — tillåter ElevenLabs (https + wss) och Vercel-skript |

> **OBS:** Denna stack gäller PHIGOs EGEN sajt. Kundhemsidor byggs ALLTID i vanilla HTML/CSS/JS — aldrig React, Next.js eller Tailwind.

---

## Projektstruktur

```
app/
  layout.tsx              # Root layout (next-themes, Inter, SEO metadata, chattwidget)
  page.tsx                # Startsidan — översikt över alla tre produkter
  globals.css             # Tema-tokens: ljus palett i :root, mörk emerald i .dark
  hemsida/                # Produktsida hemsida (erbjudande, process, FAQ + FAQPage JSON-LD)
  ai-receptionist/        # Produktsida AI-receptionist (ring och prova, pris)
  chatbot/                # Produktsida chatbot (testa chatten, pris)
  cases/
    page.tsx              # Case index med filter
    [slug]/page.tsx       # Case-detaljsida
  blogg/
    page.tsx              # Bloggindex
    [slug]/page.tsx       # Blogginlägg-detaljsida (BlogPosting JSON-LD)
  integritetspolicy/      # Integritetspolicy
  api/contact/route.ts    # Kontaktformulärets backend
  api/indexnow/route.ts   # IndexNow-ping vid publicering
  robots.ts, sitemap.ts

components/
  ui/                     # shadcn/ui (rör ej)
  phigo-logo.tsx          # Textlogotyp: PHI (emerald) + GO (text-foreground)
  header.tsx              # Sticky header + mobilmeny
  theme-toggle.tsx        # Ljust/mörkt läge
  hero-section.tsx        # Hero med CTA (+ hero-mesh/hero-orb)
  product-overview.tsx    # Startsidans "Tjänster" — kort till de tre produktsidorna
  guide-section.tsx       # "Hitta rätt lösning" (guide/*, logik i lib/guide.ts)
  guide/                  # guide-flow, guide-question-step, guide-outcome-step
  product-hero.tsx        # Hero på produktsidorna
  product/                # Byggblock för produktsidor (benefits, steps, price, faq, demo-cta …)
  ai-receptionist-content.tsx, chatbot-content.tsx  # Innehåll per produktsida
  case-studies.tsx        # Case-kort (data från lib/cases.ts)
  offer-section.tsx       # Erbjudande (på /hemsida)
  process-section.tsx     # 3-stegs process (på /hemsida)
  why-phigo.tsx           # Varför PHIGO
  about-section.tsx       # Om oss (#om-oss)
  faq-section.tsx         # FAQ accordion (data från lib/faq.ts)
  final-cta.tsx           # Avslutande CTA
  contact-form.tsx        # Kontaktformulär (#kontakt)
  chat-widget.tsx         # ElevenLabs-chatten (laddas efter interaktivitet, påverkar inte LCP)
  section-eyebrow.tsx, cta-link.tsx, split-payment-promise.tsx, page-background.tsx
  footer.tsx              # Footer

lib/
  utils.ts                # cn() utility
  animations.ts           # Återanvändbara Framer Motion variants
  cases.ts                # Case-data (single source of truth)
  faq.ts                  # FAQ-data + FAQPage-schema (single source of truth)
  guide.ts                # Guidens logiklager
  blog.ts                 # Blogginlägg
  site-urls.ts            # Kanoniska URL:er

scripts/                  # Kontrollskript: cta-anchors, guide-flow, guide-matrix,
                          # visual-rules, perf-scroll, generate-favicons

brand_assets/             # brand kit (BRAND.md, palette.png, logo/, archive/, scripts/)
  BRAND.md                # källa till sanning för färg, typografi, logga
  logo/                   # ordbild + logomärke (P) + profil/avatar-varianter
  archive/                # utfasade assets (gammal icon.svg, screenshot, konceptlogga)

# Favicon/app-ikon: app/icon.png + app/apple-icon.png (P-symbolen, mint #02b77f)

public/
  og-image.jpg            # OG-bild 1200×630 (croppat från brand_assets/archive/PHIGO_fullzize_screenshot.png)
```

> **Borttaget:** trust-bar.tsx (kund-logotyp-karusell) togs bort i städningen — endast backlog tills riktiga kundlogotyper finns.

---

## Sajtstruktur (sektionsordning)

Sajten har en startsida plus en sida per produkt (uppdaterat 2026-11-25).

**Startsidan (`/`):**
1. **Hero** — Problem + löfte + CTA
2. **Tjänster** (`ProductOverview`) — kort till Hemsida, AI-receptionist och Chatbot
3. **Hitta rätt lösning** (`GuideSection`) — kort guide som pekar på rätt produkt
4. **Exempel** (`CaseStudies`) — case i story-format (social proof)
5. **Varför PHIGO** — Förtroendepunkter i klarspråk
6. **Om oss** (`#om-oss`)
7. **Avslutande CTA + Kontaktformulär** (`#kontakt`)

**`/hemsida`:** ProductHero → Erbjudande (outcome → mechanism → differentiator → boundaries → pris) → Process (`#process`) → FAQ (`#faq`, med FAQPage JSON-LD) → Avslutande CTA.

**`/ai-receptionist` och `/chatbot`:** ProductHero (primär CTA "Ring och prova själv" resp. "Testa chatten", sekundär "Se pris") → fördelar, steg, gränser, pris (`#pris`), demo (`#demo`), FAQ.

> **TA BORT:** Logotyp-karusellen med fiktiva företagsnamn (NordicTech, Storberg etc.). Skapar misstroende. Antingen riktiga kunder eller inget.

---

## Designfilosofi

### Övergripande

Sajten ska kännas som en 50 000 kr-leverans. Det som skiljer premium från mall är typografi, luft, konsekvent spacing, genomtänkta hover-states och mjuka animationer. Tonen är **Apple/Stripe** — aldrig lekfull.

### Färgpalett (Ljust + Mörkt läge)

Sajten har två lägen. Ljust läge är standard: vita/ljusgrå ytor, mörk text, grönt enbart som accent. Mörkt läge behåller den gröna emerald-atmosfären (hue 160 genom hela ytsystemet). --primary (emerald-accenten) är identisk i båda lägena — endast ytfärgerna (--background, --card, --muted, --border, text) skiljer sig.

| Token | Syfte | Ljust läge | Mörkt läge |
|---|---|---|---|
| `--background` | Huvudbakgrund | Vit/ljusgrå | Nära svart |
| `--foreground` | Primär text | Mörk grå | Off-white |
| `--primary` | CTA, accenter | Mörk emerald (samma) | Mörk emerald (samma) |
| `--muted` | Sekundära ytor | Ljusgrå | Mörkgrå |
| `--muted-foreground` | Sekundär text | Mörkgrå | Ljusgrå |
| `--card` | Kort-bakgrund | Vit lätt upphöjd | Något ljusare än background |
| `--border` | Ramar | Subtil ljusgrå | Subtil mörkgrå |
| `--accent` | Hover, highlights | Emerald-tint | Emerald-tint |

> **Tema-tokens:** `:root` innehåller den ljusa paletten (standardläget) — neutrala vita/grå ytor, inte den gröna tonen översatt till ljust. `.dark` innehåller den mörka emerald-paletten. `--primary` är identisk i båda.

**Accentfärger per sektion:**
- Case Studies: Warm Gold / Amber
- Process: Cool Teal / Cyan
- Hero/CTA: Vivid Emerald

Dessa finns som namngivna tokens per läge i `:root`/`.dark`: `--accent-cases` (amber), `--accent-process` (cyan), `--accent-hero` (emerald). De måste klara WCAG AA mot vit bakgrund i ljust läge.

### Typografi

- **Rubriker**: Inter med tight tracking (`-0.03em`) på stora rubriker.
- **Brödtext**: Inter med `leading-relaxed`.
- **Mono**: Geist Mono (eventuell teknisk text).
- Aldrig Arial, Roboto, eller system-ui som synligt val.

### Logotyp

Textbaserad: **PHI** (emerald) + **GO** (`text-foreground`: mörk i ljust läge, ljus i mörkt läge). Versaler, modern känsla. Ingen ikon.

---

## Animationer (Framer Motion)

- **Nivå**: Medium — professionellt, aldrig lekigt.
- Smooth fade-in + lätt slide-up vid scroll (intersection-baserat).
- Staggered animations på kort och listor.
- Hover-transitions på knappar och kort.
- Använd `spring` transitions, inte `linear`.
- Animera **bara** `transform` och `opacity`. Aldrig layout-properties.
- Respektera `prefers-reduced-motion: reduce`.
- Återanvändbara variants definieras i `lib/animations.ts`.

---

## Interaktiva States — Obligatoriska

Varje klickbart element ska ha:

| State | Effekt |
|---|---|
| `:hover` | Färgshift, lyft, underline-animation |
| `focus-visible` | Synlig ring (3px, accentfärg) |
| `:active` | Press-effekt (`scale(0.98)`) |

Inga undantag.

---

## Komponentkrav

### Navbar
- Sticky med glassmorphism-effekt.
- Logo vänster, nav-länkar center, CTA höger.
- Mobil: hamburger → Sheet-komponent med scroll-lock.
- Scroll-spy: aktiv indikator på nav-länk baserat på viewport-position.
- **Nav-text:** Hemsida | AI-Receptionist | Chatbot | Exempel | Blogg (sidlänkar, aktiv markering per route). CTA "Se vad din hemsida missar".

### Hero
- **Rubrik:** "Din hemsida borde ge dig kunder. Inte bara finnas."
- **Undertext:** "Vi bygger hemsidor åt lokala företag som faktiskt gör att folk tar kontakt. Fast pris, live inom 14 dagar."
- Primär + sekundär CTA.
- Abstrakt tech-visual (CSS/SVG-baserad).
- Staggerad entrance-animation.

### Case Studies
- Data från `lib/cases.ts` — aldrig hårdkodade i komponenten.
- Klickbara kort som länkar till `/cases/[slug]`.
- Hover: overlay med kort info och framträdande CTA.
- Animerade metric-räknare vid scroll.
- **Case-beskrivningar i story-format:** "[Typ av företag] som hade [problem]. Vi byggde [lösning] som resulterade i [resultat]."
- **Märk tydligt som "Konceptcase" eller "Demo"** tills riktiga kundprojekt finns.

### Erbjudande (på `/hemsida`)
- Sektionsrubrik: "En hemsida som ger dig fler kunder"
- Visar offer-strukturen: outcome → mechanism (3 steg) → differentiator → boundaries → pris
- Priskortet med 8 000 kr + 399 kr/mån tydligt synligt
- CTA: "Se vad din hemsida missar, kostnadsfritt"

### Process (på `/hemsida#process`)
- **Rubrik:** "Din nya hemsida på 14 dagar"
- 3 steg med visuell tidslinje/pipeline.
- Steg 1: "Vi lär känna ditt företag"
- Steg 2: "Vi bygger din sajt"
- Steg 3: "Din sajt går live"
- Animerade steg-nummer vid viewport entry.

### Varför PHIGO
- **Rubrik:** "Därför väljer företagare oss"
- 4 punkter i klarspråk (inga tekniska begrepp):
  1. "Byggd för att ge dig kunder" — inte bara snygg design
  2. "Fast pris, inga överraskningar" — 8 000 kr + 399 kr/mån
  3. "Snabb och säker" — laddar på under en sekund, funkar på mobilen
  4. "Du pratar med den som bygger" — ingen mellanhand

### FAQ (på `/hemsida#faq`)
- shadcn Accordion med mjuka layout-transitions.
- Data i `lib/faq.ts` — samma källa för accordionen och FAQPage JSON-LD. Ändra aldrig en befintlig frågas nyckel.
- Frågor och svar på svenska, i klarspråk:
  1. Vad kostar en hemsida? (visa priser tydligt)
  2. Hur lång tid tar det? (14 dagar)
  3. Vad händer efter att sajten är live? (drift ingår)
  4. Fungerar sajten på mobilen? (ja)
  5. Hittar folk mig på Google? (ja, utan att säga "SEO")
  6. Behöver du ändra texter och bilder själv? (tillägg, inte inkluderat)
  7. Kan jag köpa bara hemsidan utan månadsavtal? (ja, men nudga mot drift)

### Kontaktformulär
- React Hook Form + Zod.
- **Rubrik:** "Låt oss titta på din hemsida"
- **Undertext:** "Fyll i så återkommer vi inom 24 timmar med en granskning och konkreta förslag."
- Fält: Namn, Företag, E-post, Hemsida (valfri), Dropdown, Meddelande.
- Validering på svenska.
- Success-state via Sonner toast.
- `id="kontakt"` på sektionen.

### Avslutande CTA
- **Rubrik:** "Vill du veta var din hemsida tappar kunder?"
- **Undertext:** "Vi granskar din sajt och visar konkret vad som kan förbättras — kostnadsfritt och utan förpliktelse."
- **Knapp:** "Skicka din sajt, vi visar vad du missar"

### Footer
- Mörk bakgrund.
- Logotyp, beskrivning, navigation, kontaktinfo, copyright.
- **Beskrivning:** "Vi bygger hemsidor som ger lokala företag fler kunder. Baserade i Linköping, klart inom 14 dagar."
- **Navigation:** Exempel, Hemsida, AI-Receptionist, Chatbot, Blogg, Så funkar det, Om oss, Vanliga frågor, Kontakt.
- Dynamiskt copyrightår.

---

## Klarspråk — Ordlista

All kundvänd text på sajten ska följa denna ordlista. Om ett begrepp finns i vänsterkolumnen, använd högerkolumnen.

| Säg aldrig på sajten | Säg istället |
|---|---|
| SEO / sökmotoroptimering | Syns i Google när folk söker |
| Mobilanpassad / responsiv | Funkar perfekt på mobilen |
| CTA / call-to-action | Tydliga knappar som gör det lätt att ta kontakt |
| Konverteringsoptimerad | Byggd för att besökare ska ta kontakt |
| Tech stack / Next.js / Edge Computing | Snabb och säker teknik (eller nämn inte alls) |
| UX / användbarhet | Enkel att använda / lätt att hitta rätt |
| Lighthouse 100 | Laddar på under en sekund |
| Headless CMS | Du kan ändra texter och bilder själv |
| A/B-testning | Vi testar vad som fungerar bäst |
| B2B-företag | Lokala företag / företagare |
| Social proof | Omdömen och bevis från nöjda kunder |
| Hosting | Vi ser till att sajten alltid är uppe och fungerar |
| MRR / ARPU / churn | Aldrig — internt språk, inte kundspråk |

> **Tumregel:** Om din mamma inte förstår meningen, skriv om den.

---

## Spacing och Rytm

- Section-padding: minst `py-24` desktop, `py-16` mobil.
- Varannan sektion med subtil bakgrundston — aldrig mer än två identiska bakgrunder i rad.
- Max content-bredd: `max-w-7xl` centrerat.
- Kortgap: minst `gap-6`, `gap-8` på desktop.
- Konsekvent spacing-system — bestäm tokens tidigt.

---

## Djup och Ytor

- Layered shadows, aldrig platt `shadow-md`.
- Tinta shadows med primärfärgen vid låg opacity.
- Hover på kort: `translateY(-4px)` + förstärkt shadow.
- Ytor ska ha ett layering-system: base → elevated → floating.

---

## Responsivitet

| Breakpoint | Layout |
|---|---|
| Mobile (<768px) | Single column, hamburger, stackade kort |
| Tablet (768–1024px) | 2-kolumns grid |
| Desktop (>1024px) | Full layout, 3-kolumns grid |

---

## Tillgänglighet

- Semantisk HTML (`main`, `header`, `footer`, `section`, `nav`).
- `aria-label` på alla interaktiva element utan text.
- `sr-only` text för skärmläsare.
- Tangentbordsnavigering i header, formulär, accordion.
- Alt-text på alla bilder.
- Fokus-indikatorer (ring).
- Kontrastkvot ≥ 4.5:1 på all text (WCAG AA).

---

## SEO & Metadata

- `lang="sv"` på `<html>`.
- Dynamisk metadata per sida.
- Startsida: `"PHIGO | Hemsidor som ger dig fler kunder"`.
- Case-sidor: `"{Title} – Case | PHIGO"`.
- `og:title`, `og:description`, `og:image` för sociala delningar.

---

## Språk och Kodstandard

- **Dokumentation och prompts**: Svenska.
- **All kod**: Engelska — variabelnamn, CSS-klasser, kommentarer, commit-meddelanden.
- **Synlig text**: Svenska (rubriker, brödtext, CTA, formulärlabels).
- Ton: professionell men varm. "Vi" istället för "PHIGO" i löpande text.
- Inga utropstecken i rubriker.

---

## CTA-strategi

| Plats | Text | Typ |
|---|---|---|
| Header | "Se vad din hemsida missar" | Knapp (emerald) |
| Hero (primär) | "Se vad din hemsida missar, kostnadsfritt" | Stor knapp (emerald) |
| Hero (sekundär) | "Se exempel" | Ghost/outline |
| Case-kort | "Se case" | Textlänk |
| Erbjudande / `/hemsida`-hero | "Se vad din hemsida missar, kostnadsfritt" | Stor knapp (emerald) |
| Avslutande CTA | "Skicka din sajt, vi visar vad du missar" | Stor knapp (emerald) |
| `/ai-receptionist` | "Ring och prova själv" (+ "Se pris") | Stor knapp → `#demo` |
| `/chatbot` | "Testa chatten" (+ "Se pris") | Stor knapp → `#demo`, öppnar widgeten |

Hemsidans primära CTA:er går till `/#kontakt`. Produktsidornas primära CTA leder till demon.

---

## Skills (Claude Code)

Kör audit-skills i denna ordning efter varje större förändring:
1. `/baseline-ui` — rensar AI-slop, spacing, typografi
2. `/fixing-accessibility` — tangentbord, aria, fokus
3. `/fixing-motion-performance` — animationsprestanda
4. `/fixing-metadata` — SEO, OG-tags, favicon

`/frontend-design` aktiveras automatiskt vid nya builds — kör aldrig manuellt.

---

## Git-workflow

- **Pusha INTE till GitHub** utan att först köra allt lokalt och få godkännande.
- Kör `pnpm dev` för lokal utveckling.
- Testa med `pnpm build` innan push.
- `/clear` i Claude Code för varje ny session.

---

## Verifikation innan "klar"

> **Döda zombie-/stale dev-servrar före verifiering.** En kvarvarande `next`-process kan servera en gammal build på port 3000 och ge missvisande testresultat (kod som ser trasig ut men inte är det). Innan du startar `pnpm dev` eller verifierar något: säkerställ att ingen gammal server lever på porten. På Windows/Git Bash, döda kvarvarande Node/next-processer först (t.ex. via `taskkill` eller `Get-NetTCPConnection -LocalPort 3000 ... | Stop-Process`), och starta sedan en färsk server. Verifiera alltid mot en nystartad build — aldrig mot en redan körande instans av oklar ålder. (Se lessons.md: "Verifiera mot en FÄRSK server".)

Markera aldrig en uppgift som klar utan att:
- Sajten laddas korrekt i `pnpm dev`
- Mobilvy testad (Chrome DevTools → responsiv)
- Alla formulär fungerar och validerar
- Inga console errors
- `pnpm build` kompilerar utan errors
- Alla bilder har alt-text
- Meta-tags (title, description, OG) är korrekta
- Klarspråk-ordlistan följd — inga tekniska begrepp i synlig text

---

## Hårda Regler

1. **Lägg inte till sektioner eller features som inte finns i briefingen.** Inga "bonus"-sektioner.
2. **Ändra aldrig språk** om det inte specifikt efterfrågas.
3. **Inga nya tunga dependencies** utan godkännande.
4. **Aldrig `transition-all`** — specificera exakt vilka properties.
5. **Aldrig default Tailwind-färger** (indigo-500, blue-600) som primärfärg.
6. **Max ~600 rader per fil.** Bryt ut till separata komponenter vid behov.
7. **Case-data i `lib/cases.ts`** — aldrig hårdkodad i komponenter.
8. **Varje ändring ska testas lokalt** innan commit.
9. **När du tvekar, välj det lugnare alternativet.** Premium = återhållsamhet + precision.
10. **Sajten ska fungera som portfolio-case.** Om den inte är bra nog att visa för en potentiell kund, är den inte klar.
11. **Aldrig fiktiva företagsnamn som riktiga kunder.** Märk demos som "Konceptcase".
12. **Aldrig tekniska begrepp i kundvänd text.** Följ ordlistan.
13. **Aldrig pris på tilläggstjänster i FAQ.** Baspris visas, tillägg beskrivs utan siffra.
14. **Grönt = accent, aldrig yta i ljust läge.** I ljust läge får emerald endast användas på accenter (knappar, logotyp, länkar, fokusringar, ikoner) — aldrig som bakgrunds- eller yttton. I mörkt läge behålls den gröna yttonen (hue 160) i ytsystemet. `--primary` är samma i båda lägena.
15. **Inga em-dash (—) i synlig text.** Hårda tankebrott → punkt och ny mening; lätta pauser → komma. Em-dash (och en-dash – använd som paus) läses som "AI-skrivet" och ska undvikas i all kundvänd copy. Undantag: en-dash i sifferintervall (8 000–15 000 kr, Dag 1–3) och som titelseparator i metadata (`Titel – PHIGO`).
16. **Alltid pnpm, aldrig npm/yarn.** Projektets pakethanterare är pnpm (`pnpm-lock.yaml`). Installera med `pnpm add` / `pnpm add -D`, kör verktyg med `pnpm exec`, scripts med `pnpm <script>`. `npm install` kraschar på pnpms symlänkade `node_modules` ("Cannot read properties of null (reading 'matches')") och skapar en konkurrerande `package-lock.json`. Blanda aldrig in npm.

---

## Sessionsrutin

Vid start, läs `lessons.md` och relevant plan, fråga om något är oklart. Vid slut, uppdatera `lessons.md` med eventuella misstag (vad, varför, och en regel som förhindrar upprepning), uppdatera plan-checkboxar, och sammanfatta vad som gjordes. Verifiera alltid att något fungerar innan det markeras klart — anta aldrig.
