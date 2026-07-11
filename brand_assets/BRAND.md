# PHIGO — Brand Kit

Källa till sanning för PHIGOs visuella identitet, extraherad direkt ur kodbasen
(`app/globals.css`, `components/phigo-logo.tsx`, logofilerna i `public/brand/`).
Använd detta när du bygger mallar för sociala medier i Figma/Canva.

> Alla hex-värden nedan är genererade från OKLCH-tokens i `app/globals.css` eller
> samplade ur logofilerna. Se `palette.png` för en visuell översikt att hålla
> bredvid Figma. Kör om via skripten i `scripts/`.

---

## 1. Färgpalett

### Varumärkesfärger (kärnan)

> **🔒 Tvåfärgslogik för grönt — två kontexter (beslutat 2026-07-11):**
>
> **Sajt (phigo.se):** `#008d4d` är `--primary` i **båda** lägena (ljust och mörkt) —
> ordbildens PHI, CTA-knappar, länkar, fokusringar, ikoner. **Denna regel rör vi inte.**
> Mint används på sajten bara i logomärket (P-symbolen), inte som knapp-/textaccent.
>
> **Sociala medier / mörk platta:** `#02b77f` (mint) är accentfärgen för **nyckelord,
> siffror och CTA-text** mot den mörka plattan. Det matchar logomärkets färg och ger
> bättre lyster på mörk bakgrund än den mörkare `#008d4d`.
>
> Den gamla serif-favicon-gröna `#2a9e6a` är pensionerad (ligger i `archive/`).

| Namn | Hex | Roll | Källa |
|---|---|---|---|
| **PHIGO Green** | `#008d4d` | **Sajt:** `--primary` i båda lägena (PHI, CTA, länkar, fokus, ikoner). | `--primary` oklch(0.55 0.17 160) = logo-grönt `#008d4d` |
| **PHIGO Mint** | `#02b77f` | Logomärket (P). **Sociala mörka plattor:** accent för nyckelord, siffror, CTA-text. | `app/icon.png` (P-symbolen) |
| **GO dark** | `#161616` | "GO" i loggan på ljus bakgrund (= primär text). | `--foreground` (ljust) / logo-light PNG |
| **GO light** | `#eeeeee` | "GO" i loggan på mörk bakgrund. | `--foreground` (mörkt) / logo PNG |

> **Regel:** Grönt är **accent, aldrig yta i ljust läge.** I ljust läge får `#008d4d`
> endast användas på nyckelord, knappar, logotyp, länkar, fokusringar och ikoner,
> aldrig som bakgrund eller stor yta. I mörkt läge bär ytsystemet en grön ton
> (hue 160); sajtens `--primary`-accent är fortfarande `#008d4d`, medan logomärket
> använder mint `#02b77f` mot den mörka ytan.

### Ljust läge — ytor & text (standardläget)

| Token | Hex | Roll | Användningsregel |
|---|---|---|---|
| `--background` | `#f8f8f8` | Huvudbakgrund | Sidans basyta |
| `--card` | `#ffffff` | Kort, upphöjda ytor | Innehållskort |
| `--muted` | `#ebebeb` | Sekundär band-yta | Varannan sektion, subtil ton |
| `--secondary` | `#f4f4f4` | Sekundär yta | Knappytor, chips |
| `--border` | `#e5e5e5` | Ramar, hårlinjer | 1px kanter |
| `--foreground` | `#161616` | Primär text | Rubriker, brödtext |
| `--muted-foreground` | `#636363` | Sekundär text | Undertext, metadata |

### Mörkt läge — ytor & text (grön emerald-atmosfär)

| Token | Hex | Roll |
|---|---|---|
| `--background` | `#000903` | Huvudbakgrund (nära svart, grön ton) |
| `--card` | `#031109` | Kort |
| `--muted` | `#0c1912` | Sekundär band-yta |
| `--secondary` | `#111e17` | Sekundär yta |
| `--border` | `#18251e` | Ramar |
| `--foreground` | `#eeeeee` | Primär text |
| `--muted-foreground` | `#8f8f8f` | Sekundär text |

