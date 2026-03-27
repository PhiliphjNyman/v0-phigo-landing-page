'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const founders = [
  {
    initials: 'HR',
    name: 'Hugo Ramström Örn',
    role: 'Grundare & webbutvecklare',
    bio: 'Bygger sajter med fokus på konvertering och prestanda. Har sett för många lokala företag förlora kunder till en sajt som inte gör sitt jobb — det är vad PHIGO är till för att ändra på.',
  },
  {
    initials: 'PN',
    name: 'Philip Nyman',
    role: 'Grundare & webbutvecklare',
    bio: 'Kombinerar teknisk precision med ett öga för design. Tror att en bra hemsida ska vara ett säljverktyg, inte bara ett visitkort på nätet.',
  },
]

export function AboutSection() {
  return (
    <section id="om-oss" className="border-t border-border bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-semibold uppercase text-primary"
          >
            Om oss
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Vilka är vi?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground"
          >
            Vi är Hugo och Philip, två webbutvecklare från Linköping. Vi tröttnade på
            att se lokala företag betala dyrt för generiska sajter som aldrig gav dem
            fler kunder — och bestämde oss för att göra det bättre.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid w-full max-w-2xl gap-6 sm:grid-cols-2"
          >
            {founders.map((founder) => (
              <motion.div
                key={founder.name}
                variants={fadeInUp}
                className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
              >
                {/* Avatar placeholder — swap for <Image> when photos are available */}
                <div
                  className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary"
                  aria-hidden="true"
                >
                  {founder.initials}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {founder.name}
                  </h3>
                  <p className="text-xs font-medium uppercase text-primary">
                    {founder.role}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                  {founder.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            <span>Linköping, Sverige</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
