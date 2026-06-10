import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

const PRACTICE_AREAS = [
  'Criminal Law',
  'Family Law',
  'Civil Law',
  'NDPS Law',
  'Commercial Law',
  'Consumer Law',
]

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-gray border-t border-[#252525]">
      <div className="site-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                <i className="fas fa-scale-balanced text-black text-xs" aria-hidden="true" />
              </div>
              <span className="font-serif text-lg font-semibold text-white">
                {SITE_CONFIG.firmName.split(' ')[0]}{' '}
                <span className="text-gold">{SITE_CONFIG.firmName.split(' ').slice(1).join(' ')}</span>
              </span>
            </div>
            <p className="text-text-gray text-sm leading-relaxed mb-5">
              We provide trusted legal solutions across Delhi NCR — confidential, result-oriented,
              and always fighting for your rights.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: 'fab fa-instagram', href: SITE_CONFIG.instagram1, label: 'Instagram' },
                { icon: 'fab fa-instagram', href: SITE_CONFIG.instagram2, label: 'Instagram 2' },
                { icon: 'fab fa-x-twitter', href: SITE_CONFIG.twitter, label: 'X/Twitter' },
                { icon: 'fab fa-linkedin-in', href: SITE_CONFIG.linkedin, label: 'LinkedIn' },
                { icon: 'fab fa-facebook-f', href: SITE_CONFIG.facebook, label: 'Facebook' },
              ].map((s) => (
                <a
                  key={s.href + s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 border border-[#333] rounded flex items-center justify-center text-text-gray hover:border-gold hover:text-gold transition-colors"
                >
                  <i className={s.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-white mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-text-gray text-sm hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-serif text-lg text-white mb-5">Practice Areas</h4>
            <ul className="space-y-3">
              {PRACTICE_AREAS.map((area) => (
                <li key={area}>
                  <Link
                    href="/services"
                    className="text-text-gray text-sm hover:text-gold transition-colors"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-white mb-5">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <i className="fas fa-location-dot text-gold text-sm mt-1 flex-shrink-0" aria-hidden="true" />
                <span className="text-text-gray text-sm leading-relaxed">{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-phone text-gold text-sm mt-1 flex-shrink-0" aria-hidden="true" />
                <div className="text-sm">
                  <a href={`tel:${SITE_CONFIG.phone1}`} className="text-text-gray hover:text-gold transition-colors block">
                    {SITE_CONFIG.phone1}
                  </a>
                  <a href={`tel:${SITE_CONFIG.phone2}`} className="text-text-gray hover:text-gold transition-colors block">
                    {SITE_CONFIG.phone2}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-envelope text-gold text-sm mt-1 flex-shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-text-gray text-sm hover:text-gold transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-clock text-gold text-sm mt-1 flex-shrink-0" aria-hidden="true" />
                <span className="text-text-gray text-sm">{SITE_CONFIG.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#252525] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-gray text-xs">
            © {SITE_CONFIG.copyrightYear} {SITE_CONFIG.firmName}. All rights reserved.
          </p>
          <p className="text-text-gray text-xs">
            For informational purposes only. Not legal advice. As per Bar Council of India rules.
          </p>
        </div>
      </div>
    </footer>
  )
}
