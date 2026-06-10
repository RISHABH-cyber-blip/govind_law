'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import type { ContactFormData, ContactAPIResponse } from '@/lib/types'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json: ContactAPIResponse = await res.json()

      if (json.success) {
        setStatus('success')
        reset()
        setTimeout(() => setStatus('idle'), 6000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-dark-card border border-[#252525] rounded-2xl p-8 md:p-10">
      <h3 className="font-serif text-white text-2xl mb-2">Send Us a Message</h3>
      <p className="text-text-gray text-sm mb-8">
        All fields are required. Your information is kept strictly confidential.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Full Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-xs uppercase tracking-widest text-text-gray mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your full name"
            className={`w-full bg-dark-gray border rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm outline-none focus:border-gold transition-colors ${
              errors.name ? 'border-red-500' : 'border-[#333]'
            }`}
            {...register('name', {
              required: 'Please enter your full name.',
              minLength: { value: 2, message: 'Name must be at least 2 characters.' },
            })}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-xs uppercase tracking-widest text-text-gray mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="yourname@gmail.com"
            className={`w-full bg-dark-gray border rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm outline-none focus:border-gold transition-colors ${
              errors.email ? 'border-red-500' : 'border-[#333]'
            }`}
            {...register('email', {
              required: 'Please enter your email address.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address (e.g. name@gmail.com).',
              },
            })}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="mb-8">
          <label htmlFor="message" className="block text-xs uppercase tracking-widest text-text-gray mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="Describe your legal situation in detail. The more information you provide, the better we can help you. (Minimum 20 characters)"
            className={`w-full bg-dark-gray border rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm outline-none focus:border-gold transition-colors resize-y min-h-[140px] ${
              errors.message ? 'border-red-500' : 'border-[#333]'
            }`}
            {...register('message', {
              required: 'Please write your message.',
              minLength: { value: 20, message: 'Message must be at least 20 characters.' },
              maxLength: { value: 2000, message: 'Message cannot exceed 2000 characters.' },
            })}
          />
          {errors.message && (
            <p className="text-red-400 text-xs mt-1.5">{errors.message.message}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn-primary justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <i className="fas fa-spinner fa-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane" aria-hidden="true" />
              Send Message
            </>
          )}
        </button>

        {/* Feedback messages */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 bg-green-900/30 border border-green-700/40 rounded-lg px-4 py-3 text-green-400 text-sm"
            >
              <i className="fas fa-circle-check mr-2" aria-hidden="true" />
              Your message has been sent. We will contact you within 24 hours.
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 bg-red-900/30 border border-red-700/40 rounded-lg px-4 py-3 text-red-400 text-sm"
            >
              <i className="fas fa-exclamation-circle mr-2" aria-hidden="true" />
              Something went wrong. Please try WhatsApp or call us directly.
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <p className="text-xs text-text-gray mt-4 text-center">
        <i className="fas fa-lock text-gold mr-1.5" aria-hidden="true" />
        Your information is secure and confidential. We never share client data.
      </p>
    </div>
  )
}
