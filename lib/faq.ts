/**
 * Single source of truth for the main FAQ (rendered by FaqSection on /hemsida,
 * consumed by that page's FAQPage JSON-LD). Google requires schema Q&A text to
 * be identical to the visible content — both consumers import from here, so
 * they cannot drift. Icons are presentation and live in the component, keyed
 * by each item's stable id.
 */
export type FaqItem = {
  /** Stable key — never reuse for a different question. */
  id: string
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    id: 'pris',
    question: 'Vad kostar en hemsida?',
    answer:
      'En hemsida kostar 8 000 kr exkl. moms (engång) och 399 kr/mån exkl. moms för drift, säkerhet och support. Inga dolda kostnader. Priset är fast oavsett hur lång tid det tar. Du betalar hälften nu och resten först när du är nöjd vid leverans.',
  },
  {
    id: 'leveranstid',
    question: 'Hur lång tid tar det?',
    answer:
      'Din sajt är live inom 14 dagar från att vi fått dina uppgifter. Ofta går det snabbare.',
  },
  {
    id: 'efter-lansering',
    question: 'Vad händer efter att sajten är live?',
    answer:
      'Vi ser till att sajten alltid är uppe och funkar. Månadsavgiften på 399 kr/mån (exkl. moms) täcker drift, säkerhet och mindre ändringar, som att uppdatera öppettider, priser eller kontaktuppgifter.',
  },
  {
    id: 'mobil',
    question: 'Fungerar sajten på mobilen?',
    answer:
      'Ja. Alla sajter vi bygger fungerar perfekt på mobilen. Det är ofta där dina kunder hittar dig.',
  },
  {
    id: 'google',
    question: 'Hittar folk mig på Google?',
    answer:
      'Ja. Vi bygger sajten så att den syns i Google när folk i ditt område söker efter det du erbjuder. Det tar lite tid att bygga upp, men grunden läggs direkt.',
  },
  {
    id: 'sjalv-uppdatera',
    question: 'Behöver du ändra texter och bilder själv?',
    answer:
      'Ja. Vi kan lägga till ett enkelt admin-system där du ändrar texter, bilder och priser själv, utan att kunna något om teknik. Det är ett tillägg utöver baspaketet. Vill du hellre slippa helt gör vi det åt dig. Mindre ändringar ingår i månadsavtalet.',
  },
  {
    id: 'utan-manadsavtal',
    question: 'Kan jag köpa bara hemsidan utan månadsavtal?',
    answer:
      'Ja, det går bra. Vi bygger sajten och överlämnar den till dig. Då ansvarar du själv för drift, säkerhet och uppdateringar. De flesta av våra kunder väljer månadsavtalet för att slippa tänka på teknik, men det är inget krav.',
  },
]

/** FAQPage JSON-LD built from the exact strings rendered by FaqSection. */
export function buildFaqPageSchema(pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}
