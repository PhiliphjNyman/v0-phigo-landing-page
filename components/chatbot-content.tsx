'use client'

import { MessageCircle, UserPlus, Sparkles } from 'lucide-react'
import { ProductHero } from '@/components/product-hero'
import { ProductSection } from '@/components/product/product-section'
import { ProductBenefits } from '@/components/product/product-benefits'
import { ProductSteps } from '@/components/product/product-steps'
import { ProductBoundaries } from '@/components/product/product-boundaries'
import { ProductPrice } from '@/components/product/product-price'
import { ProductDemoCta } from '@/components/product/product-demo-cta'

/* The on-site chat widget is the chatbot's own demo ("samma produkt"). It is
   embedded in fas 5 (Voiceflow). Until then the flag stays false and the demo
   block falls back to /#kontakt (regel 5: conditional flag + fallback). */
const CHATBOT_WIDGET_ENABLED = false

/* All copy below is sourced from Fas0_produktdefinitioner.md §4 — verbatim or a
   light, approved rewrite into card form. Never authored here. */
const benefits = [
  {
    icon: MessageCircle,
    title: 'Svarar direkt, dygnet runt',
    description:
      'Besökare som får svar direkt stannar kvar. Chatten svarar på vanliga frågor om priser, öppettider och tjänster.',
  },
  {
    icon: UserPlus,
    title: 'Samlar in namn och nummer',
    description:
      'Chatten ser till att du får namn och nummer på den som vill bli kontaktad, så att du kan återkomma med ett färdigt svar.',
  },
  {
    icon: Sparkles,
    title: 'Svarar som du skulle svarat',
    description:
      'Vår chatt kan ditt företag, svarar som du skulle svarat och vet när den ska lämna över till dig.',
  },
]

const steps = [
  {
    title: 'Vi lär den ditt företag',
    description: 'Samma underlag som receptionisten. Köper du båda är det redan gjort.',
  },
  {
    title: 'Vi lägger in den på din hemsida',
    description: 'Fungerar oavsett vem som byggt sajten.',
  },
  {
    title: 'Den svarar och samlar leads',
    description: 'Varje intresserad besökare landar hos dig med namn, kontakt och ärende.',
  },
]

export function ChatbotContent() {
  return (
    <>
      <ProductHero
        label="Chatbot"
        title="Besökare som får svar direkt stannar kvar"
        description="En chatt på din hemsida som svarar på kundernas frågor direkt, dygnet runt, och samlar in deras uppgifter så att du kan återkomma med ett färdigt svar."
        primaryCta={{ label: 'Testa chatten', href: '#demo', icon: MessageCircle }}
        secondaryCta={{ label: 'Se pris', href: '#pris' }}
        chips={['Från 4 000 kr', 'Svarar dygnet runt', 'Samlar in leads']}
      />

      <ProductSection
        eyebrow="Vad du får"
        title="Ingen besökare lämnar sidan för att ingen svarade"
      >
        <ProductBenefits benefits={benefits} />
      </ProductSection>

      <ProductSection eyebrow="Så funkar det" title="Vi sätter upp allt åt dig" tone="muted">
        <ProductSteps steps={steps} />
      </ProductSection>

      <ProductBoundaries
        eyebrow="Bra att veta"
        title="Ärlig och tydlig, alltid"
        text="Chatten svarar utifrån det ni kommit överens om att den ska kunna. Den lovar inga priser utanför din prislista och gissar aldrig. När en fråga är för stor tar den kontaktuppgifter så att du kan ringa upp."
      />

      <ProductSection id="pris" eyebrow="Pris" title="Vad det kostar" tone="muted">
        <ProductPrice
          setup="4 000 kr"
          setupUnit="uppsättning"
          monthly="695 kr/mån"
          bullets={[
            'Tränad på din verksamhet',
            'Svarar dygnet runt',
            'Fungerar oavsett vem som byggt sajten',
          ]}
          cta={{ label: 'Testa chatten', href: '#demo' }}
        />
      </ProductSection>

      <ProductDemoCta
        id="demo"
        eyebrow="Testa själv"
        title="Testa chatten på sidan"
        description="Den du pratar med är samma produkt som du får på din egen hemsida."
        button={
          CHATBOT_WIDGET_ENABLED
            ? { label: 'Öppna chatten', href: '#chat' }
            : { label: 'Kontakta oss', href: '/#kontakt' }
        }
      />
    </>
  )
}
