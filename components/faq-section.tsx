'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { reveal, revealStagger } from '@/lib/animations'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { HelpCircle, CreditCard, Clock, ShieldCheck, Smartphone, MapPin, Pencil, PackageMinus, type LucideIcon } from 'lucide-react'
import { faqs } from '@/lib/faq'

/* Q&A text lives in lib/faq.ts (shared with the FAQPage JSON-LD on /hemsida so
   schema and visible content cannot drift). Icons are presentation-only and
   stay here, keyed by each item's stable id. */
const iconMap: Record<string, LucideIcon> = {
  'pris': CreditCard,
  'leveranstid': Clock,
  'efter-lansering': ShieldCheck,
  'mobil': Smartphone,
  'google': MapPin,
  'sjalv-uppdatera': Pencil,
  'utan-manadsavtal': PackageMinus,
}

export function FaqSection() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-muted dark:bg-muted/5 relative overflow-hidden">
      {/* Ornamental background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 -z-10 size-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={revealStagger}
          className="text-center mb-16"
        >
          <SectionEyebrow aria-hidden="true">Vanliga frågor</SectionEyebrow>
          <motion.h2
            variants={reveal}
            className="mt-4 text-balance text-fluid-h2 font-extrabold tracking-tight text-foreground"
          >
            Vanliga frågor
          </motion.h2>
          <motion.p
            variants={reveal}
            className="mt-6 mx-auto max-w-xl text-pretty text-muted-foreground text-lg"
          >
            Hittar du inte svaret du söker? Hör av dig direkt.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={reveal}
          className="relative"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => {
              const Icon = iconMap[faq.id] ?? HelpCircle
              return (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="group border border-border bg-card/50 rounded-2xl px-6 transition-[border-color,background-color,box-shadow] duration-200 data-[state=open]:border-primary/30 data-[state=open]:bg-card data-[state=open]:shadow-xl data-[state=open]:shadow-primary/5"
                >
                  <AccordionTrigger className="flex gap-4 py-6 text-left text-lg font-bold text-foreground hover:no-underline hover:text-primary transition-[color] duration-200 [&[data-state=open]>svg]:rotate-180 [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/5 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-colors shrink-0">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <span className="flex-1">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-0 sm:pl-14 text-base leading-relaxed text-pretty text-muted-foreground/95">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </motion.div>

        {/* Support CTA under FAQ */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground">
            <HelpCircle className="size-4 text-primary" aria-hidden="true" />
            Fortfarande osäker?
            <Link href="/#kontakt" className="font-bold text-primary hover:underline">Chatta med oss</Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
