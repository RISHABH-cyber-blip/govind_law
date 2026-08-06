'use client'

import React, { createContext, useContext, useState } from 'react'
import { SITE_CONFIG } from '@/lib/constants'

interface WhatsAppContextType {
  isOpen: boolean
  defaultMessage: string
  openWhatsAppModal: (customMessage?: string) => void
  closeWhatsAppModal: () => void
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined)

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [defaultMessage, setDefaultMessage] = useState<string>(SITE_CONFIG.whatsappMessage)

  const openWhatsAppModal = (customMessage?: string) => {
    if (customMessage) {
      setDefaultMessage(customMessage)
    } else {
      setDefaultMessage(SITE_CONFIG.whatsappMessage)
    }
    setIsOpen(true)
  }

  const closeWhatsAppModal = () => {
    setIsOpen(false)
  }

  return (
    <WhatsAppContext.Provider
      value={{
        isOpen,
        defaultMessage,
        openWhatsAppModal,
        closeWhatsAppModal,
      }}
    >
      {children}
    </WhatsAppContext.Provider>
  )
}

export function useWhatsAppModal() {
  const context = useContext(WhatsAppContext)
  if (!context) {
    throw new Error('useWhatsAppModal must be used within a WhatsAppProvider')
  }
  return context
}
