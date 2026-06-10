'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

// TODO: Replace all placeholder content below with your actual legal terms
const TERMS = [
  {
    id: 'cookies',
    title: 'Cookies Policy',
    content:
      'We use cookies to improve user experience and analyse site traffic. Cookies are small data files stored on your browser. We use session cookies (which expire when you close the browser) and persistent cookies (which remain for a set period). You may disable cookies through your browser settings, though this may affect site functionality. By continuing to use this site, you consent to our use of cookies as described herein.',
  },
  {
    id: 'licence',
    title: 'Licence',
    content:
      'Unless otherwise stated, this firm owns the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access material from this website for your own personal use only, subject to restrictions set in these terms and conditions. You must not republish, sell, rent, sub-license, reproduce, or redistribute material from this website without prior written consent.',
  },
  {
    id: 'hyperlinks',
    title: 'Hyperlinks to Our Content',
    content:
      'Organisations may link to our website without prior written approval provided the link is not deceptive, does not falsely imply sponsorship or endorsement, and fits within the context of the linking party\'s site. We reserve the right to request removal of any links at any time, and you agree to immediately remove all links upon such request.',
  },
  {
    id: 'liability',
    title: 'Content Liability',
    content:
      'We shall not be held responsible for any content that appears on external websites that link to or from this website. You agree to protect and defend us against all claims that arise from or are based on your website or content. No link shall appear on any website that may be interpreted as libellous, obscene, criminal, or which infringes or otherwise violates any third party rights.',
  },
  {
    id: 'rights',
    title: 'Reservation of Rights',
    content:
      'We reserve the right to request that you remove all links or any particular link to our website at any time. You agree to immediately remove all links upon such a request. We also reserve the right to amend these terms and conditions and our linking policy at any time. By continuously linking to our website, you agree to be bound by and follow these linking terms and conditions.',
  },
  {
    id: 'removal',
    title: 'Removal of Links from Our Website',
    content:
      'If you find any link on our website that is offensive for any reason, you are free to contact and inform us at any time. We will consider requests to remove links but we are not obligated to do so or to respond to you directly. We do not warrant that the information on this website is correct, complete, or accurate; nor do we promise to ensure that the website remains available or kept up to date.',
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    content:
      'To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will exclude or limit our liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any liability that cannot be excluded under applicable law. The information on this website is provided for general informational purposes only and does not constitute legal advice.',
  },
]

export default function TermsSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId((p) => (p === id ? null : id))

  return (
    <section className="section-padding bg-dark-card">
      <div className="site-container">
        <SectionHeading
          tag="Policies"
          title="Terms &amp; Conditions"
          subtitle="Please read our policies carefully. Content is placeholder — replace before going live."
          center
        />

        <div className="max-w-3xl mx-auto mt-14">
          {TERMS.map((term) => (
            <div key={term.id} className="border-b border-[#252525]">
              <button
                onClick={() => toggle(term.id)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                aria-expanded={openId === term.id}
              >
                <span className="font-serif text-white text-base md:text-lg group-hover:text-gold transition-colors">
                  {term.title}
                </span>
                <motion.i
                  animate={{ rotate: openId === term.id ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="fas fa-chevron-down text-gold text-sm flex-shrink-0"
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {openId === term.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="text-gray-400 text-sm leading-relaxed pb-5 pr-8">{term.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
