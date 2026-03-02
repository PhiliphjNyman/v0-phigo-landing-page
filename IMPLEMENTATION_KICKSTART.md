# PHIGO - Implementationsplan (Kickstart)

## Projektöversikt

Bygga en modern, konverteringsfokuserad B2B-landningssida för PHIGO - ett IT-konsultbolag som hjälper företag med webbdesign och webbutveckling. Hela sajten ska vara på **svenska** med dark mode som bas.

---

## 1. Nuläge - Teknisk Inventering

### Redan tillgängligt i projektet

| Kategori | Status |
|---|---|
| Next.js 16.1.6 (App Router) | Installerat |
| React 19.2.4 | Installerat |
| Tailwind CSS 4.2 | Installerat |
| shadcn/ui (full uppsättning) | Installerat |
| React Hook Form + Zod | Installerat |
| Lucide React icons | Installerat |
| next-themes (ThemeProvider) | Installerat |
| Sonner (toast) | Installerat |
| `cn()` utility | Tillgängligt |

### Behöver installeras

| Paket | Syfte |
|---|---|
| `framer-motion` | Scroll-animationer, fade-ins, subtila transitions |

### Nuvarande konfiguration

- **Font:** Geist + Geist Mono (redan konfigurerade)
- **Tema:** Default shadcn light/dark tokens (behöver uppdateras till PHIGO dark theme)
- **Layout:** Grundläggande `layout.tsx` med `lang="en"` (behöver ändras till `"sv"`)

---

## 2. Design-specifikation

### Färgpalett (Dark Mode som bas)

| Token | Syfte | Värde (ungefärligt) |
|---|---|---|
| `--background` | Huvudbakgrund | Nära svart / dark slate (~`oklch(0.13 0.01 260)`) |
| `--foreground` | Primär text | Off-white (~`oklch(0.95 0 0)`) |
| `--primary` | CTA-knappar, accenter | Mörk emerald (~`oklch(0.55 0.17 160)`) |
| `--primary-foreground` | Text på primary-element | Vit |
| `--muted` | Sekundära bakgrunder | Mörkgrå (~`oklch(0.20 0.005 260)`) |
| `--muted-foreground` | Sekundär text | Ljusgrå (~`oklch(0.65 0 0)`) |
| `--card` | Kort-bakgrund | Något ljusare än background |
| `--border` | Ramar, separatorer | Subtil grå |
| `--accent` | Hover-states, subtila highlights | Emerald-tint |

### Typografi

- **Primärt:** Inter (byta från Geist) - clean, professionell
- **Mono:** Geist Mono (behåll för eventuell teknisk text)
- **Hierarki:** Generösa storlekar i hero/sektionstitlar, `leading-relaxed` för brödtext

### Logotyp

- Textbaserad: **phi** (emerald) + **go** (ljus/vit)
- Gemener, modern känsla
- Ingen ikon

### Animationer (Framer Motion)

- **Nivå:** Medium - professionellt, inte lekigt
- Smooth fade-in + lätt slide-up vid scroll (intersection-baserat)
- Staggered animations på kort och listor
- Hover-transitions på knappar och kort
- Inga överdrivna effekter

---

## 3. Filstruktur

```
app/
  layout.tsx              # Root layout (dark mode, Inter font, metadata SEO)
  page.tsx                # Huvudsida - importerar alla sektioner
  globals.css             # PHIGO dark theme tokens

components/
  ui/                     # shadcn/ui (redan installerat, rör ej)
  phigo-logo.tsx          # PHIGO text-logotyp ("phi" + "go")
  header.tsx              # Sticky header med nav + CTA
  hero-section.tsx        # Hero med headline, CTA, visual
  trust-bar.tsx           # Social proof / trust logos
  case-studies.tsx        # 3 case-kort (placeholder-data)
  services.tsx            # 3-kolumns value proposition
  process-section.tsx     # 3-stegs process
  why-phigo.tsx           # Varför välja PHIGO
  faq-section.tsx         # FAQ med accordion
  final-cta.tsx           # Avslutande CTA-sektion
  contact-form.tsx        # Kontaktformulär (RHF + Zod)
  footer.tsx              # Footer med nav + kontaktinfo

lib/
  utils.ts                # Befintlig cn() utility
  animations.ts           # Återanvändbara Framer Motion variants
```

