import AboutHero from '@/components/about/AboutHero'
import AdvocateProfile from '@/components/about/AdvocateProfile'
import FAQSection from '@/components/about/FAQSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Govind Legal Associates',
  description: 'Meet our advocate and learn about our legal practice in Delhi NCR.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AdvocateProfile />
      <FAQSection />
    </>
  )
}
