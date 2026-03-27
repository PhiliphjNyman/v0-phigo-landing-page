# Schema Markup Report — PHIGO
Generated: 2026-03-27

## Detection Results

| Sida | Schema-typ | Status | Problem |
|------|-----------|--------|---------|
| Alla sidor (layout.tsx) | Organization + LocalBusiness + ProfessionalService | ⚠️ | Redundant @type-array |
| Alla sidor (layout.tsx) | WebSite + SearchAction | ❌ | SearchAction pekar på URL utan riktig sökfunktion |
| / (homepage) | FAQPage | ❌ | Begränsad typ — gäller BARA myndigheter/sjukvård sedan aug 2023 |
| /cases/[slug] | BreadcrumbList | ✅ | OK |
| /blogg/[slug] | Article + BreadcrumbList | ✅ | OK (se not om BlogPosting) |
| /cases | Ingen | ⚠️ | Saknar BreadcrumbList |
| /blogg | Ingen | ⚠️ | Saknar BreadcrumbList |

---

## Kritiska Problem

### 1. FAQPage — BORTTAGET ❌
**Fil:** `app/page.tsx`
**Problem:** FAQPage-scheman genererar inte längre rich results för kommersiella sajter sedan Google begränsade typen i augusti 2023. Gäller numera ENBART myndigheter och sjukvårdsorganisationer. Kvarstår som ofarligt JSON-LD men bidrar inte med något.
**Åtgärd:** Tas bort. Ersätts med `Service`-schema som faktiskt kan ge synlighet för erbjudandet.

### 2. WebSite SearchAction — BORTTAGET ❌
**Fil:** `app/layout.tsx`
**Problem:** `SearchAction` pekar på `https://phigo.se/cases?q={search_term_string}` men sajten har ingen fungerande URL-baserad sökfunktion på den adressen. Felaktig markup signalerar till Google att en sökfunktion finns — vilket den inte gör.
**Åtgärd:** SearchAction tas bort från WebSite-schemat.

---

## Varningar

### 3. Redundant @type-array i Organization
**Fil:** `app/layout.tsx`
**Problem:** `"@type": ["ProfessionalService", "LocalBusiness"]` — ProfessionalService är redan en subtyp av LocalBusiness. Tekniskt giltigt men onödigt.
**Åtgärd:** Behålls som-är (ingen risk, Google hanterar det).

### 4. Saknad sameAs i Organization
**Fil:** `app/layout.tsx`
**Problem:** Inga sociala medie-URL:er i `sameAs`. Hjälper Google koppla samman entityn med externa profiler.
**Åtgärd:** Lägg till när LinkedIn/Instagram-profiler finns.

---

## Möjligheter

### 5. Service-schema — TILLAGT ✅
Erbjudandet (hemsida 8 000 kr + drift 399 kr/mån) förtjänar explicit `Service`-markup med priser. Ger Google strukturerad information om vad PHIGO säljer.

### 6. BreadcrumbList på /cases och /blogg — TILLAGDA ✅
Indexsidor saknade breadcrumb-schema. Hjälper sökresultat visa korrekt navigationsström.

### 7. BlogPosting vs Article
**Fil:** `app/blogg/[slug]/page.tsx`
Använder `Article` som är korrekt. `BlogPosting` är mer specifik subtyp — båda fungerar för rich results. Ändrad till `BlogPosting` för semantisk precision.

---

## Implementerade Ändringar

1. `app/page.tsx` — Tog bort FAQPage-schema, lade till Service-schema
2. `app/layout.tsx` — Tog bort SearchAction från WebSite
3. `app/cases/page.tsx` — Lade till BreadcrumbList
4. `app/blogg/page.tsx` — Lade till BreadcrumbList
5. `app/blogg/[slug]/page.tsx` — Ändrade Article → BlogPosting
