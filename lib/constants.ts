// ============================================================
// lib/constants.ts
// ALL personal/business data lives HERE ONLY.
// To change phone, WhatsApp, email, address — edit only this file.
// ============================================================

export const SITE_CONFIG = {
  firmName: 'Govind Legal Associates',
  advocateName: 'Advocate [Your Name]',

  // ---- PHONE NUMBERS (change these) ----
  phone1: '+91 XXXXXXXXXX',
  phone2: '+91 XXXXXXXXXX',

  // ---- WHATSAPP (change ONLY this number — no + sign, include country code) ----
  // Example: whatsappNumber: '919999065534'
  whatsappNumber: '918076062578',
  whatsappMessage: 'Hello, I need legal assistance. Please help me.',

  // ---- EMAIL ----
  email: 'youremail@gmail.com',

  // ---- ADDRESS ----
  address: 'Your Full Address, New Delhi – XXXXXX',

  // ---- GOOGLE MAPS ----
  // Get this from: maps.google.com → Share → Embed a map → copy the src value
  // Changing address above will NOT auto-update the map — you must also update this URL
  googleMapsEmbedURL:
    'https://maps.google.com/maps?q=New+Delhi&output=embed',

  // ---- SOCIAL MEDIA ----
  instagram1: 'https://instagram.com/YOUR_HANDLE',
  instagram2: 'https://instagram.com/YOUR_HANDLE_2',
  linkedin: 'https://linkedin.com/in/YOUR_PROFILE',
  facebook: 'https://facebook.com/YOUR_PAGE',
  twitter: 'https://x.com/YOUR_HANDLE',

  // ---- OTHER ----
  officeHours: 'Monday – Saturday: 10:00 AM – 7:00 PM',
  tagline: 'Justice Is Not a Luxury. It Is Your Right.',
  copyrightYear: '2026',
} as const
