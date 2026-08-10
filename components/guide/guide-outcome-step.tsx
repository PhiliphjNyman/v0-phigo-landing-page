'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { CheckCircle2, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  GUIDE_UI_COPY,
  GUIDE_VALIDATION,
  KONTAKTSATT_BEKRAFTELSE,
  type GuideAnswers,
  type KontaktsattId,
  type PresentedOutcome,
} from '@/lib/guide'

/**
 * Kontaktsteget lever i SAMMA kort som utfallet, precis som fas 0 §5:s mall:
 * rubrik, utfall, pris, CTA-rad och därefter fälten. Två likvärdiga vägar, och
 * fältkraven avgörs av vilken knapp som trycks. Ingen nedtoning av det
 * sekundära valet: samma höjd, samma bredd, full kontrast på texten.
 */
const kontaktSchema = z
  .object({
    namn: z.string().min(2, GUIDE_VALIDATION.namn),
    telefon: z
      .string()
      .regex(/^[\d\s+()-]{6,20}$/, GUIDE_VALIDATION.telefon)
      .optional()
      .or(z.literal('')),
    epost: z.string().email(GUIDE_VALIDATION.epostFormat).optional().or(z.literal('')),
    kontaktsatt: z.enum(['ring', 'mejl']),
    gdpr: z.boolean().refine((v) => v === true, { message: GUIDE_VALIDATION.gdpr }),
  })
  .superRefine((values, ctx) => {
    if (values.kontaktsatt === 'ring' && !values.telefon) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['telefon'],
        message: GUIDE_VALIDATION.telefon,
      })
    }
    if (values.kontaktsatt === 'mejl' && !values.epost) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['epost'],
        message: GUIDE_VALIDATION.epostValbero,
      })
    }
  })

type KontaktValues = z.infer<typeof kontaktSchema>

interface GuideOutcomeStepProps {
  /** Rubriken renderas av flödet (den märker upp gruppen), resten här. */
  outcome: PresentedOutcome
  /** Svaren följer med leadet i klartext. */
  answers: GuideAnswers
}

export function GuideOutcomeStep({ outcome, answers }: GuideOutcomeStepProps) {
  const [sentAs, setSentAs] = useState<KontaktsattId | null>(null)
  const [showExit, setShowExit] = useState(false)

  const form = useForm<KontaktValues>({
    resolver: zodResolver(kontaktSchema),
    defaultValues: {
      namn: '',
      telefon: '',
      epost: '',
      kontaktsatt: 'ring',
      gdpr: false,
    },
  })

  async function onSubmit(values: KontaktValues) {
    try {
      /* Källan i query-strängen låter endpointen ge guiden en egen
         rate limit-hink utan att läsa kroppen först. Se app/api/contact/route.ts. */
      const res = await fetch('/api/contact?source=guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'guide',
          kontakt: {
            namn: values.namn,
            telefon: values.telefon || undefined,
            epost: values.epost || undefined,
            kontaktsatt: values.kontaktsatt,
          },
          svar: answers,
          utfall: outcome.outcomeId,
        }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        toast.error(json.error ?? 'Något gick fel. Försök igen.')
        return
      }

      setSentAs(values.kontaktsatt)
    } catch {
      toast.error('Kunde inte nå servern. Försök igen.')
    }
  }

  /* Knappen bestämmer vilken väg som gäller, därför sätts valet precis före
     valideringen. superRefine ovan läser det och flyttar fältkravet. */
  function submitWith(kontaktsatt: KontaktsattId) {
    form.setValue('kontaktsatt', kontaktsatt)
    void form.handleSubmit(onSubmit)()
  }

  if (sentAs) {
    return (
      <div className="mt-8 flex flex-col items-center text-center" role="status" aria-live="polite">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
        </div>
        <p className="mt-6 text-balance text-xl font-bold text-foreground">
          {GUIDE_UI_COPY.confirmationHeading}
        </p>
        <p className="mt-2 text-pretty text-lg text-muted-foreground">
          {KONTAKTSATT_BEKRAFTELSE[sentAs]}
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{outcome.body}</p>

      <p className="mt-6 text-balance text-2xl font-extrabold tracking-tight text-foreground">
        {outcome.price}
      </p>

      {outcome.trust && (
        <p className="mt-2 text-base font-medium text-primary">{outcome.trust}</p>
      )}

      {outcome.secondary && (
        <p className="mt-4 text-pretty text-base text-muted-foreground">{outcome.secondary}</p>
      )}

      <p className="mt-6 text-pretty text-base leading-relaxed text-foreground">{outcome.cta}</p>

      <Form {...form}>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="mt-8 flex flex-col gap-5 text-left"
        >
          <FormField
            control={form.control}
            name="namn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Namn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Anna Andersson"
                    autoComplete="name"
                    className="h-12 border-border bg-background/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="telefon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="070 123 45 67"
                      autoComplete="tel"
                      className="h-12 border-border bg-background/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="epost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-post</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="anna@foretag.se"
                      autoComplete="email"
                      className="h-12 border-border bg-background/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="text-pretty text-sm text-muted-foreground">
            {GUIDE_UI_COPY.fieldHelp}
          </p>

          <FormField
            control={form.control}
            name="gdpr"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3 rounded-xl border border-border bg-background/30 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="guide-gdpr"
                    aria-required="true"
                    className="mt-0.5"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel
                    htmlFor="guide-gdpr"
                    className="cursor-pointer text-sm font-normal text-muted-foreground"
                  >
                    Jag godkänner att PHIGO behandlar mina uppgifter enligt vår{' '}
                    <Link
                      href="/integritetspolicy"
                      className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
                      target="_blank"
                      aria-label="integritetspolicy (öppnas i ny flik)"
                    >
                      integritetspolicy
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Två likvärdiga vägar. Samma storlek och samma kontrast: fas 0 §5
              förbjuder uttryckligen att det sekundära valet tonas ned. */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              size="lg"
              disabled={form.formState.isSubmitting}
              aria-busy={form.formState.isSubmitting}
              onClick={() => submitWith('ring')}
              className="h-14 cursor-pointer rounded-2xl bg-primary text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-[transform,background-color,box-shadow] duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-2xl active:scale-[0.98]"
            >
              <Phone className="mr-2 size-5" aria-hidden="true" />
              Ja, ring mig
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              disabled={form.formState.isSubmitting}
              aria-busy={form.formState.isSubmitting}
              onClick={() => submitWith('mejl')}
              className="h-14 cursor-pointer rounded-2xl border-primary/40 bg-card text-base font-bold text-foreground transition-[transform,background-color,border-color,box-shadow] duration-200 hover:scale-[1.02] hover:border-primary/60 hover:bg-accent/40 active:scale-[0.98]"
            >
              <Mail className="mr-2 size-5" aria-hidden="true" />
              Maila mig i stället
            </Button>
          </div>

          {/* Avslut utan kontaktuppgifter (fas 0 §5). Mejlvägen tills
              receptionistnumret är live; ingen platshållare i copyn. */}
          {showExit ? (
            <p className="text-pretty text-sm text-muted-foreground" role="status">
              {GUIDE_UI_COPY.declineLead}{' '}
              <a
                href="mailto:info@phigo.se"
                className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
              >
                info@phigo.se
              </a>{' '}
              {GUIDE_UI_COPY.declineTail}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setShowExit(true)}
              className="cursor-pointer self-start text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {GUIDE_UI_COPY.declineLink}
            </button>
          )}
        </form>
      </Form>
    </div>
  )
}
