import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import WhatsAppProvider from "@/components/layout/WhatsAppProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import DisclaimerModal from "@/components/layout/DisclaimerModal";
import CookieBanner from "@/components/layout/CookieBanner";
import AOSInit from "@/components/layout/AOSInit";
import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL("https://govind-law.vercel.app/"),
  title: {
    default: "MH Legal | Advocate in Uttam Nagar, Delhi NCR",
    template: "%s | MH Legal Delhi",
  },
  description:
    "MH Legal — experienced advocates in Uttam Nagar, New Delhi. Criminal law, bail applications, NDPS, family law, divorce, civil litigation. Delhi High Court & district courts. Call +91 99580 26303.",
  keywords: [
    "advocate Uttam Nagar",
    "lawyer Uttam Nagar Delhi",
    "criminal lawyer Delhi NCR",
    "bail application Delhi",
    "NDPS lawyer Delhi",
    "family lawyer Dwarka",
    "divorce lawyer Uttam Nagar",
    "civil lawyer New Delhi",
    "advocate near me Delhi",
    "MH Legal",
    "Govind Mishra advocate",
  ],
  authors: [{ name: "Adv. Govind Mishra" }],
  creator: "MH Legal",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://govind-law.vercel.app/",
    siteName: "MH Legal",
    title: "MH Legal | Advocate in Uttam Nagar, Delhi NCR",
    description:
      "Experienced advocates in Uttam Nagar, New Delhi. Criminal law, bail, NDPS, family law, civil litigation. Delhi High Court & district courts.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MH Legal - Advocate in Delhi NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MH Legal | Advocate in Uttam Nagar, Delhi NCR",
    description:
      "Experienced advocates in Uttam Nagar, New Delhi. Criminal, family, civil law.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://govind-law.vercel.app/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${garamond.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
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
        {/* Content-Security-Policy - disabled in development to prevent blocking Next.js HMR/assets
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' https://images.unsplash.com data:; frame-src https://maps.google.com; connect-src 'self';"
        />
        */}
      </head>
      <body className="bg-black text-white font-sans antialiased overflow-x-hidden">
        <WhatsAppProvider>
          <AOSInit />
          <DisclaimerModal />
          <CookieBanner />
          <Navbar />
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
          <Footer />
          <WhatsAppButton />
        </WhatsAppProvider>
      </body>
    </html>
  );
}
