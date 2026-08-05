'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { reveal } from '@/lib/animations'

export type ProductFaqItem = {
  question: string
  answer: string
  icon?: LucideIcon
}

export function ProductFaq({ faqs }: { faqs: ProductFaqItem[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={reveal}
      className="mx-auto max-w-3xl"
    >
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => {
          const Icon = faq.icon
          return (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="group rounded-2xl border border-border bg-card/50 px-6 transition-[border-color,background-color,box-shadow] duration-200 data-[state=open]:border-primary/30 data-[state=open]:bg-card data-[state=open]:shadow-xl data-[state=open]:shadow-primary/5"
            >
              <AccordionTrigger className="flex gap-4 py-6 text-left text-lg font-bold text-foreground hover:no-underline hover:text-primary transition-[color] duration-200 [&[data-state=open]>svg]:rotate-180 [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out">
                {Icon && (
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                )}
                <span className="flex-1">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-0 text-base leading-relaxed text-pretty text-muted-foreground/95 sm:pl-14">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </motion.div>
  )
}
