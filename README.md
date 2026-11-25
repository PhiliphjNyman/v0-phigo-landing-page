# PHIGO — Hemsidor som ger dig fler kunder

PHIGOs egen hemsida. Vi bygger moderna, konverteringsoptimerade hemsidor åt lokala småföretag,
plus AI-receptionist och chatbot. Live på [phigo.se](https://phigo.se) (main deployas via Vercel).

---

## Erbjudande

Priser exkl. moms. Källa: `Fas0_produktdefinitioner.md`.

| Del | Pris | Sida |
|---|---|---|
| Hemsida | 8 000 kr (engång), betala hälften vid start | `/hemsida` |
| Drift | 399 kr/mån | `/hemsida` |
| AI-receptionist | 7 000 kr + 1 495 kr/mån (300 min ingår) | `/ai-receptionist` |
| Chatbot | 4 000 kr + 695 kr/mån | `/chatbot` |
| Paket | från 10 995 kr + 995 kr/mån (hemsida + chatbot), från 14 995 kr + 2 295 kr/mån (allt-i-ett) | |
| Leveranstid hemsida | 14 dagar | |

Övriga sidor: `/` (översikt + guide "Hitta rätt lösning"), `/cases`, `/blogg`, `/integritetspolicy`.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Språk:** TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Animationer:** Framer Motion
- **Formulär:** React Hook Form + Zod
- **Tema:** next-themes (ljust/mörkt läge)
- **Chatt:** ElevenLabs ConvAI-widget (`components/chat-widget.tsx`)
- **Pakethanterare:** pnpm (aldrig npm/yarn)

Se `CLAUDE.md` för projektstruktur, designregler och arbetssätt.

---

## Kom igång

```bash
pnpm install
pnpm dev
```

Öppna [http://localhost:3000](http://localhost:3000).

## Bygg för produktion

```bash
pnpm build
pnpm start
```

---

## Kontakt

[phigo.se](https://phigo.se)
