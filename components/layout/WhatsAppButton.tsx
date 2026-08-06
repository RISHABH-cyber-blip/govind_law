'use client'

import { motion } from 'framer-motion'
import { useWhatsAppModal } from '@/context/WhatsAppContext'

export default function WhatsAppButton() {
  const { openWhatsAppModal } = useWhatsAppModal()

  return (
    <motion.button
      type="button"
      onClick={() => openWhatsAppModal()}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[990] w-[58px] h-[58px] rounded-full bg-[#25D366] flex items-center justify-center shadow-lg animate-pulse-wa cursor-pointer"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <i className="fab fa-whatsapp text-white text-3xl" aria-hidden="true" />
    </motion.button>
  )
}