### Sektionsaccenter

Varje sektion har en egen accent. Ljust läge använder mörkare värden (klarar WCAG
AA mot vitt); mörkt läge använder de ljusare `*-500`-varianterna.

| Sektion | Ljust läge | Mörkt läge | Roll |
|---|---|---|---|
| Hero / CTA | `#00824e` (emerald) | `#00bc7d` | `--accent-hero` |
| Case studies | `#aa5910` (amber) | `#fe9a00` | `--accent-cases` |
| Process | `#00739c` (teal) | `#00b8db` | `--accent-process` |
| Hover/tint | `#def5e8` | `#0a3723` | `--accent` — subtil highlight-yta |

### Emerald anchor (avslutande CTA-platta)

Djup, lagrad emerald-gradient som förankrar sidans botten. **Fast i både ljust och
mörkt läge** (byter inte med tema). Detta är den bästa "mörka plattan" att återanvända
i sociala medier-mallar.

| Stopp | Hex | Roll |
|---|---|---|
| Linjär 0% | `#00190c` | Djupast |
| Linjär 55% | `#002e17` | Mitten |
| Linjär 100% | `#00210f` | Botten |
| Radiell glow (top-left) | `#004726` | Ljuspunkt uppe till vänster |
| `--anchor-ink` | `#004325` | Mörkgrön text på vita knappar |

CSS-motsvarighet (`.anchor-emerald` i `globals.css`):
```
radial-gradient(115% 115% at 12% 0%, #004726 0%, transparent 55%),
linear-gradient(150deg, #00190c 0%, #002e17 55%, #00210f 100%)
```

---

## 2. Typografi

| Roll | Font | Vikt | Storlek (på sajten) | Övrigt |
|---|---|---|---|---|
| H1 | **Inter** | 800 (extrabold) | `text-4xl→7xl` (36–72px) | `tracking-tight`, `leading-[1.1]` |
| H2 (sektionsrubrik) | **Inter** | 700–800 | `text-3xl→5xl` (30–48px) | `tracking-tight`, `text-balance` |
| H3 | **Inter** | 700 (bold) | `text-xl→2xl` (20–24px) | |
| Brödtext | **Inter** | 400 (regular) | `text-lg→xl` (18–20px) | `leading-relaxed`, `text-pretty` |
| Etikett / eyebrow | **Inter** | 600–700 | `text-xs→sm` (12–14px) | `uppercase`, ökad letter-spacing |
| Prissiffra | **Inter** | 900 (black) | `text-4xl→5xl` | |
| Mono (ev. teknisk text) | ui-monospace / Cascadia Code / Consolas | — | — | Sällan använd |

- **Font-familj i kod:** `'Inter', 'Inter Fallback', sans-serif` (laddas via
  `next/font/google` i `app/layout.tsx`).
- **Ladda ner:** Inter → https://fonts.google.com/specimen/Inter (finns även inbyggd
  i Figma och Canva under namnet "Inter").
- **Regel:** Aldrig Arial, Roboto eller system-ui som synligt val. Rubriker alltid
  tight tracking; brödtext alltid luftig radhöjd.

---

## 3. Logotyp

Textbaserad ordbild: **PHI** (grön `#008d4d`) + **GO** (mörk eller ljus beroende på
bakgrund). Versaler, Inter extrabold. Ingen ikon i den officiella ordbilden.

### Logomärke (P-symbolen)

Logomärket (P-symbolen) är en **egen designad asset** i mint `#02b77f` på mörk
bakgrund — ett rundat, kalligrafiskt "P" med måne/swoosh. Det är **inte** Inter-
bokstaven P och genereras **ALDRIG** om från ordbilden.

