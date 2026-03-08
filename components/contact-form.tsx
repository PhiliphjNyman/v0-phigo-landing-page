'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Send, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'

const contactSchema = z.object({
  namn: z.string().min(2, 'Namn måste vara minst 2 tecken'),
  foretag: z.string().min(2, 'Företagsnamn måste vara minst 2 tecken'),
  epost: z.string().email('Ange en giltig e-postadress'),
  hemsida: z.string().url('Ange en giltig URL').optional().or(z.literal('')),
  forbattra: z.string().min(1, 'Välj ett alternativ'),
  meddelande: z.string().min(10, 'Meddelandet måste vara minst 10 tecken'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      namn: '',
      foretag: '',
      epost: '',
      hemsida: '',
      forbattra: '',
      meddelande: '',
    },
    mode: 'onChange',
  })

  const watchedFields = form.watch()
  const filledFields = Object.values(watchedFields).filter(value => value && value.length > 0).length
  const progress = (filledFields / 6) * 100

  async function onSubmit(data: ContactFormValues) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        toast.error(json.error ?? 'Något gick fel. Försök igen.')
        return
      }

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#059669'],
      })
      setIsSubmitted(true)
      toast.success('Analysförfrågan skickad!')
    } catch {
      toast.error('Kunde inte nå servern. Försök igen.')
    }
  }

  return (
    <section id="kontakt" className="relative border-t border-border bg-muted/20 py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/5 blur-[120px] -z-10" />

      <div className="mx-auto max-w-2xl px-4 lg:px-8">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial="hidden"
              whileInView="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
            >
              <div className="text-center mb-12">
                <motion.span
                  variants={fadeInUp}
                  className="text-sm font-bold uppercase tracking-widest text-primary"
                >
                  Kontakta oss
                </motion.span>
                <motion.h2
                  variants={fadeInUp}
                  className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
                >
                  Redo för nästa steg?
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="mt-6 text-pretty text-muted-foreground text-lg"
                >
                  Fyll i formuläret så återkommer vi med konkreta förslag på hur er
                  sajt kan prestera bättre
                </motion.p>
              </div>

              <motion.div variants={fadeInUp} className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-muted" aria-hidden="true">
                  <motion.div
                    className="h-full w-full bg-primary origin-left"
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 p-8 sm:p-10"
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="namn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex justify-between">
                              Namn
                              {field.value.length >= 2 && <CheckCircle2 className="size-4 text-primary animate-in zoom-in" aria-hidden="true" />}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Anna Andersson"
                                className="h-12 bg-background/50 border-border focus:border-primary/50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="foretag"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex justify-between">
                              Företag
                              {field.value.length >= 2 && <CheckCircle2 className="size-4 text-primary animate-in zoom-in" aria-hidden="true" />}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ert företag AB"
                                className="h-12 bg-background/50 border-border focus:border-primary/50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="epost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex justify-between">
                              E-post
                              {field.value.includes('@') && field.value.includes('.') && <CheckCircle2 className="size-4 text-primary animate-in zoom-in" aria-hidden="true" />}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="anna@foretag.se"
                                className="h-12 bg-background/50 border-border focus:border-primary/50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hemsida"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Hemsida{' '}
                              <span className="text-muted-foreground font-normal">(valfri)</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://ertforetag.se"
                                className="h-12 bg-background/50 border-border focus:border-primary/50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="forbattra"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vad vill ni förbättra?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 w-full bg-background/50 border-border">
                                <SelectValue placeholder="Välj ett alternativ" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ny-sajt">Vi behöver en helt ny sajt</SelectItem>
                              <SelectItem value="omdesign">Omdesign av befintlig sajt</SelectItem>
                              <SelectItem value="prestanda">Förbättra prestanda och laddtid</SelectItem>
                              <SelectItem value="konvertering">Öka konvertering och leads</SelectItem>
                              <SelectItem value="e-handel">E-handelslösning</SelectItem>
                              <SelectItem value="ovrigt">Övrigt</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meddelande"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meddelande</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Berätta lite om ert projekt och era mål..."
                              className="min-h-32 resize-none bg-background/50 border-border"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="mt-4 h-14 w-full cursor-pointer rounded-2xl bg-primary text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-2xl active:scale-[0.98]"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        "Skickar..."
                      ) : (
                        <>
                          Skicka analysförfrågan
                          <Send className="ml-2 size-5" aria-hidden="true" />
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-6 mt-2 opacity-60">
                      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                        <CheckCircle2 className="size-3 text-primary" aria-hidden="true" />
                        Svar inom 24h
                      </p>
                      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                        <Sparkles className="size-3 text-primary" aria-hidden="true" />
                        100% Gratis
                      </p>
                    </div>
                  </form>
                </Form>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="flex flex-col items-center justify-center text-center p-12 bg-card rounded-[3rem] border border-primary/20 shadow-2xl"
            >
              <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-8">
                <CheckCircle2 className="size-10 text-primary" />
              </div>
              <h2 className="text-4xl font-black text-foreground mb-4">Tack för visat intresse!</h2>
              <p className="text-lg text-muted-foreground max-w-sm mb-10">
                Vi har tagit emot din förfrågan och kommer att påbörja
                analysen av er webbplats omedelbart.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="rounded-xl px-8 h-12"
              >
                Tillbaka till start
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
