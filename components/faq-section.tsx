'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const faqs = [
  {
    question: 'Hur lang tid tar ett projekt?',
    answer:
      'Ett typiskt projekt tar mellan 3--6 veckor beroende pa omfattning. Vi borjar alltid med en kort analyssfas for att sakerstalla att vi bygger ratt saker, sedan gar vi vidare till design och utveckling.',
  },
  {
    question: 'Vad kostar en webbplats?',
    answer:
      'Priset beror pa projektets storlek och komplexitet. Vi ar transparenta med priserna och ger alltid en tydlig offert innan vi borjar. Kontakta oss for en kostnadsfri analys sa ger vi er ett forslag.',
  },
  {
    question: 'Erbjuder ni support efter lansering?',
    answer:
      'Absolut. Vi erbjuder lopande support och underhall efter lansering. Vi hjalper med uppdateringar, optimering och eventuella tekniska fragor som dyker upp.',
  },
  {
    question: 'Hur ser processen ut?',
    answer:
      'Var process ar uppdelad i tre faser: Analys & strategi, Design & utveckling, och Lansering & optimering. Ni ar involverade genom hela processen med regelbundna avstamningar och feedback-rundor.',
  },
  {
    question: 'Kan ni hjalpa med en befintlig sajt?',
    answer:
      'Ja, vi kan bade forbattra befintliga sajter och bygga helt nya. Vi borjar alltid med en analys av nuvarande sajt for att identifiera forbittringsomraden och mojligheter.',
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-wider text-primary"
          >
            Vanliga fragor
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Har ni fragor? Vi har svar.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border"
              >
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
