import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { CaseStudies } from '@/components/case-studies'
import { OfferSection } from '@/components/offer-section'
import { ProcessSection } from '@/components/process-section'
import { WhyPhigo } from '@/components/why-phigo'
import { FaqSection } from '@/components/faq-section'
import { FinalCta } from '@/components/final-cta'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CaseStudies />
        <OfferSection />
        <ProcessSection />
        <WhyPhigo />
        <FaqSection />
        <FinalCta />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
