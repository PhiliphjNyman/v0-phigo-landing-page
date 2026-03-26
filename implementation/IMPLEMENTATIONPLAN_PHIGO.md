# IMPLEMENTATIONPLAN_PHIGO.md — SEO-förbättringar

Baserad på SEO-audit genomförd 2026-03-20.
Prioritetsordning: Kritiskt → Hög → Medium → Långsiktig.

---

## Fas 1: Kritiska tekniska fixes (gör idag)

Dessa blockar Googles förmåga att indexera sajten korrekt.

- [x] **1.1** Skapa `app/robots.ts` — genererar `/robots.txt` med sitemap-referens
- [x] **1.2** Skapa `app/sitemap.ts` — genererar `/sitemap.xml` med alla sidor (/, /cases, /cases/[slug])
- [x] **1.3** Verifiera www → non-www 301-redirect i Vercel-dashboarden (Project → Settings → Domains)
- [x] **1.4** Lägg till sitemap-URL i Google Search Console efter deploy

---

## Fas 2: Strukturerad data / Schema (hög impact)

Ger Google tydliga signaler om verksamheten + möjlighet till rich results i sökresultaten.

- [x] **2.1** Lägg till `Organization`-schema i `app/layout.tsx` (namn, URL, logotyp, kontakt)
- [x] **2.2** Lägg till `WebSite`-schema i `app/layout.tsx` (sitelinks searchbox-signal)
- [x] **2.3** Lägg till `FAQPage`-schema på startsidan baserat på FAQ-sektionens frågor och svar
- [x] **2.4** Lägg till `BreadcrumbList`-schema på `/cases/[slug]`-sidorna
- [x] **2.5** Validera samtliga scheman via [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Fas 3: On-page SEO-förbättringar (medium impact)

Förbättrar befintliga sidors relevans för sökfrågor.

- [x] **3.1** Uppdatera `/cases`-sidans title: `"Hemsidor vi byggt – Exempel | PHIGO"`
- [x] **3.2** Uppdatera `/cases`-sidans H1: `"Hemsidor vi har byggt"` (eller liknande)
- [x] **3.3** Uppdatera `/cases`-sidans meta description med sökordsfokus och CTA
- [x] **3.4** Expandera `description`-fältet i `lib/cases.ts` för alla tre case till 400–600 ord vardera
- [x] **3.5** Överväg mer sökordsrika titlar på case-detaljsidor (bransch + stad)

---

## Fas 4: Lokal SEO och E-E-A-T (medium impact)

Bygger trovärdighet och synlighet för lokala sökningar.

- [x] **4.1** Lägg till ortnamn (Linköping) i footer-text och eventuellt hero-subtext
- [x] **4.2** Lägg till `LocalBusiness`- eller `ProfessionalService`-schema med adress/kontaktuppgifter
- [x] **4.3** Skapa/gör anspråk på Google Business Profile för PHIGO
- [x] **4.4** Lägg till ett "Om oss"-avsnitt eller -sida med grundarnas namn, foto och plats

---

## Fas 5: Innehållsstrategi (långsiktig organisk tillväxt)

Kräver riktiga kundcase och/eller ny innehållsproduktion.

- [ ] **5.1** Ersätt minst ett konceptcase med ett riktigt kundcase (med tillstånd)
- [ ] **5.2** Planera 4–6 blogginlägg som svarar på sökfrågor:
  - "Vad kostar en hemsida för småföretag?"
  - "Hemsida för elektriker / frisör / tandläkare"
  - "Varför syns inte mitt företag på Google?"
- [x] **5.3** Skapa `app/blogg/[slug]/page.tsx` + sitemap-integration när bloggen startas

---

## Verifiering efter Fas 1–2

Markera inte faserna som klara utan att:

- [x] `pnpm build` kompilerar utan fel
- [x] `/robots.txt` är åtkomlig i webbläsaren med korrekt innehåll
- [x] `/sitemap.xml` är åtkomlig och listar alla sidor
- [ ] Google Rich Results Test godkänner schema-implementationen
- [x] Sitemap är inlagd i Google Search Console

---

## Snabbreferens: Filer som berörs

| Fil | Fas | Åtgärd |
|---|---|---|
| `app/robots.ts` | 1.1 | Skapa ny fil |
| `app/sitemap.ts` | 1.2 | Skapa ny fil |
| `app/layout.tsx` | 2.1–2.2 | Lägg till JSON-LD schema |
| `app/page.tsx` | 2.3 | Lägg till FAQPage-schema |
| `app/cases/[slug]/page.tsx` | 2.4 | Lägg till BreadcrumbList-schema |
| `app/cases/page.tsx` | 3.1–3.3 | Uppdatera metadata + H1 |
| `lib/cases.ts` | 3.4 | Expandera description-fälten |
| `components/footer.tsx` | 4.1 | Lägg till ortnamn |
| `app/layout.tsx` | 4.2 | LocalBusiness-schema |
