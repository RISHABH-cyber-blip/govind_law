'use client'

import { motion } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/constants'

export default function WhatsAppButton() {
  const waHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappMessage
  )}`

  return (
    <motion.a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[990] w-[58px] h-[58px] rounded-full bg-[#25D366] flex items-center justify-center shadow-lg animate-pulse-wa"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <i className="fab fa-whatsapp text-white text-3xl" aria-hidden="true" />
    </motion.a>
  )
}
