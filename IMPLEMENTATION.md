IMPLEMENTATION.md

# IMPLEMENTATION.md — PHIGO: Samlad implementationsplan

## Nuläge

Landningssidan är byggd och fungerande med Next.js 16, Tailwind 4, shadcn/ui och Framer Motion. Följande sektioner finns och är i gott skick:

- Header (sticky, mobilmeny)
- Hero (headline, CTA:er, tech-visual)
- Trust Bar
- Case Studies (3 statiska kort)
- Services (3-kolumns grid)
- Process (3 steg)
- Why PHIGO
- FAQ (accordion)
- Final CTA
- Kontaktformulär
- Footer

**Grunden är bra — inget av ovanstående behöver byggas om.** Planen nedan beskriver vad som återstår för att sajten ska vara komplett och redo för lansering.

---

## Fas 1: Case-system (routing + data)

**Mål:** Case-sidor med egen routing, centraliserad data, och koppling till startsidan.

### 1.1 Skapa `lib/cases.ts`

Single source of truth för all case-data. Varje case har:

```ts
type Case = {
  slug: string              // "nordic-consulting"
  title: string             // "Nordic Consulting"
  industry: string          // "B2B konsulttjänster"
  summary: string           // Kort (1–2 meningar)
  description: string       // Längre beskrivning
  services: string[]        // ["UX/UI", "Performance", "SEO"]
  metrics: { label: string; value: string }[]
  year?: string
  image?: string
  featured: boolean
}
```

**Placeholder-case:**
1. **Nordic Consulting** — B2B konsulttjänster — +68% Fler leads
2. **Storberg E-handel** — E-handel — -40% Snabbare laddtid
3. **Avenio Fastigheter** — Lokalt tjänsteföretag — +120% Besökare

**Hjälpfunktioner:**
- `getCases()` — returnerar alla case
- `getCaseBySlug(slug)` — returnerar ett case eller `null`
- `getRelatedCases(slug, limit)` — relaterade case baserat på bransch

### 1.2 Uppdatera startsidans case-sektion

- Importera data från `lib/cases.ts` istället för hårdkodade värden.
- Gör hela kortet klickbart med `next/link` till `/cases/[slug]`.
- Behåll befintlig design och hover-states.

### 1.3 Skapa `/cases` (indexsida)

**Fil:** `app/cases/page.tsx`

- H1: "Case" + subtext: "Exempel på leveranser från PHIGO".
- Client-side filter-knappar: Alla / B2B / E-handel / Lokalt.
- Grid med case-kort (samma stil som startsidan).
- Botten-CTA som länkar till `/#kontakt`.
- Statisk metadata: `"Case | PHIGO"`.

### 1.4 Skapa `/cases/[slug]` (detaljsida)

**Fil:** `app/cases/[slug]/page.tsx`

Layout uppifrån och ner:
1. Breadcrumb: Case → {Titel}
2. Industry badge
3. H1 + summary + description
4. "Vad vi gjorde" — lista av services
5. "Resultat" — metric-kort med animerade siffror
6. Relaterade case (2 st)
7. CTA: "Vill du ha liknande resultat?" → `/#kontakt`
8. Back-link: "← Tillbaka till alla case"

**Edge case:** Om slug inte matchar → 404-liknande vy med länk tillbaka.

**Dynamisk metadata:** `"{Title} – Case | PHIGO"`.

### 1.5 Kontaktankare

Säkerställ att kontaktformulärets sektion på startsidan har `id="kontakt"` så att `/cases/[slug]`-sidornas CTA:er kan länka till `/#kontakt`.

---

## Fas 2: Visuell polish

**Mål:** Lyfta sajten från "bra" till "premium" med riktade förbättringar. Inget nytt innehåll — bara bättre interaktivitet och känsla.

### 2.1 Scroll-triggered counters

