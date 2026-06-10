'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/constants'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const waHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? 'bg-black/95 backdrop-blur-md border-b border-[#1a1a1a] py-3' : 'py-5'
        }`}
      >
        <div className="site-container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
              <i className="fas fa-scale-balanced text-black text-sm" aria-hidden="true" />
            </div>
            <span className="font-serif text-xl font-semibold text-white">
              {SITE_CONFIG.firmName.split(' ')[0]}{' '}
              <span className="text-gold">{SITE_CONFIG.firmName.split(' ').slice(1).join(' ')}</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <motion.div key={link.href} whileHover={{ color: '#C9A84C' }}>
                  <Link
                    href={link.href}
                    className={`text-sm font-sans transition-colors duration-200 relative pb-1 ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phone1}`}
              className="btn-outline text-sm py-2 px-5"
            >
              <i className="fas fa-phone text-xs" aria-hidden="true" />
              Call Now
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2 px-5"
            >
              <i className="fab fa-whatsapp" aria-hidden="true" />
              WhatsApp
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <i className="fas fa-bars text-xl" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-6 right-6 text-gray-400 text-2xl"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <i className="fas fa-times" aria-hidden="true" />
            </button>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl text-white hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4"
              onClick={() => setMobileOpen(false)}
            >
              <i className="fab fa-whatsapp" aria-hidden="true" />
              WhatsApp Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
