import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ProductOverview } from '@/components/product-overview'
import { GuideSection } from '@/components/guide-section'
import { CaseStudies } from '@/components/case-studies'
import { WhyPhigo } from '@/components/why-phigo'
import { AboutSection } from '@/components/about-section'
import { FinalCta } from '@/components/final-cta'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProductOverview />
        <GuideSection />
        <CaseStudies />
        <WhyPhigo />
        <AboutSection />
        <FinalCta />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
