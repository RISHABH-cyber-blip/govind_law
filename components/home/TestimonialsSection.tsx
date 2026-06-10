'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { SITE_CONFIG } from '@/lib/constants'

const TESTIMONIALS = [
  {
    quote:
      'Exceptional legal support. My case was handled with complete professionalism and transparency. The outcome exceeded every expectation I had.',
    author: '— Business Client, Delhi NCR',
  },
  {
    quote:
      'They understood my situation immediately and gave me clear legal options. I felt guided at every step and never had to worry about what came next.',
    author: '— Client, Delhi High Court',
  },
  {
    quote:
      'Reliable, confidential, and result-oriented. I felt protected throughout the entire legal process. I would recommend them without any hesitation.',
    author: '— Family Law Client, Dwarka',
  },
]

export default function TestimonialsSection() {
  const [showPhone, setShowPhone] = useState(false)

  return (
    <section className="section-padding bg-dark-card">
      <div className="site-container">
        <SectionHeading
          tag="Client Stories"
          title="What Our Clients Say"
          subtitle="Discover the impact of trusted legal representation."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-black border border-[#252525] border-l-4 border-l-gold rounded-xl p-7"
              data-aos="fade-up"
              data-aos-delay={String(i * 100)}
            >
              <div className="text-gold text-sm mb-4 tracking-widest">★★★★★</div>
              <p className="font-garamond italic text-gray-200 text-lg leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-text-gray text-xs uppercase tracking-widest">{t.author}</p>
            </div>
          ))}
        </div>

        {/* Talk to your lawyer button with phone popup */}
        <div className="text-center mt-12 relative inline-block w-full">
          <div className="relative inline-block">
            <AnimatePresence>
              {showPhone && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-dark-card border border-gold/40 rounded-xl px-6 py-4 min-w-[260px] z-50 shadow-xl"
                >
                  <p className="text-text-gray text-xs mb-2 uppercase tracking-widest">Call us directly</p>
                  <a
                    href={`tel:${SITE_CONFIG.phone1}`}
                    className="block font-serif text-gold text-xl font-semibold hover:text-gold-light transition-colors"
                  >
                    <i className="fas fa-phone mr-2 text-base" aria-hidden="true" />
                    {SITE_CONFIG.phone1}
                  </a>
                  <a
                    href={`tel:${SITE_CONFIG.phone2}`}
                    className="block font-serif text-gold text-xl font-semibold mt-1 hover:text-gold-light transition-colors"
                  >
                    <i className="fas fa-phone mr-2 text-base" aria-hidden="true" />
                    {SITE_CONFIG.phone2}
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowPhone((p) => !p)}
              className="btn-primary text-base py-4 px-10"
            >
              <i className="fas fa-phone" aria-hidden="true" />
              Talk to Your Lawyer
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
