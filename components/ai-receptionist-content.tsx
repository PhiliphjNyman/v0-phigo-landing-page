'use client'

import { PhoneCall, CalendarCheck, Voicemail, Phone } from 'lucide-react'
import { ProductHero } from '@/components/product-hero'
import { ProductSection } from '@/components/product/product-section'
import { ProductBenefits } from '@/components/product/product-benefits'
import { ProductSteps } from '@/components/product/product-steps'
import { ProductBoundaries } from '@/components/product/product-boundaries'
import { ProductPrice } from '@/components/product/product-price'
import { ProductFaq } from '@/components/product/product-faq'
import { ProductDemoCta } from '@/components/product/product-demo-cta'

/* Demo number for "Ring och prova själv". null until it is set in fas 5 — the
   demo block then shows the placeholder note + fallback, never a dead tel:. */
const RECEPTIONIST_PHONE: string | null = null

const benefits = [
  {
    icon: PhoneCall,
    title: 'Svarar direkt, dygnet runt',
    description:
      'Varje samtal besvaras direkt, även när du står mitt i ett jobb, har stängt eller är ledig.',
  },
  {
    icon: CalendarCheck,
    title: 'Bokar in kunden i din kalender',
    description: 'Bokningar hamnar i din kalender och du får besked om varje samtal.',
  },
  {
    icon: Voicemail,
    title: 'Låter naturlig, aldrig en röstbrevlåda',
    description:
      'Den som möts av en röstbrevlåda ringer nästa företag i listan. Vår receptionist svarar direkt och låter naturlig.',
  },
]

const steps = [
  {
    title: 'Vi lär den ditt företag',
    description: 'Tjänster, öppettider, hur den ska låta och vad den ska fråga om.',
  },
  {
    title: 'Vi kopplar in den på ditt nummer',
    description:
      'Du behåller ditt vanliga nummer. Receptionisten tar samtalen du inte hinner svara på.',
  },
  {
    title: 'Den svarar, bokar och rapporterar',
    description:
      'Bokning i kalendern, SMS-bekräftelse till den som ringde, sammanfattning till dig.',
  },
]

const faqs = [
  {
    icon: Phone,
    question: 'Kan den ta alla mina samtal när jag är ledig?',
    answer:
      'Ja. Normalt tar den bara samtalen du inte hinner svara på, men du kan enkelt låta den ta allt, till exempel under semestern.',
  },
]

export function AiReceptionistContent() {
  return (
    <>
      <ProductHero
        label="AI-Receptionist"
        title="Sluta tappa kunder för att du inte kan svara"
        description="En receptionist som svarar i din telefon dygnet runt, bokar in kunder i din kalender och skickar dig en sammanfattning. Du jobbar vidare, den missar aldrig ett samtal."
        primaryCta={{ label: 'Ring och prova själv', href: '#demo', icon: Phone }}
        secondaryCta={{ label: 'Se pris', href: '#pris' }}
        chips={['Från 7 000 kr', 'Svarar dygnet runt', '300 min/mån ingår']}
      />

      <ProductSection
        eyebrow="Vad du får"
        title="Varje samtal besvaras, även när du inte kan svara"
      >
        <ProductBenefits benefits={benefits} />
      </ProductSection>

      <ProductSection eyebrow="Så funkar det" title="Vi sätter upp allt åt dig" tone="muted">
        <ProductSteps steps={steps} />
      </ProductSection>

      <ProductBoundaries
        eyebrow="Bra att veta"
        title="Ärlig och tydlig, alltid"
        text="Receptionisten presenterar sig alltid som digital assistent, den låtsas aldrig vara en människa. Den bokar tider, svarar på vanliga frågor och tar meddelanden. Den lovar inga priser utanför din prislista och gissar aldrig. Är den osäker tar den ett meddelande så att du kan ringa upp."
      />

      <ProductSection id="pris" eyebrow="Pris" title="Vad det kostar" tone="muted">
        <ProductPrice
          setup="7 000 kr"
          setupUnit="uppsättning"
          monthly="1 495 kr/mån"
          lead="300 minuters samtalstid per månad ingår. Det motsvarar ungefär 100 till 150 samtal och räcker gott för de flesta småföretag. Ringer det mer än så hör vi av oss och hittar en nivå som passar."
          bullets={[
            'Personlig uppsättning',
            'Svarar dygnet runt',
            'Du godkänner hur den låter först',
          ]}
          cta={{ label: 'Ring och prova själv', href: '#demo' }}
        />
      </ProductSection>

      <ProductSection eyebrow="Vanliga frågor" title="Vanliga frågor">
        <ProductFaq faqs={faqs} />
      </ProductSection>

      <ProductDemoCta
        id="demo"
        eyebrow="Testa själv"
        title="Ring och prova själv"
        description="Vi sätter upp allt åt dig och du godkänner hur den låter innan den tar ett enda riktigt samtal."
        phone={{ number: RECEPTIONIST_PHONE, placeholderNote: 'Demo-numret läggs in inom kort.' }}
        button={{ label: 'Kontakta oss', href: '/#kontakt' }}
      />
    </>
  )
}