### Antal nya filer: ~14

Varje komponentfil håller sig under ~600 rader. Återanvändbara animation-variants bryts ut till `lib/animations.ts` för att undvika duplicering.

---

## 4. Implementationsordning (Steg för steg)

### Steg 1: Grundkonfiguration

**Filer som påverkas:**
- `app/globals.css` - Ny dark mode emerald-tema
- `app/layout.tsx` - Byt font till Inter, `lang="sv"`, metadata, ThemeProvider (forcerad dark)
- `package.json` - Lägg till `framer-motion`

**Åtgärder:**
1. Uppdatera alla CSS-tokens i `globals.css` till PHIGO:s dark emerald-palett
2. Byt font från Geist till Inter i `layout.tsx`
3. Sätt `lang="sv"` på `<html>`
4. Uppdatera metadata (title, description) till svenska SEO-optimerade texter
5. Wrappa body i ThemeProvider med `forcedTheme="dark"`
6. Skapa `lib/animations.ts` med återanvändbara Framer Motion variants

### Steg 2: Layout-komponenter (Header + Footer)

**Nya filer:**
- `components/phigo-logo.tsx`
- `components/header.tsx`
- `components/footer.tsx`

**Åtgärder:**
1. Skapa PHIGO textlogotyp-komponent (phi=emerald, go=ljus)
2. Sticky header med glassmorphism-effekt, navigation, primär CTA-knapp
3. Mobil hamburger-meny (Sheet-komponent)
4. Footer med logotyp, beskrivning, navigation, kontaktinfo, copyright

### Steg 3: Hero-sektionen

**Nya filer:**
- `components/hero-section.tsx`

**Åtgärder:**
1. Stor headline: "PHIGO bygger webbplatser som konverterar."
2. Subheadline med stödjande text
3. Primär CTA-knapp (emerald, prominent)
4. Microcopy: "Tar 30 sekunder - Ingen forpliktelse"
5. Sekundär CTA: "Se vara case"
6. Abstrakt tech-visual (CSS-baserad geometrisk/grid-effekt i bakgrunden)
7. Fade-in animationer

### Steg 4: Trust Bar + Case Studies

**Nya filer:**
- `components/trust-bar.tsx`
- `components/case-studies.tsx`

**Åtgärder:**
1. Trust bar med placeholder-logotyper (stiliserade textlogos) och trust statement
2. 3 case-kort med:
   - Genererad mockup-bild (via GenerateImage)
   - Realistiska företagsnamn (Nordic Consulting, Storberg E-handel, etc.)
   - Projektbeskrivning
   - Resultatmetrik
   - "Se case" CTA
3. Sektionsetikett: "Exempel pa leveranser"
4. Sektionsrubrik: "Utvalda projekt fran PHIGO"

### Steg 5: Services + Process

**Nya filer:**
- `components/services.tsx`
- `components/process-section.tsx`

**Åtgärder:**
1. 3-kolumns grid med ikoner (Lucide):
   - "Konverteringsfokuserad design"
   - "Snabb och modern teknik"
   - "Enkelt att underhalla"
2. 3-stegs process med visuell tidslinje/steg-indikator:
   - Analys & strategi
   - Design & utveckling
   - Lansering & optimering

### Steg 6: Why PHIGO + FAQ

**Nya filer:**
- `components/why-phigo.tsx`
- `components/faq-section.tsx`

**Åtgärder:**
1. Overtalande sektion med bullet points:
   - Snabba leveranser
   - Modern tech stack
   - Fokus pa affarsresultat
   - Personlig kontakt
2. FAQ med shadcn Accordion (4-5 fragor):
   - Hur lang tid tar ett projekt?
   - Vad kostar en webbplats?
   - Erbjuder ni support efter lansering?
   - Hur ser processen ut?
   - Kan ni hjalpa med befintlig sajt?

