'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWhatsAppModal } from '@/context/WhatsAppContext'
import { SITE_CONFIG } from '@/lib/constants'

const CASE_TYPES = [
  { label: 'Criminal', phrase: 'regarding a criminal law matter.' },
  { label: 'Family', phrase: 'regarding a family/divorce matter.' },
  { label: 'Civil', phrase: 'regarding a civil/property dispute.' },
  { label: 'NDPS', phrase: 'regarding an NDPS narcotics case.' },
  { label: 'Commercial', phrase: 'regarding a commercial law matter.' },
  { label: 'Consumer', phrase: 'regarding a consumer complaint.' },
]

export default function WhatsAppModal() {
  const { isOpen, defaultMessage, closeWhatsAppModal } = useWhatsAppModal()

  const [name, setName] = useState('')
  const [message, setMessage] = useState(defaultMessage)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')

  const modalRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  // Sync defaultMessage when modal opens
  useEffect(() => {
    if (isOpen) {
      setMessage(defaultMessage || SITE_CONFIG.whatsappMessage)
      setError('')
      setIsSending(false)

      // Lock body scroll
      document.body.style.overflow = 'hidden'

      // Focus textarea at the end of the text
      const timer = setTimeout(() => {
        if (messageInputRef.current) {
          messageInputRef.current.focus()
          const len = messageInputRef.current.value.length
          messageInputRef.current.setSelectionRange(len, len)
        }
      }, 150)

      return () => {
        clearTimeout(timer)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen, defaultMessage])

  // ESC key and Focus Trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        closeWhatsAppModal()
        return
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeWhatsAppModal])

  const handleChipClick = (phrase: string) => {
    let newMessage = message.trim()
    if (!newMessage) {
      newMessage = `Hello, I need help ${phrase}`
    } else {
      if (!newMessage.endsWith('.')) {
        newMessage = `${newMessage} ${phrase}`
      } else {
        newMessage = `${newMessage.slice(0, -1)} ${phrase}`
      }
    }

    if (newMessage.length > 200) {
      newMessage = newMessage.slice(0, 200)
    }

    setMessage(newMessage)

    if (messageInputRef.current) {
      messageInputRef.current.focus()
      const len = newMessage.length
      messageInputRef.current.setSelectionRange(len, len)
    }
  }

  const handleSend = () => {
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!message.trim()) {
      setError('Please enter a message.')
      return
    }

    setError('')
    setIsSending(true)

    const formattedText = `${name.trim()} here.\n\n${message.trim()}`
    const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(formattedText)}`

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer')
      setIsSending(false)
      closeWhatsAppModal()
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end md:items-end md:justify-end md:p-6">
          {/* Dark semi-transparent backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWhatsAppModal}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-modal-title"
            className="relative z-10 w-full md:max-w-md bg-[#111111] border-t md:border border-gold/30 rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Drag Handle Bar for mobile */}
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto my-2.5 md:hidden flex-shrink-0" />

            {/* Header */}
            <div className="px-6 py-4 border-b border-[#222222] flex items-center justify-between bg-black/40 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center border border-[#25D366]/30">
                  <i className="fab fa-whatsapp text-[#25D366] text-xl" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="whatsapp-modal-title" className="font-serif text-white font-semibold text-lg leading-tight">
                    Chat with us
                  </h3>
                  <p className="text-xs text-text-gray">Instant response from Advocate Team</p>
                </div>
              </div>
              <button
                onClick={closeWhatsAppModal}
                className="w-8 h-8 rounded-full bg-[#1a1a1a] hover:bg-[#252525] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <i className="fas fa-times text-sm" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 overflow-y-auto">
              {/* Name Field */}
              <div>
                <label htmlFor="wa-modal-name" className="block text-xs font-medium uppercase tracking-wider text-gold mb-1.5">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="wa-modal-name"
                  type="text"
                  maxLength={50}
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (error) setError('')
                  }}
                  className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              {/* Quick Case Type Chips */}
              <div>
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">
                  Select Case Type (Optional)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CASE_TYPES.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => handleChipClick(chip.phrase)}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#1e1e1e] hover:bg-gold/20 hover:text-gold text-gray-300 border border-[#333333] hover:border-gold/40 transition-all cursor-pointer"
                    >
                      + {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="wa-modal-message" className="block text-xs font-medium uppercase tracking-wider text-gold">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <span className="text-[11px] text-gray-500 font-mono">
                    {message.length} / 200
                  </span>
                </div>
                <textarea
                  id="wa-modal-message"
                  ref={messageInputRef}
                  maxLength={200}
                  rows={3}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                    if (error) setError('')
                  }}
                  placeholder="Describe your issue..."
                  className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gold transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-400 text-xs flex items-center gap-1.5 bg-red-950/40 border border-red-800/40 rounded p-2">
                  <i className="fas fa-circle-exclamation text-xs" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 pt-2 border-t border-[#222222] bg-black/40 flex-shrink-0">
              <button
                type="button"
                onClick={handleSend}
                disabled={isSending}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.99] text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center text-sm disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin text-base mr-2" aria-hidden="true" />
                    Opening WhatsApp...
                  </>
                ) : (
                  <>
                    <i className="fab fa-whatsapp text-lg mr-2" aria-hidden="true" />
                    Send on WhatsApp
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