- Skapa en återanvändbar `AnimatedCounter`-komponent.
- Använd Framer Motion + IntersectionObserver.
- Applicera på alla numeriska metrics: case-kort (+68%, -40%, +120%), trust bar-siffror, och process-steg.
- Countern ska räkna upp från 0 till slutvärdet när elementet scrollas in i viewport.

### 2.2 Scroll-spy i navigation

- Uppdatera headern så att aktiv nav-länk indikeras baserat på vilken sektion som syns i viewport.
- Subtil underline eller färgförändring — inte överdrivet.
- Använd IntersectionObserver, inte scroll-event-lyssnare.

### 2.3 Case-kort hover-effekter

- Vid hover på desktop: visa en subtil overlay med förstärkt CTA.
- Lyft-effekt (`translateY(-4px)`) + förstärkt shadow.
- Smooth transition (`0.25s ease`).

### 2.4 Process-pipeline

- Lägg till visuella linjer/kopplingar mellan steg 01 → 02 → 03.
- Animera linjerna vid scroll (fylls successivt).
- Siffror (01, 02, 03) animeras i skala/färg vid viewport entry.

### 2.5 FAQ accordion-polish

- Mjuka height-transitions vid expand/collapse.
- Subtil border-animation på aktiv fråga.
- Smooth rotate på chevron-ikon.

### 2.6 Hero-visual förbättring

- Subtil parallax på bakgrundselement (grid/blobs) vid scroll.
- Eventuellt: mouse-tracking tilt-effekt på den centrala visualen (subtilt, max ±3°).

---

## Fas 3: Slutpolish

**Mål:** Säkerställ att allt är tight, tillgängligt och redo för lansering.

### 3.1 Responsivitets-pass

Gå igenom varje sektion på 3 breakpoints (mobil, tablet, desktop) och fixa:
- Stackning som inte fungerar
- Text som blir för liten/stor
- Knappar som inte är tappable (minst 44×44px touch target)
- Bilder som skalar konstigt

### 3.2 Tillgänglighets-pass

- Alla interaktiva element har `focus-visible`-state.
- `aria-label` på ikoner utan synlig text.
- Formulärfält har kopplade `<label>`-element.
- Tangentbordsnavigering fungerar i header, mobilmeny, accordion, formulär.
- Kontrastkvot ≥ 4.5:1 på all text.

### 3.3 Prestanda-pass

- Kontrollera att `pnpm build` går igenom utan fel.
- Inga oanvända imports eller dependencies.
- Bilder har explicit `width`/`height` (undvik layout shift).
- `loading="lazy"` på bilder under fold.

### 3.4 SEO & metadata

- `lang="sv"` på `<html>`.
- `og:title`, `og:description`, `og:image` på alla sidor.
- Dynamisk metadata på case-detaljsidor.
- Favicon satt.

---

## Ordning att ge Claude Code

Kör i denna ordning. Slutför varje fas innan nästa påbörjas.

```
Fas 1.1 → 1.2 → 1.3 → 1.4 → 1.5
Fas 2.1 → 2.2 → 2.3 → 2.4 → 2.5 → 2.6
Fas 3.1 → 3.2 → 3.3 → 3.4
```

Varje steg bör testas lokalt med `pnpm dev` och kontrolleras visuellt innan nästa steg påbörjas.

---

## Vad som INTE ingår i denna plan

Följande är medvetna avgränsningar:

- **Kontaktformulär-backend** — formuläret visar success-state lokalt. Backend (API-route, e-postintegration) läggs till separat.
- **Riktiga case-bilder** — placeholder-bilder används tills riktiga leveranser finns.
- **Bloggsida** — inte prioriterad i nuläget.
- **Analytics-dashboard** — Vercel Analytics finns i dependencies men konfigureras vid deploy.
- **Confetti/celebration-effekter** — skippad, inte premium B2B-känsla.
- **Infinite marquee på trust bar** — riskerar att kännas billigt.
- **Morphing SVG-former** — svårt att få premium, sparas eventuellt till senare.