'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

interface BlogPostProps {
  category: string
  title: string
  date: string
  readTime: string
  children: React.ReactNode
}

export default function BlogPost({ category, title, date, readTime, children }: BlogPostProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-12 bg-black relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
        />
        <div className="site-container relative z-10 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-text-gray mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <i className="fas fa-chevron-right text-[10px]" aria-hidden="true" />
            <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
            <i className="fas fa-chevron-right text-[10px]" aria-hidden="true" />
            <span className="text-gold truncate">{title}</span>
          </nav>

          <span className="text-xs uppercase tracking-[2px] text-gold font-medium block mb-4">{category}</span>
          <h1 className="font-serif text-white text-4xl md:text-5xl font-semibold leading-tight max-w-3xl" data-aos="fade-up">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 mt-5 text-sm text-text-gray">
            <span><i className="fas fa-user mr-2 text-gold" aria-hidden="true" />High-End Lawyers</span>
            <span><i className="fas fa-calendar mr-2 text-gold" aria-hidden="true" />{date}</span>
            <span><i className="fas fa-clock mr-2 text-gold" aria-hidden="true" />{readTime}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="pb-24 bg-black">
        <div className="site-container max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">

            {/* Main content */}
            <article className="prose-custom">
              {children}

              {/* Call Now sticky button */}
              <div className="mt-10">
                <a
                  href={`tel:${SITE_CONFIG.phone1}`}
                  className="inline-flex items-center gap-3 bg-gold text-black font-bold py-4 px-8 rounded-full text-base hover:bg-gold-light transition-colors shadow-lg"
                  style={{ boxShadow: '0 8px 32px rgba(201,168,76,0.3)' }}
                >
                  <i className="fas fa-phone" aria-hidden="true" />
                  Call Now for Legal Advice
                </a>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="sticky top-28 space-y-6">
              {/* Contact card */}
              <div className="bg-dark-card border border-[#252525] rounded-2xl p-6">
                <h3 className="font-serif text-white text-lg mb-3">Need Legal Help?</h3>
                <p className="text-text-gray text-sm leading-relaxed mb-5">
                  Contact us today for a confidential consultation with our advocate.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="block text-center bg-gold text-black font-bold py-3 px-4 rounded-full text-sm hover:bg-gold-light transition-colors"
                  >
                    <i className="fas fa-calendar-check mr-2" aria-hidden="true" />
                    Book Consultation
                  </Link>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center border border-white/20 text-white font-medium py-3 px-4 rounded-full text-sm hover:border-gold hover:text-gold transition-colors"
                  >
                    <i className="fab fa-whatsapp mr-2" aria-hidden="true" />
                    WhatsApp Now
                  </a>
                </div>
              </div>

              {/* Office hours card */}
              <div className="bg-dark-card border border-[#252525] rounded-2xl p-6">
                <h4 className="font-serif text-white text-base mb-3">Office Hours</h4>
                <p className="text-text-gray text-sm">{SITE_CONFIG.officeHours}</p>
                <a
                  href={`tel:${SITE_CONFIG.phone1}`}
                  className="flex items-center gap-2 mt-3 text-gold text-sm hover:text-gold-light transition-colors"
                >
                  <i className="fas fa-phone text-xs" aria-hidden="true" />
                  {SITE_CONFIG.phone1}
                </a>
              </div>

              {/* More posts */}
              <div className="bg-dark-card border border-[#252525] rounded-2xl p-6">
                <h4 className="font-serif text-white text-base mb-4">More Articles</h4>
                <div className="space-y-3">
                  <Link href="/blog/civil-case" className="block text-text-gray text-sm hover:text-gold transition-colors leading-snug">
                    → How to File a Civil Case in Delhi
                  </Link>
                  <Link href="/blog/ndps-bail" className="block text-text-gray text-sm hover:text-gold transition-colors leading-snug">
                    → How to Get Bail in NDPS Cases in Delhi
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Prose styles */}
      <style jsx global>{`
        .prose-custom h2 {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: #C9A84C;
          margin: 2.5rem 0 1rem;
        }
        .prose-custom h3 {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #ffffff;
          margin: 2rem 0 0.75rem;
        }
        .prose-custom p {
          color: #d1d5db;
          font-size: 0.97rem;
          line-height: 1.9;
          margin-bottom: 1.2rem;
        }
        .prose-custom ul,
        .prose-custom ol {
          color: #d1d5db;
          font-size: 0.97rem;
          padding-left: 1.5rem;
          margin-bottom: 1.2rem;
        }
        .prose-custom li {
          margin-bottom: 0.5rem;
          line-height: 1.8;
        }
        .prose-custom strong {
          color: #ffffff;
        }
        .prose-custom .lead {
          font-size: 1.1rem;
          color: #e5e7eb;
          line-height: 1.8;
          border-left: 3px solid #C9A84C;
          padding-left: 1.25rem;
          margin-bottom: 2rem;
        }
      `}</style>
    </>
  )
}
