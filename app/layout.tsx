import type { Metadata } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { SITE_CONFIG } from '@/lib/constants'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import DisclaimerModal from '@/components/layout/DisclaimerModal'
import CookieBanner from '@/components/layout/CookieBanner'
import AOSInit from '@/components/layout/AOSInit'
import PageTransitionWrapper from '@/components/layout/PageTransitionWrapper'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const garamond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${SITE_CONFIG.firmName} | Legal Services Delhi NCR`,
  description:
    'Trusted legal advocates in Delhi NCR. Criminal Law, Family Law, Civil Law, NDPS, Commercial Law. Confidential & result-oriented legal representation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${garamond.variable}`}>
      <head>
        {/* Font Awesome 6 */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
        />
        {/* Bootstrap 5 CSS (grid only — used on Services & Contact pages) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css"
          crossOrigin="anonymous"
        />
        {/* AOS CSS */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
          crossOrigin="anonymous"
        />
        {/* Content-Security-Policy */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' https://images.unsplash.com data:; frame-src https://maps.google.com; connect-src 'self';"
        />
      </head>
      <body className="bg-black text-white font-sans antialiased overflow-x-hidden">
        <AOSInit />
        <DisclaimerModal />
        <CookieBanner />
        <Navbar />
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