- **Källa (master):** `app/icon.png` — detta ÄR den officiella faviconen/app-ikonen.
- **Brand-kopia:** `logo/phigo-mark-mint-on-dark.png` (identisk kopia för Figma/Canva).
- **Använd på:** favicon, app-ikon, litet märke på mörk bakgrund.
- **Rör inte:** färg, form eller proportioner. Recolor inte till `#008d4d`.

### Varianter & filer

| Variant | Fil | Använd på | Färg |
|---|---|---|---|
| Ordbild ljus | `logo/phigo-wordmark-light.png` + `.svg` | **Mörk** bakgrund | PHI `#008d4d` / GO `#eeeeee` |
| Ordbild mörk | `logo/phigo-wordmark-dark.png` + `.svg` | **Ljus** bakgrund | PHI `#008d4d` / GO `#161616` |
| Logomärke (P) | `logo/phigo-mark-mint-on-dark.png` | Favicon / märke på mörk bg | Mint `#02b77f` |
| Profilplatta | `logo/phigo-profile-1080.png` | Profilbild (1080×1080, mörk emerald) | ljus ordbild |
| Rund avatar | `logo/phigo-avatar-256.png` | Vattenmärke i bildhörn (256×256, rund) | ljus ordbild |

> **Naming-varning (befintliga filer i `public/brand/`):** `phigo-logo.png` har
> **ljus** "GO" (för mörk bakgrund), medan `phigo-logo-light.png` har **mörk** "GO"
> (för ljus bakgrund). "light" syftar där på *bakgrunden*, inte på loggans färg.
> Exporterna i `logo/` använder tydligare namn (`-light` = ljus logga för mörk bakgrund).

### Regler

- **Välj variant efter bakgrund:** ljus logga på mörka/färgade plattor, mörk logga
  på vita/ljusa ytor. "GO" måste ha tillräcklig kontrast mot bakgrunden.
- **Minsta storlek:** ordbilden minst ~120px bred digitalt (annars tappar "GO" läsbarhet).
- **Frizon:** håll fritt utrymme runt loggan motsvarande höjden på "P" på alla sidor.
- **Ändra aldrig** proportioner, färger eller mellanrum. Sätt inte grönt på "GO".
- Grönt "PHI" är alltid `#008d4d`. Byt inte till en ljusare/mintigare grön.

---

## 4. Sociala medier

**Stilformel:** mörk emerald-platta + ljus text + grön accent på nyckelord +
`@phigo.se` diskret i hörnet.

- **Platta/bakgrund:** använd emerald-anchor-gradienten (se ovan) eller `#000903`.
  Aldrig grönt som stor yta i "ljust" läge — ljusa mallar = vit/ljusgrå yta med
  grönt endast på nyckelord och knappar.
- **Text:** ljus (`#eeeeee` / vit) på mörk platta; `#161616` på ljus platta.
- **Accent:** på mörk platta är accentfärgen mint `#02b77f` — använd den för nyckelord,
  siffror och CTA-text. Framhäv ETT nyckelord per bild, aldrig hela stycken i grönt.
  (På ljus platta gäller sajtens `#008d4d`.)
- **Logga:** ljus ordbild (`phigo-wordmark-light.png`) på mörk platta; avatar-varianten
  som vattenmärke i hörnet.
- **Typografi:** Inter. Rubrik extrabold tight tracking, brödtext regular.

### Bildformat

| Format | Storlek | Bruk |
|---|---|---|
| Porträtt-inlägg | 1080 × 1350 | Instagram/Facebook feed |
| Kvadrat | 1080 × 1080 | Feed, profil, karusell |
| Story / Reels | 1080 × 1920 | Story, TikTok, Reels |

### Copy-regler (gäller även bilder)

- Klarspråk — inga tekniska begrepp (SEO, responsiv, CTA osv). Se ordlistan i `CLAUDE.md`.
- **Inga em-dash (—)** i synlig kundvänd text. Hårt brott → punkt; paus → komma.
  Undantag: en-dash i sifferintervall (8 000–15 000 kr, Dag 1–3).
