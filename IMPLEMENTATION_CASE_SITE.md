# Kravspecifikation: PHIGO Case-upplevelse

## Övergripande krav
- **Teknik**: Next.js App Router + TypeScript.
- **Språk**: All synlig text på svenska.
- **Design**: Dark mode-first (matcha befintlig design).
- **Struktur**: Kompakt filstruktur, max ~600 rader per fil.
- **Navigation**: Använd `next/link`.
- **Mål**: Ökad trovärdighet, tydligare navigering och konverteringsflöde (CTA).

## 1. Filstruktur
- `lib/cases.ts`: Single source of truth för all case-data.
- `app/cases/page.tsx`: Index-lista med filter.
- `app/cases/[slug]/page.tsx`: Detaljsida för specifika case.
- Uppdatering av startsidans case-sektion för att länka till detaljsidorna.

## 2. Case-data (lib/cases.ts)
Varje case ska innehålla:
- `slug`: Unik identifierare.
- `title`: Titel.
- `industry`: Bransch (B2B konsulttjänster, E-handel, Lokalt tjänsteföretag).
- `summary`: Kort sammanfattning.
- `description`: Längre beskrivning.
- `services`: Array av tjänster (t.ex. UX/UI, Performance).
- `metrics`: Array av objekt `{ label: string; value: string }`.
- `year`: Valfritt.
- `image`: Valfritt.
- `featured`: Boolean.

**Placeholder cases**:
1. **Nordic Consulting**: `nordic-consulting`, B2B konsulttjänster, +68% Fler leads.
2. **Storberg E-handel**: `storberg-ehandel`, E-handel, -40% Snabbare laddtid.
3. **Avenio Fastigheter**: `avenio-fastigheter`, Lokalt tjänsteföretag, +120% Besökare.

**Hjälpfunktioner**:
- `getCases()`: Returnerar alla case.
- `getCaseBySlug(slug)`: Returnerar ett case eller null.
- `getRelatedCases(slug, limit)`: Returnerar relaterade case baserat på bransch.

## 3. Startsida
- Rendera kort baserat på data från `lib/cases.ts`.
- Gör hela kortet klickbart med länk till `/cases/[slug]`.
- Bibehåll befintlig design med tydliga hover-states.

## 4. Cases Indexsida (/cases)
- **Header**: H1 "Case", subtext "Exempel på leveranser från PHIGO".
- **Filter**: Client-side filter för branscher (Alla, B2B, E-handel, Lokalt).
- **Grid**: Visar case-kort som matchar valt filter.
- **CTA**: Botten-sektion som länkar till `/#kontakt`.

## 5. Case-detaljsida (/cases/[slug])
- **Layout**: Breadcrumb, Industry badge, H1, Summary + Description.
- **Tjänster**: "Vad vi gjorde" sektion.
- **Resultat**: "Resultat" sektion med metric-kort.
- **Relaterade case**: Visa 2 relaterade projekt.
- **CTA**: "Vill du ha liknande resultat?" -> `/#kontakt`.
- **Back-link**: "← Tillbaka" till `/cases`.
- **Edge cases**: Hantera "Case hittades inte" med 404-liknande vy.

## 6. SEO & Metadata
- Dynamisk metadata för detaljsidor (Titel: "{Title} – Case | PHIGO").
- Statisk metadata för indexsidan.

## 7. Kontaktankare
- Säkerställ att kontaktformuläret på startsidan har `id="kontakt"`.

## 8. Kvalitetskrav
- Inga onödiga filer.
- Inga nya tunga dependencies.
- Tailwind/shadcn-ui styling.
- Ska fungera för pnpm build.
