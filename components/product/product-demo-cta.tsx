'use client'

import { motion } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { reveal, revealStagger } from '@/lib/animations'
import { SectionEyebrow } from '@/components/section-eyebrow'

type DemoPhone = {
  /* The demo number. null until it is set (fas 5) — the block then shows the
     placeholder note plus the fallback button, never a dead tel: link. */
  number: string | null
  placeholderNote?: string
}

/* Closing demo CTA on the emerald anchor surface (same fixed emerald as the
   FinalCta, no orbs so it stays outside the visual-rules orb gate).

   - phone: the receptionist "Ring och prova själv" demo. Renders a tel: link
     when a number exists, otherwise the placeholder note + fallback button.
   - button: a plain action (fallback, or the chatbot "Testa den här på sidan"
     which stays swappable until the widget embed lands in fas 5). */
export function ProductDemoCta({
  id,
  eyebrow,
  title,
  description,
  phone,
  button,
}: {
  id?: string
  eyebrow: string
  title: string
  description?: string
  phone?: DemoPhone
  button?: { label: string; href: string }
}) {
  return (
    <section id={id} className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 lg:px-6 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={revealStagger}
          className="anchor-emerald relative overflow-hidden rounded-3xl border border-white/10 px-6 py-16 text-center shadow-2xl shadow-primary/10 sm:px-12 lg:px-20"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 size-60 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative z-10">
            <SectionEyebrow className="text-anchor-fg-muted">{eyebrow}</SectionEyebrow>
            <motion.h2
              variants={reveal}
              className="mt-4 text-balance text-3xl font-bold tracking-tight text-anchor-fg sm:text-4xl"
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                variants={reveal}
                className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-anchor-fg-muted"
              >
                {description}
              </motion.p>
            )}

            <motion.div variants={reveal} className="mt-8 flex flex-col items-center gap-3">
              {phone && phone.number ? (
                <Button
                  asChild
                  size="lg"
                  className="cursor-pointer rounded-xl bg-white px-8 text-anchor-ink shadow-lg shadow-black/25 hover:bg-white/90 hover:shadow-xl hover:shadow-black/30 focus-visible:border-white focus-visible:ring-white/70 active:scale-[0.98] transition-[transform,background-color,box-shadow] duration-200"
                >
                  <a href={`tel:${phone.number.replace(/\s+/g, '')}`}>
                    <Phone className="mr-2 size-4" aria-hidden="true" />
                    {phone.number}
                  </a>
                </Button>
              ) : (
                <>
                  {phone && (
                    <p className="text-sm text-anchor-fg-muted">
                      {phone.placeholderNote ?? 'Demo-numret läggs in inom kort.'}
                    </p>
                  )}
                  {button && (
                    <Button
                      asChild
                      size="lg"
                      className="cursor-pointer rounded-xl bg-white px-8 text-anchor-ink shadow-lg shadow-black/25 hover:bg-white/90 hover:shadow-xl hover:shadow-black/30 focus-visible:border-white focus-visible:ring-white/70 active:scale-[0.98] transition-[transform,background-color,box-shadow] duration-200"
                    >
                      <a href={button.href}>
                        {button.label}
                        <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                      </a>
                    </Button>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