- Inga utropstecken i rubriker. Ton: professionell men varm, "vi" i löpande text.

---

## 5. Border-radius, spacing & djup

| Val | Värde | Not |
|---|---|---|
| `--radius` (bas) | `0.75rem` (12px) | sm=8, md=10, lg=12, xl=16px |
| Knappar/kort (sociala) | ~16px (rounded-2xl) | matchar CTA-knapparna på sajten |
| Sektions-padding | `py-24` desktop / `py-16` mobil | luftigt |
| Kort-gap | `gap-6`→`gap-8` | |
| Max innehållsbredd | `max-w-7xl` centrerat | |
| Skuggor | Lagrade, tintade med grönt vid låg opacitet | aldrig platt `shadow-md` |

---

## 6. Beslutat (2026-07-11)

1. **Tvåfärgslogik för grönt fastställd (två kontexter, se avsnitt 1):** på **sajten**
   är `#008d4d` `--primary` i båda lägena (orört). På **sociala mörka plattor** är mint
   `#02b77f` accent för nyckelord, siffror och CTA-text. Båda är officiella.
2. **Logomärket är en egen designad asset.** `app/icon.png` är mastern och den
   officiella faviconen — den lämnas **orörd** och genereras aldrig om från ordbilden.
   En brand-kopia ligger i `logo/phigo-mark-mint-on-dark.png`.
3. **Avvikande assets arkiverade** till `archive/` (behållna, ej raderade):
   - `icon.svg` — gammal serif-P-favicon (`Cormorant Garamond`, `#2a9e6a`), används ej.
   - `PHIGO_fullzize_screenshot.png` — fullstorlek skärmdump (OG-källa).
   - `Futuristisk_techlogotyp_med_neonklara_detaljer.png` — oanvänd konceptlogga.
4. **Städat:** `app/DEPRECATED-icon-old.{png,svg}` borttagna. Mitt tidigare felaktiga
   försök att generera om ikonen från Inter-P:t är borttaget (`icon/` + `export-icons.mjs`).
5. **`CLAUDE.md` uppdaterad:** favicon-källa och OG-källa pekar nu på rätt filer.

Den mörka accent-tinten `#0a3723` behålls i paletten eftersom den faktiskt är sajtens
`--accent` i mörkt läge (`oklch(0.30 0.06 160)` i `globals.css`), inte en påhittad färg.

---

## 7. Filindex (brand_assets/)

```
BRAND.md                     # detta dokument
palette.png                  # visuell färg- + typöversikt (genererad)
logo/
  phigo-wordmark-light.png   # ljus ordbild, transparent (för mörk bg)
  phigo-wordmark-light.svg   # editerbar vektor (Inter)
  phigo-wordmark-dark.png    # mörk ordbild, transparent (för ljus bg)
  phigo-wordmark-dark.svg    # editerbar vektor (Inter)
  phigo-mark-mint-on-dark.png# logomärket (P-symbol), kopia av app/icon.png
  phigo-profile-1080.png     # profilplatta 1080×1080, mörk emerald
  phigo-avatar-256.png       # rund avatar/vattenmärke 256×256
scripts/
  export-logos.mjs           # genererar logo/-ordbildsvarianterna (re-runnable)
  build-palette.mjs          # genererar palette.png (re-runnable)
archive/                     # utfasade assets, behållna för referens
  icon.svg                   # gammal serif-P-favicon (används ej)
  PHIGO_fullzize_screenshot.png  # fullstorlek skärmdump (OG-källa)
  Futuristisk_...detaljer.png    # oanvänd konceptlogga
```

> Logomärket (`phigo-mark-mint-on-dark.png`) har medvetet **inget** export-skript —
> det är en designad asset som kopieras från `app/icon.png`, aldrig genereras om.

**Kör om exporterna:**
```
node brand_assets/scripts/export-logos.mjs
node brand_assets/scripts/build-palette.mjs
```
