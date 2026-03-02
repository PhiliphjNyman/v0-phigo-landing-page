'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { HelpCircle, Clock, CreditCard, ShieldCheck, RefreshCw, Layers } from 'lucide-react'

const faqs = [
  {
    question: 'Hur lang tid tar ett projekt?',
    answer:
      'Ett typiskt projekt tar mellan 3--6 veckor beroende pa omfattning. Vi borjar alltid med en kort analyssfas for att sakerstalla att vi bygger ratt saker, sedan gar vi vidare till design och utveckling.',
    icon: Clock,
  },
  {
    question: 'Vad kostar en webbplats?',
    answer:
      'Priset beror pa projektets storlek och komplexitet. Vi ar transparenta med priserna och ger alltid en tydlig offert innan vi borjar. Kontakta oss for en kostnadsfri analys sa ger vi er ett forslag.',
    icon: CreditCard,
  },
  {
    question: 'Erbjuder ni support efter lansering?',
    answer:
      'Absolut. Vi erbjuder lopande support och underhall efter lansering. Vi hjalper med uppdateringar, optimering och eventuella tekniska fragor som dyker upp.',
    icon: ShieldCheck,
  },
  {
    question: 'Hur ser processen ut?',
    answer:
      'Var process ar uppdelad i tre faser: Analys & strategi, Design & utveckling, och Lansering & optimering. Ni ar involverade genom hela processen med regelbundna avstamningar och feedback-rundor.',
    icon: RefreshCw,
  },
  {
    question: 'Kan ni hjalpa med en befintlig sajt?',
    answer:
      'Ja, vi kan bade forbattra befintliga sajter och bygga helt nya. Vi borjar alltid med en analys av nuvarande sajt for att identifiera forbittringsomraden och mojligheter.',
    icon: Layers,
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
            className="text-sm font-bold uppercase tracking-widest text-primary"
          >
            Vanliga fragor
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
          >
            Har ni fragor? Vi har svar.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 mx-auto max-w-xl text-muted-foreground text-lg"
          >
            Hittar du inte det du sokor? Kontakta oss direkt sa hjalper vi dig.
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
                  className="group border border-border bg-card/50 rounded-2xl px-6 transition-all duration-300 data-[state=open]:border-primary/30 data-[state=open]:bg-card data-[state=open]:shadow-xl data-[state=open]:shadow-primary/5"
                >
                  <AccordionTrigger className="flex gap-4 py-6 text-left text-lg font-bold text-foreground hover:no-underline hover:text-primary transition-all [&[data-state=open]>svg]:rotate-180">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/5 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-colors shrink-0">
                      <Icon className="size-5" />
                    </div>
                    <span className="flex-1">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-14 text-base leading-relaxed text-muted-foreground/95">
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
            <HelpCircle className="size-4 text-primary" />
            Fortfarande osakor?
            <a href="#kontakt" className="font-bold text-primary hover:underline">Chatta med oss</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
