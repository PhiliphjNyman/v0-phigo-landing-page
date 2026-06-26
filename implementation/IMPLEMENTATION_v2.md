# IMPLEMENTATION v2 — PHIGO hemsida

_Aktiv plan. Ersätter de tidigare planerna (arkiverade i implementation/archive/),
som beskriver hur sidan först byggdes. Denna fil är källan till sanning för
pågående och framtida arbete. Hierarki: CLAUDE.md > denna plan._

---

## Pågående: Dark/Light mode + färgstädning

**Beslut (juni 2026):** Sidan ska ha både ljust och mörkt läge.
- **Ljust läge** = rent och neutralt. Vita/ljusgrå ytor, mörk text, grönt ENBART
  som accent (knappar, logotyp, länkar, fokusringar). Detta är standardläget.
- **Mörkt läge** = behåll den gröna emerald-atmosfären som redan finns (hue 160
  genom hela ytsystemet). Rör inte den känslan.
- Emerald-accenten (--primary) är SAMMA i båda lägena. Endast ytfärgerna skiljer.

**Faser (en fas = en sak som kan gå sönder, testas var för sig):**

- [x] Fas 1 — Städa cruft. Borttaget: styles/globals.css, services.tsx,
      og-image.png, trust-bar.tsx, hero-visual.tsx (den hårdkodade "värsta boven").
      Gamla DEPRECATED-ikoner behålls tills vidare.
- [ ] Fas 2 — Uppdatera CLAUDE.md: ersätt "forcerad dark mode" med dual-mode-policy
      ovan; lägg till regeln "grönt = accent i ljust läge, ytton endast i mörkt".
- [x] Fas 3 — Tokenisera kvarvarande hårdkodade färger (utom shadcn ui/). Bl.a.
      bg-zinc-900 → bg-muted, hover:bg-white/5 → bg-foreground/5, emerald/amber/
      cyan-500 → nya accent-tokens, samt fix av den trasiga rgba(var(--primary))
      i process-section (→ color-mix). Mörkt läge verifierat identiskt (accent-
      tokens resolvar exakt till gamla *-500-värden). themeColor + e-postmall +
      confetti-färger lämnade medvetet (Fas 5 / kräver literala värden).
- [x] Fas 4 — Definiera en RIKTIG ljus palett i :root (var tidigare en dubblett
      av .dark). Neutralt grå/vita ytor (zero chroma), grönt endast som accent.
      .dark orörd (byte-för-byte). Ingen toggle ännu. Build OK, ljust läge
      preview-verifierat, mörkt läge oförändrat. Fas 6-flaggor noterade nedan.
- [x] Fas 5 — Koppla in next-themes: ThemeProvider monterad i layout (attribute=
      "class", defaultTheme="system", enableSystem), hårdkodad class="dark"
      borttagen, suppressHydrationWarning på <html>, tema-medveten themeColor
      (light #fafafa / dark #000903 = respektive lägets --background). Build OK.
      Verifierat: light-via-OS → html.light, dark-via-OS → html.dark (Playwright
      color_scheme-emulering), anti-FOUC-skript i <head>, inga hydration-warnings.
      Ingen toggle ännu (Fas 6).
- [ ] Fas 6 — Toggle-knapp i header + finputs: WCAG AA-kontrast i båda lägena,
      accent-blobbar kontrollerade mot vit fond, logotypvarianter (grå GO för
      ljust läge, ljus GO för mörkt läge).
      Konkreta flaggor från Fas 4-preview av ljust läge:
      - Dekorativa gröna blobbar tintar de neutrala vita ytorna grönt i ljust
        läge (bryter mot regel 14 "grönt = accent, aldrig yta i ljust läge"):
        components/page-background.tsx (bg-primary/10 + bg-accent-hero/5) och
        contact-form.tsx rad 100 (bg-primary/5 blur-[120px]). Dämpa/byt till
        neutral eller dölj i ljust läge.
      - Logotypens "GO" renderar nära-svart i ljust läge; Fas 6 vill ha en grå
        GO-variant (phigo-logo.tsx).
      - Mörk-tunade skuggor på kort (t.ex. about-section hover:shadow-black/20)
        bör kontrolleras mot vit fond — kan se fel ut i ljust läge.
      - Verifiera slutläget (efter entrance-animation) för om-oss-kortet och
        kontakt-knappen i ljust läge — de såg svaga ut i screenshot men det var
        opacity-0-artefakt (se lessons.md), inte palettfel. Bekräfta visuellt.

---

## Future / backlog

- [ ] Återinför kund-logotyp-karusell (trust bar) när riktiga kunder finns. Byggs
      från grunden med riktiga kundlogotyper och nuvarande design-tokens. Gamla
      trust-bar.tsx togs bort i städningen (juni 2026).
- [ ] Bloggbilder saknas: lib/blog.ts refererar /images/blog/*.png (6 filer) som
      inte finns i public/images/. Antingen lägg till bilderna eller justera
      blog.ts. (Upptäckt under städning, ej brådskande.)
- [ ] Logotyp på sajten: CLAUDE.md säger gemener "phigo"; phigo-logo.tsx renderar
      versaler "PHI"/"GO". Bestäm vilket som gäller och synka.

---
