'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/constants'

import { useWhatsAppModal } from '@/context/WhatsAppContext'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openWhatsAppModal } = useWhatsAppModal()

  // Track scroll position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileOpen(false)
      }
      window.addEventListener('keydown', onKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/95 backdrop-blur-md border-b border-[#1a1a1a] py-3' : 'bg-black/60 backdrop-blur-md py-3.5 sm:py-4 md:py-5'
        }`}
      >
        <div className="site-container flex items-center justify-between gap-3 w-full">
          {/* Logo - Flexible with truncate to never push hamburger off screen */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 flex-shrink min-w-0 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <i className="fas fa-scale-balanced text-black text-xs sm:text-sm" aria-hidden="true" />
            </div>
            <span className="font-serif text-base sm:text-lg lg:text-xl font-semibold text-white tracking-tight truncate">
              {SITE_CONFIG.firmName}
            </span>
          </Link>

          {/* Desktop nav (Large screens: 1024px+) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <div key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={`text-sm font-sans transition-colors duration-200 relative pb-1 ${
                      isActive ? 'text-white font-medium' : 'text-gray-300 hover:text-gold'
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
                </div>
              )
            })}
          </nav>

          {/* Desktop CTA (Large screens: 1024px+) */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href={`tel:${SITE_CONFIG.phone1}`}
              className="btn-outline text-sm py-2 px-4 hover:border-gold"
            >
              <i className="fas fa-phone text-xs" aria-hidden="true" />
              Call Now
            </a>
            <button
              type="button"
              onClick={() => openWhatsAppModal()}
              className="btn-primary text-sm py-2 px-5 cursor-pointer"
            >
              <i className="fab fa-whatsapp" aria-hidden="true" />
              WhatsApp
            </button>
          </div>

          {/* Tablet & Mobile Right Actions (up to 1023px) */}
          <div className="flex items-center gap-2 lg:hidden flex-shrink-0">
            {/* Quick Call button on tablet screens (768px - 1023px) */}
            <a
              href={`tel:${SITE_CONFIG.phone1}`}
              className="hidden md:inline-flex items-center gap-1.5 btn-outline text-xs py-1.5 px-3 border-white/30"
              aria-label="Call Advocate"
            >
              <i className="fas fa-phone text-xs text-gold" aria-hidden="true" />
              <span>Call</span>
            </a>

            {/* Hamburger Button - always visible and never cut off */}
            <button
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-gold/40 flex items-center justify-center text-white hover:text-gold active:scale-95 transition-all flex-shrink-0 cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <i className="fas fa-bars text-lg" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[10000] bg-black/98 backdrop-blur-2xl overflow-y-auto flex flex-col justify-between py-6 px-5 sm:px-8"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Top Bar with Brand & Close Button */}
            <div className="w-full max-w-md mx-auto flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                  <i className="fas fa-scale-balanced text-black text-xs" aria-hidden="true" />
                </div>
                <span className="font-serif text-lg font-semibold text-white">
                  {SITE_CONFIG.firmName}
                </span>
              </div>

              <button
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-gray-300 hover:text-white text-lg transition-all cursor-pointer"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <i className="fas fa-times" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation links - responsive and centered */}
            <nav className="flex flex-col items-center gap-2 sm:gap-3 w-full max-w-md mx-auto py-6 my-auto">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-serif text-xl sm:text-2xl transition-all py-2.5 px-4 rounded-xl text-center w-full ${
                      isActive
                        ? 'text-gold font-semibold bg-gold/15 border border-gold/30'
                        : 'text-gray-200 hover:text-gold active:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Bottom actions */}
            <div className="w-full max-w-md mx-auto border-t border-white/10 pt-4 flex flex-col gap-2.5 flex-shrink-0">
              <a
                href={`tel:${SITE_CONFIG.phone1}`}
                className="btn-outline justify-center text-sm py-3 px-5 w-full text-center"
              >
                <i className="fas fa-phone text-xs mr-2" aria-hidden="true" />
                Call {SITE_CONFIG.phone1}
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  openWhatsAppModal()
                }}
                className="btn-primary justify-center text-sm py-3 px-5 w-full cursor-pointer"
              >
                <i className="fab fa-whatsapp text-lg mr-2" aria-hidden="true" />
                WhatsApp Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
