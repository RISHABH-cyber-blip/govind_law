import ContactForm from '@/components/contact/ContactForm'
import OfficeMap from '@/components/contact/OfficeMap'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Govind Legal Associates',
  description: 'Get in touch for a confidential legal consultation in Delhi NCR.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 text-center relative bg-black overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
        />
        <div className="site-container relative z-10">
          <span className="section-tag">Get In Touch</span>
          <h1 className="font-serif text-white text-5xl md:text-6xl font-semibold" data-aos="fade-up">
            Reach Out Today
          </h1>
          <div className="gold-line mx-auto mt-4" />
          <p className="text-gray-400 text-lg max-w-xl mx-auto mt-4">
            Your first step toward legal clarity starts with a conversation.
          </p>
        </div>
      </section>

      {/* Form + Map — Bootstrap grid per spec */}
      <section className="section-padding bg-black">
        <div className="site-container">
          <div className="row g-5">
            <div className="col-md-6" data-aos="fade-right">
              <ContactForm />
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <OfficeMap />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