### Steg 7: Final CTA + Kontaktformular

**Nya filer:**
- `components/final-cta.tsx`
- `components/contact-form.tsx`

**Åtgärder:**
1. High-contrast CTA-sektion med emerald-bakgrund
2. Headline: "Redo att se vad er hemsida kan prestera?"
3. Kontaktformular med React Hook Form + Zod:
   - Namn, Foretag, E-post, Hemsida (valfri)
   - Dropdown: "Vad vill ni forbattra?"
   - Meddelande (textarea)
   - Validering pa svenska
   - Success-state (Sonner toast)

### Steg 8: Sammansattning + Bilder

**Filer som paverkas:**
- `app/page.tsx` - Importera och komponera alla sektioner

**Åtgärder:**
1. Importera alla sektions-komponenter i ratt ordning
2. Generera case study mockup-bilder med GenerateImage
3. Generera hero visual/bakgrundseffekt om behovs
4. Sista finslipning av spacing och responsivitet

---

## 5. Sektionsordning pa sidan

```
1. Header (sticky)
2. Hero Section
3. Trust Bar
4. Case Studies
5. Services / Value Proposition
6. Process
7. Why PHIGO
8. FAQ
9. Final CTA
10. Contact Form
11. Footer
```

---

## 6. CTA-strategi

| Plats | CTA-text | Typ |
|---|---|---|
| Header | "Fa en kostnadsfri webbplatsanalys" | Knapp (emerald) |
| Hero | "Fa en kostnadsfri webbplatsanalys" | Stor knapp (emerald) |
| Hero | "Se vara case" | Sekundar (outline/ghost) |
| Case cards | "Se case" | Textlank |
| Final CTA | "Fa en kostnadsfri webbplatsanalys" | Stor knapp (emerald) |

Alla primara CTA:er scrollar till kontaktformuläret (`#kontakt`).

---

## 7. Responsiv strategi

| Breakpoint | Layout |
|---|---|
| Mobile (<768px) | Single column, hamburger nav, stackade kort |
| Tablet (768-1024px) | 2-kolumns grid for case/services |
| Desktop (>1024px) | Full layout, 3-kolumns grid, side-by-side sections |

---

## 8. Tillganglighet (a11y)

- Semantisk HTML (`main`, `header`, `footer`, `section`, `nav`)
- ARIA-labels pa alla interaktiva element
- `sr-only` text for skärmlasare
- Tangentbordsnavigering i header, formulär, accordion
- Alt-text pa alla bilder
- Fokus-indikatorer (ring)
- Kontrastkvot >= 4.5:1 for all text

---

## 9. Metadata & SEO

```tsx
title: "PHIGO | Webbplatser som konverterar"
description: "PHIGO bygger moderna, snabba och konverteringsfokuserade webbplatser for B2B-foretag. Fa en kostnadsfri webbplatsanalys idag."
lang: "sv"
```

---

## 10. Risker & Utmaningar

| Risk | Hantering |
|---|---|
| Case-bilder ser generiska ut | Anvand GenerateImage med specifika prompts for realistiska mockups |
| Dark mode kontrast | Testa alla tokens noggrant, saker pa WCAG AA |
| Framer Motion bundle size | Importera bara anvanda moduler, lazy-load om mojligt |
| Formularet saknar backend | Visa success-state lokalt, backend kan läggas till senare |
| Emerald-farg kan bli enformig | Anvand nyanser + muted variants for djup |

---

## 11. Definition of Done

- [ ] Alla 10 sektioner implementerade och responsiva
- [ ] Dark mode emerald-tema genomgaende
- [ ] Alla texter pa svenska
- [ ] Framer Motion-animationer vid scroll
- [ ] Kontaktformular med validering
- [ ] Sticky header med mobil-meny
- [ ] Genererade case-mockup-bilder
- [ ] Tillganglighet testad (semantik, ARIA, kontrast)
- [ ] Production-ready kod utan debug-statements
