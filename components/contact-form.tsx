'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Send } from 'lucide-react'
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
import { fadeInUp, staggerContainer } from '@/lib/animations'

const contactSchema = z.object({
  namn: z.string().min(2, 'Namn maste vara minst 2 tecken'),
  foretag: z.string().min(2, 'Foretagsnamn maste vara minst 2 tecken'),
  epost: z.string().email('Ange en giltig e-postadress'),
  hemsida: z.string().url('Ange en giltig URL').optional().or(z.literal('')),
  forbattra: z.string().min(1, 'Valj ett alternativ'),
  meddelande: z.string().min(10, 'Meddelandet maste vara minst 10 tecken'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm() {
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
  })

  function onSubmit(data: ContactFormValues) {
    // In production, this would send to a backend API
    console.log('Form submitted:', data)
    toast.success('Tack for ert meddelande!', {
      description: 'Vi aterkomner inom 24 timmar.',
    })
    form.reset()
  }

  return (
    <section id="kontakt" className="border-t border-border bg-muted/20 py-20 lg:py-28">
      <div className="mx-auto max-w-2xl px-4 lg:px-6">
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
            Kontakta oss
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Fa en kostnadsfri webbplatsanalys
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-pretty text-muted-foreground"
          >
            Fyll i formularet sa aterkomner vi med konkreta forslag pa hur er
            sajt kan prestera battre.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          className="mt-10"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="namn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Namn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Anna Andersson"
                          className="bg-background border-border"
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
                      <FormLabel className="text-foreground">Foretag</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ert foretag AB"
                          className="bg-background border-border"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="epost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">E-post</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="anna@foretag.se"
                          className="bg-background border-border"
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
                      <FormLabel className="text-foreground">
                        Hemsida{' '}
                        <span className="text-muted-foreground font-normal">(valfri)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://ertforetag.se"
                          className="bg-background border-border"
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
                    <FormLabel className="text-foreground">
                      Vad vill ni forbattra?
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-background border-border">
                          <SelectValue placeholder="Valj ett alternativ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ny-sajt">Vi behover en helt ny sajt</SelectItem>
                        <SelectItem value="omdesign">Omdesign av befintlig sajt</SelectItem>
                        <SelectItem value="prestanda">Forbattra prestanda och laddtid</SelectItem>
                        <SelectItem value="konvertering">Oka konvertering och leads</SelectItem>
                        <SelectItem value="e-handel">E-handelslosning</SelectItem>
                        <SelectItem value="ovrigt">Ovrigt</SelectItem>
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
                    <FormLabel className="text-foreground">Meddelande</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Beratta lite om ert projekt och era mal..."
                        className="min-h-28 resize-none bg-background border-border"
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
                className="mt-2 w-full cursor-pointer rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={form.formState.isSubmitting}
              >
                <Send className="mr-2 size-4" />
                Skicka forfragan
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Tar 30 sekunder &middot; Ingen forpliktelse &middot; Svar inom 24h
              </p>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}
