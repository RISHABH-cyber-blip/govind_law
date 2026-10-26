'use client'

import { motion } from 'framer-motion'
import { useWhatsAppModal } from '@/context/WhatsAppContext'

export default function WhatsAppButton() {
  const { isOpen, openWhatsAppModal } = useWhatsAppModal()

  // Hide floating button while modal is open
  if (isOpen) return null

  return (
    <motion.button
      type="button"
      onClick={() => openWhatsAppModal()}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl shadow-black/40 animate-pulse-wa cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <i className="fab fa-whatsapp text-white text-2xl sm:text-3xl" aria-hidden="true" />
    </motion.button>
  )
}
