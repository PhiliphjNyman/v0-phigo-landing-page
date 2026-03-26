# IMPLEMENTATIONPLAN_PHIGO.md — SEO-förbättringar

Baserad på SEO-audit genomförd 2026-03-20. Uppdaterad med djupanalys 2026-03-26.
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
- [ ] **2.6** Länka samman `Organization`, `ProfessionalService` och `WebSite` via `@id` — utan detta kan Google inte lösa upp dem som samma entitet. Ersätt med samlad JSON-LD (se audit-rapport 2026-03-26 för färdig kod)
- [ ] **2.7** Lägg till `potentialAction` / `SearchAction` på `WebSite`-schemat — förbereder för Sitelinks Search Box
- [ ] **2.8** Lägg till `mainEntityOfPage` på `Article`-schemat i `app/blogg/[slug]/page.tsx`
- [ ] **2.9** Komplettera `ProfessionalService`-schemat: lägg till `telephone`, `sameAs`, `image`, `geo` och `@id`
- [ ] **2.10** Ändra `og:type` på case-sidor från `article` till `website` — cases är portfölj, inte artiklar

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
- [ ] **4.5** Stärk E-E-A-T i "Om oss": lägg till efternamn, LinkedIn-profiler, antal år i branschen och minst en bekräftad kund — kritiskt för ett nytt varumärke utan domänauktoritet

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

## Fas 6: Tekniska förbättringar (audit 2026-03-26)

Fynd från djupanalys som inte täcktes av tidigare faser.

### Kritiskt — bilder

- [ ] **6.1** Optimera `public/images/case-cafe-alma.png` (4,3 MB → under 400 KB). Exportera som JPG quality 85, max 1600px bred. Blockerar prestanda.
- [ ] **6.2** Optimera `public/images/case-leendekliniken.png` (1,1 MB → under 300 KB). Samma exportinställningar som ovan.

### Hög — tekniska fixes

- [ ] **6.3** Lägg till security headers i `next.config.ts`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- [ ] **6.4** Lägg till `poweredByHeader: false` i `next.config.ts` — döljer att sajten kör Next.js
- [ ] **6.5** Fixa `lastmod` i `app/sitemap.ts` — sätts idag alltid till `new Date()` (dagens datum). Ersätt med statiska, innehållshärledda datum per URL för att undvika bortslösad crawl budget

### Medium — metadata och indexering

- [ ] **6.6** Lägg till `og:site_name: 'PHIGO'` i `openGraph`-objektet i `app/layout.tsx`
- [ ] **6.7** Lägg till `robots: { index: false, follow: true }` i metadata för `app/integritetspolicy/page.tsx` — integritetspolicysidor ska inte indexeras
- [ ] **6.8** Lägg till `twitter:site`-tagg i metadata när ett Twitter/X-konto finns
- [ ] **6.9** Lägg till `priority={true}` på bilder som visas above-the-fold på mobil (kontrollera i Chrome DevTools)

### Låg — finjusteringar

- [ ] **6.10** Optimera `public/og-image.png` från 134 KB till under 100 KB — OG-bilder serveras inte via Next.js bildoptimering
- [ ] **6.11** Re-exportera case-bilder som JPG istället för PNG — PNG är förlustfritt och onödigt tungt för fotografier
- [ ] **6.12** Överväg IndexNow-implementation — ger omedelbar indexnotifiering till Bing/Yandex vid nya bloggposter eller case

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
| `app/sitemap.ts` | 1.2, 6.5 | Skapa ny fil / fixa lastmod |
| `app/layout.tsx` | 2.1–2.2, 2.6–2.7, 6.6 | Schema + og:site_name |
| `app/page.tsx` | 2.3 | Lägg till FAQPage-schema |
| `app/cases/[slug]/page.tsx` | 2.4, 2.10 | BreadcrumbList + og:type |
| `app/blogg/[slug]/page.tsx` | 2.8 | mainEntityOfPage på Article-schema |
| `app/cases/page.tsx` | 3.1–3.3 | Uppdatera metadata + H1 |
| `app/integritetspolicy/page.tsx` | 6.7 | Lägg till noindex |
| `lib/cases.ts` | 3.4 | Expandera description-fälten |
| `components/footer.tsx` | 4.1 | Lägg till ortnamn |
| `next.config.ts` | 6.3–6.4 | Security headers + poweredByHeader |
| `public/images/case-cafe-alma.png` | 6.1 | Optimera 4,3 MB → <400 KB |
| `public/images/case-leendekliniken.png` | 6.2 | Optimera 1,1 MB → <300 KB |
| `public/og-image.png` | 6.10 | Optimera 134 KB → <100 KB |
