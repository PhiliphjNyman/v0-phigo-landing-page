# CLAUDE.md — PHIGO Webbplats (Next.js)

## Vem vi är

PHIGO bygger moderna, konverteringsoptimerade hemsidor åt lokala småföretag. Detta projekt är **PHIGOs egen hemsida** — den ska demonstrera vår kompetens och fungera som primärt säljverktyg. Kvalitetskravet är maximalt: varje detalj ska utstråla premium.

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
  services.tsx            # Tjänste-grid
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
```

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

### Hero
- Stor headline, subheadline, primär + sekundär CTA.
- Abstrakt tech-visual (CSS/SVG-baserad).
- Staggerad entrance-animation.

### Case Studies
- Data från `lib/cases.ts` — aldrig hårdkodade i komponenten.
- Klickbara kort som länkar till `/cases/[slug]`.
- Hover: overlay med kort info och framträdande CTA.
- Animerade metric-räknare vid scroll.

### Services
- 3-kolumns grid med Lucide-ikoner.
- Kort med layered shadows och hover-lyft.

### Process
- 3 steg med visuell tidslinje/pipeline.
- Animerade steg-nummer vid viewport entry.

### FAQ
- shadcn Accordion med mjuka layout-transitions.
- 4–5 frågor på svenska.

### Kontaktformulär
- React Hook Form + Zod.
- Fält: Namn, Företag, E-post, Hemsida (valfri), Dropdown, Meddelande.
- Validering på svenska.
- Success-state via Sonner toast.
- `id="kontakt"` på sektionen.

### Footer
- Mörk bakgrund.
- Logotyp, beskrivning, navigation, kontaktinfo, copyright.
- Dynamiskt copyrightår.

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
- Startsida: `"PHIGO | Webbplatser som konverterar"`.
- Case-sidor: `"{Title} – Case | PHIGO"`.
- `og:title`, `og:description`, `og:image` för sociala delningar.

---

## Språk och Kodstandard

- **Dokumentation och prompts**: Svenska.
- **All kod**: Engelska — variabelnamn, CSS-klasser, kommentarer, commit-meddelanden.
- **Synlig text**: Svenska (rubriker, brödtext, CTA, formulärlabels).
- Ton: professionell men varm. "Vi" istället för "PHIGO" i löpande text.
- Inga utropstecken i rubriker.
- CTA-text direkt och tydlig: "Boka tid", "Kontakta oss", "Se våra case".

---

## CTA-strategi

| Plats | Text | Typ |
|---|---|---|
| Header | "Få en kostnadsfri webbplatsanalys" | Knapp (emerald) |
| Hero (primär) | "Få en kostnadsfri webbplatsanalys" | Stor knapp (emerald) |
| Hero (sekundär) | "Se våra case" | Ghost/outline |
| Case-kort | "Se case" | Textlänk |
| Final CTA | "Få en kostnadsfri webbplatsanalys" | Stor knapp (emerald) |

Alla primära CTA:er scrollar till `#kontakt`.

---

## Git-workflow

- **Pusha INTE till GitHub** utan att först köra allt lokalt och få godkännande.
- Kör `pnpm dev` för lokal utveckling.
- Testa med `pnpm build` innan push.
- `/clear` i Claude Code för varje ny session (spara tokens).

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