// lib/types.ts

export interface ServiceItem {
  id: string
  icon: string
  title: string
  description: string
  bullets: string[]
  image: string
}

export interface TestimonialItem {
  id: string
  quote: string
  author: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  href: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactAPIResponse {
  success?: boolean
  error?: string
}
