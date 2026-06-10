'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import { SITE_CONFIG } from '@/lib/constants'
import type { FAQItem } from '@/lib/types'

const FAQS: FAQItem[] = [
  {
    id: '1',
    question: 'What should I do immediately after being arrested?',
    answer:
      'Do not panic, and do not speak to the police without a lawyer present. You have the constitutional right to remain silent and to legal representation. Ask the arresting officer for the grounds of your arrest and immediately inform a trusted family member. Contact a lawyer at the earliest — they can apply for bail or file for anticipatory bail. Remember: anything you say can and will be used against you in court. Stay calm, cooperate procedurally, but exercise your legal rights.',
  },
  {
    id: '2',
    question: 'How much does a legal consultation cost?',
    answer:
      'Our fee structure is transparent and agreed upon upfront — no hidden charges, no surprises. The consultation fee depends on the complexity of your matter. Retainer and appearance fees are clearly communicated before any work begins. We believe that knowing the cost should never add to the stress of an already difficult situation, so we ensure complete clarity from the first conversation.',
  },
  {
    id: '3',
    question: 'Can you handle cases across multiple courts in Delhi NCR?',
    answer:
      'Yes, absolutely. We regularly appear before the Delhi High Court, Patiala House Courts, Tis Hazari Courts, Dwarka District Courts, Saket Court Complex, and other courts across Delhi NCR. Our experience across multiple jurisdictions means we can identify the most strategic forum for your matter and represent you effectively wherever your case is heard.',
  },
  {
    id: '4',
    question: 'What is the difference between bail and anticipatory bail?',
    answer:
      'Regular bail is applied for after a person has already been arrested and is in custody — it seeks release while the case is pending. Anticipatory bail, under Section 438 CrPC, is sought before an arrest, when a person has reasonable apprehension of arrest. An experienced advocate will assess your situation and advise which is appropriate, then prepare the strongest possible application with the right grounds and supporting material.',
  },
  {
    id: '5',
    question: 'How long does a divorce case typically take in India?',
    answer:
      'A mutual consent divorce can be completed in as little as 6 months if both parties cooperate and have settled all ancillary matters. A contested divorce, however, can take several years depending on court schedules, the grounds raised, and complexity of issues like child custody, maintenance, and property division. We work to resolve matters as efficiently as possible while protecting your rights at every stage.',
  },
  {
    id: '6',
    question: 'What documents do I need for a property dispute case?',
    answer:
      'Key documents typically include the original sale deed, title documents, encumbrance certificate, property tax receipts, mutation records, possession documents, any prior agreements or correspondence, and identity proof. The exact requirements vary depending on the nature of your dispute. Contact us and we will provide a precise checklist tailored to your specific matter.',
  },
  {
    id: '7',
    question: 'Is everything I share with my lawyer confidential?',
    answer:
      'Absolutely. Attorney-client privilege is one of the most fundamental principles of law. Every communication you share — whether in person, over phone, or in writing — is held in strictest confidence. We do not disclose client information to any third party without your explicit consent, except as required by law. Your privacy and trust are paramount to everything we do.',
  },
  {
    id: '8',
    question: 'How do I file a complaint against domestic violence?',
    answer:
      'Under the Protection of Women from Domestic Violence Act, 2005, you can file a complaint with the nearest police station, a Protection Officer, or directly approach a Magistrate\'s court. We can help you file a Domestic Incident Report, apply for Protection Orders, Residence Orders, and Monetary Relief. You do not need to face this alone — reach out to us confidentially and we will guide you through every step with sensitivity and complete discretion.',
  },
]

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  const waHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section className="section-padding bg-black">
      <div className="site-container">
        <SectionHeading
          tag="Common Questions"
          title="Frequently Asked Questions"
          subtitle="Answers to what our clients ask most often."
          center
        />

        <div className="max-w-3xl mx-auto mt-14">
          {FAQS.map((faq, i) => (
            <div
              key={faq.id}
              className="border-b border-[#252525]"
              data-aos="fade-right"
              data-aos-delay={String(i * 50)}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                aria-expanded={openId === faq.id}
              >
                <span className="font-serif text-white text-base md:text-lg group-hover:text-gold transition-colors">
                  {faq.question}
                </span>
                <motion.i
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="fas fa-chevron-down text-gold text-sm flex-shrink-0"
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="text-gray-400 text-sm leading-relaxed pb-5 pr-8">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <i className="fab fa-whatsapp" aria-hidden="true" />
            WhatsApp Now
          </a>
          <Link href="/contact" className="btn-outline">
            <i className="fas fa-calendar-check" aria-hidden="true" />
            Book Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}
