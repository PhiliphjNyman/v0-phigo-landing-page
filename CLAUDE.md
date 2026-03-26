# CLAUDE.md — PHIGO Webbplats (Next.js)

## Vem vi är

PHIGO bygger moderna, konverteringsoptimerade hemsidor åt lokala småföretag. Detta projekt är **PHIGOs egen hemsida** — den ska demonstrera vår kompetens och fungera som primärt säljverktyg. Kvalitetskravet är maximalt: varje detalj ska utstråla premium.

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

| Del | Detalj |
|---|---|
| **Hemsida** | 8 000 kr (engång) — single-page, mobilanpassad, konverteringsstruktur |
| **Drift** | 399 kr/mån — hosting, säkerhet, backup, mindre ändringar |
| **Admin-system** | Tillägg (pris ges i samtal) — enkel redigering av texter/bilder |
| **Leveranstid** | 14 dagar |

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
| Tema | next-themes (forcerad dark mode) |
| Toast | Sonner |
| Pakethanterare | pnpm |

> **OBS:** Denna stack gäller PHIGOs EGEN sajt. Kundhemsidor byggs ALLTID i vanilla HTML/CSS/JS — aldrig React, Next.js eller Tailwind.

---

## Projektstruktur

```
app/
  layout.tsx              # Root layout (dark mode, Inter, SEO metadata)
  page.tsx                # Huvudsida — importerar alla sektioner
  globals.css             # PHIGO dark emerald-tema tokens
  cases/
    page.tsx              # Case index med filter
    [slug]/page.tsx       # Case-detaljsida

components/
  ui/                     # shadcn/ui (rör ej)
  phigo-logo.tsx          # Textlogotyp: "phi" (emerald) + "go" (ljus)
  header.tsx              # Sticky header + mobilmeny
  hero-section.tsx        # Hero med CTA
  trust-bar.tsx           # Social proof / trust logos
  case-studies.tsx        # Case-kort (data från lib/cases.ts)
  offer-section.tsx       # Erbjudande (ersätter gamla services.tsx)
  process-section.tsx     # 3-stegs process
  why-phigo.tsx           # Varför PHIGO
  faq-section.tsx         # FAQ accordion
  final-cta.tsx           # Avslutande CTA
  contact-form.tsx        # Kontaktformulär
  footer.tsx              # Footer

lib/
  utils.ts                # cn() utility
  animations.ts           # Återanvändbara Framer Motion variants
  cases.ts                # Case-data (single source of truth)

brand_assets/
  icon.svg                # Favicon — P-logotyp (emerald på dark slate)
  PHIGO_fullzize_screenshot.png  # Fullstorlek screenshot (används som källa för OG-bild)

public/
  og-image.png            # OG-bild 1200×630 (croppat från brand_assets/PHIGO_fullzize_screenshot.png)
```

---

## Sajtstruktur (sektionsordning)

1. **Hero** — Problem + löfte + CTA
2. **Cases** — Exempel med story-format (behåll, social proof)
3. **Erbjudande** — Outcome → mechanism → differentiator → boundaries → pris (ersätter gamla "Värdeerbjudande")
4. **Process** — Tre steg: lär känna → bygger → går live
5. **Varför PHIGO** — Förtroendepunkter i klarspråk
6. **FAQ** — Vanliga frågor med tydliga svar och priser
7. **CTA + Kontaktformulär** — Formulär via React Hook Form

> **TA BORT:** Logotyp-karusellen med fiktiva företagsnamn (NordicTech, Storberg etc.). Skapar misstroende. Antingen riktiga kunder eller inget.

---

## Designfilosofi

### Övergripande

Sajten ska kännas som en 50 000 kr-leverans. Det som skiljer premium från mall är typografi, luft, konsekvent spacing, genomtänkta hover-states och mjuka animationer. Tonen är **Apple/Stripe** — aldrig lekfull.

### Färgpalett (Dark Mode)

| Token | Syfte | Beskrivning |
|---|---|---|
| `--background` | Huvudbakgrund | Nära svart / dark slate |
| `--foreground` | Primär text | Off-white |
| `--primary` | CTA, accenter | Mörk emerald |
| `--muted` | Sekundära ytor | Mörkgrå |
| `--muted-foreground` | Sekundär text | Ljusgrå |
| `--card` | Kort-bakgrund | Något ljusare än background |
| `--border` | Ramar | Subtil grå |
| `--accent` | Hover, highlights | Emerald-tint |

**Accentfärger per sektion:**
- Case Studies: Warm Gold / Amber
- Process: Cool Teal / Cyan
- Hero/CTA: Vivid Emerald

### Typografi

- **Rubriker**: Inter med tight tracking (`-0.03em`) på stora rubriker.
- **Brödtext**: Inter med `leading-relaxed`.
- **Mono**: Geist Mono (eventuell teknisk text).
- Aldrig Arial, Roboto, eller system-ui som synligt val.

### Logotyp

Textbaserad: **phi** (emerald) + **go** (ljus/vit). Gemener, modern känsla. Ingen ikon.

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
- **Nav-text:** Exempel | Erbjudande | Så funkar det | Vanliga frågor (INTE "Case | Tjänster | Process | FAQ")

### Hero
- **Rubrik:** "Din hemsida borde ge dig kunder — inte bara finnas."
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

### Erbjudande (ersätter gamla Services)
- Sektionsrubrik: "En hemsida som ger dig fler kunder"
- Visar offer-strukturen: outcome → mechanism (3 steg) → differentiator → boundaries → pris
- Priskortet med 8 000 kr + 399 kr/mån tydligt synligt
- CTA: "Se vad din hemsida missar — kostnadsfritt"

### Process
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

### FAQ
- shadcn Accordion med mjuka layout-transitions.
- Frågor och svar på svenska, i klarspråk:
  1. Vad kostar en hemsida? (visa priser tydligt)
  2. Hur lång tid tar det? (14 dagar)
  3. Vad händer efter lansering? (drift ingår)
  4. Fungerar sajten på mobilen? (ja)
  5. Hittar folk mig på Google? (ja, utan att säga "SEO")
  6. Kan jag uppdatera sajten själv? (tillägg, inte inkluderat)
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
- **Knapp:** "Skicka din sajt — vi visar vad du missar"

### Footer
- Mörk bakgrund.
- Logotyp, beskrivning, navigation, kontaktinfo, copyright.
- **Beskrivning:** "Vi bygger hemsidor som ger lokala företag fler kunder. Fast pris, klart inom 14 dagar."
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
| Hero (primär) | "Se vad din hemsida missar — kostnadsfritt" | Stor knapp (emerald) |
| Hero (sekundär) | "Se exempel" | Ghost/outline |
| Case-kort | "Se case" | Textlänk |
| Erbjudande | "Se vad din hemsida missar — kostnadsfritt" | Stor knapp (emerald) |
| Avslutande CTA | "Skicka din sajt — vi visar vad du missar" | Stor knapp (emerald) |

Alla primära CTA:er scrollar till `#kontakt`.

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
