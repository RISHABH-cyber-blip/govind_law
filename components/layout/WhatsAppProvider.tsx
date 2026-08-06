'use client'

import React from 'react'
import { WhatsAppProvider as Provider } from '@/context/WhatsAppContext'
import WhatsAppModal from './WhatsAppModal'

export default function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      {children}
      <WhatsAppModal />
    </Provider>
  )
}
