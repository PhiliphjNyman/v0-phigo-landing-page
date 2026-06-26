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
- [ ] Fas 3 — Tokenisera kvarvarande hårdkodade färger (utom shadcn ui/). Bl.a.
      bg-zinc-900, hover:bg-white/5, samt den trasiga rgba(var(--primary)) i
      process-section. Sajten ska se identisk ut i mörkt läge efteråt.
- [ ] Fas 4 — Definiera en RIKTIG ljus palett i :root (idag är :root en dubblett
      av .dark). Neutralt grå/vita ytor, INTE den gröna tonen översatt till ljust.
      Ännu ingen toggle.
- [ ] Fas 5 — Koppla in next-themes: montera ThemeProvider i layout, ta bort
      hårdkodad class="dark", suppressHydrationWarning, tema-medveten themeColor.
- [ ] Fas 6 — Toggle-knapp i header + finputs: WCAG AA-kontrast i båda lägena,
      accent-blobbar kontrollerade mot vit fond, logotypvarianter (grå GO för
      ljust läge, ljus GO för mörkt läge).

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
