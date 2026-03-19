'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { HelpCircle, CreditCard, Clock, ShieldCheck, Smartphone, MapPin, Pencil, PackageMinus } from 'lucide-react'

const faqs = [
  {
    question: 'Vad kostar en hemsida?',
    answer:
      'En hemsida kostar 8 000 kr (engång) och 399 kr/mån för drift, säkerhet och support. Inga dolda kostnader — priset är fast oavsett hur lång tid det tar.',
    icon: CreditCard,
  },
  {
    question: 'Hur lång tid tar det?',
    answer:
      'Din sajt är live inom 14 dagar från att vi fått all information vi behöver. Ofta går det snabbare.',
    icon: Clock,
  },
  {
    question: 'Vad händer efter att sajten är live?',
    answer:
      'Vi ser till att sajten alltid är uppe och funkar. Månadsavgiften på 399 kr/mån täcker hosting, säkerhet och mindre ändringar — som att uppdatera öppettider, priser eller kontaktuppgifter.',
    icon: ShieldCheck,
  },
  {
    question: 'Fungerar sajten på mobilen?',
    answer:
      'Ja. Alla sajter vi bygger fungerar perfekt på mobilen — det är ofta där dina kunder hittar dig.',
    icon: Smartphone,
  },
  {
    question: 'Hittar folk mig på Google?',
    answer:
      'Ja. Vi bygger sajten så att den syns i Google när folk i ditt område söker efter det du erbjuder. Det tar lite tid att bygga upp, men grunden läggs direkt.',
    icon: MapPin,
  },
  {
    question: 'Behöver du ändra texter och bilder själv?',
    answer:
      'Ja. Vi kan lägga till ett enkelt admin-system där du ändrar texter, bilder och priser själv — utan att kunna något om teknik. Det är ett tillägg utöver baspaketet. Vill du hellre slippa helt gör vi det åt dig — mindre ändringar ingår i månadsavtalet.',
    icon: Pencil,
  },
  {
    question: 'Kan jag köpa bara hemsidan utan månadsavtal?',
    answer:
      'Ja, det går bra. Vi bygger sajten och överlämnar den till dig. Då ansvarar du själv för hosting, säkerhet och uppdateringar. De flesta av våra kunder väljer månadsavtalet för att slippa tänka på teknik — men det är inget krav.',
    icon: PackageMinus,
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-muted/5 relative overflow-hidden">
      {/* Ornamental background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 -z-10 size-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="text-sm font-bold uppercase text-primary"
            aria-hidden="true"
          >
            Vanliga frågor
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
          >
            Vanliga frågor
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 mx-auto max-w-xl text-pretty text-muted-foreground text-lg"
          >
            Hittar du inte svaret du söker? Hör av dig direkt.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          className="relative"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => {
              const Icon = faq.icon
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="group border border-border bg-card/50 rounded-2xl px-6 transition-[border-color,background-color,box-shadow] duration-300 data-[state=open]:border-primary/30 data-[state=open]:bg-card data-[state=open]:shadow-xl data-[state=open]:shadow-primary/5"
                >
                  <AccordionTrigger className="flex gap-4 py-6 text-left text-lg font-bold text-foreground hover:no-underline hover:text-primary transition-[color] duration-200 [&[data-state=open]>svg]:rotate-180 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:ease-in-out">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/5 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-colors shrink-0">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <span className="flex-1">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-14 text-base leading-relaxed text-pretty text-muted-foreground/95">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </motion.div>

        {/* Support CTA under FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground">
            <HelpCircle className="size-4 text-primary" aria-hidden="true" />
            Fortfarande osäker?
            <a href="#kontakt" className="font-bold text-primary hover:underline">Chatta med oss</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
