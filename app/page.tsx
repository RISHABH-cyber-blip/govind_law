import HeroSection from "@/components/home/HeroSection";
import AdvocateSection from "@/components/home/AdvocateSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import VideoInsightsSection from "@/components/home/VideoInsightsSection";
import Script from "next/script";

export default function HomePage() {
  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LegalService", "LocalBusiness"],
            name: "MH Legal",
            alternateName: "Govind Legal Associates",
            description:
              "MH Legal is a Delhi NCR law firm led by Adv. Govind Mishra offering criminal law, bail applications, NDPS cases, family law, divorce, civil litigation, property disputes, and consumer matters.",
            url: "https://govind-law.vercel.app/",
            logo: "https://govind-law.vercel.app/images/logo.png",
            image: "https://govind-law.vercel.app/images/og-image.jpg",
            telephone: "+919958026303",
            email: "mhlegalcontact@gmail.com",
            priceRange: "₹₹",
            currenciesAccepted: "INR",
            paymentAccepted: "Cash, Bank Transfer, UPI",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "A-53, Gulab Bagh, Main Najafgarh Road, Near Pillar No. 750",
              addressLocality: "Uttam Nagar",
              addressRegion: "Delhi",
              postalCode: "110059",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "28.6219",
              longitude: "77.0529",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "10:00",
                closes: "19:00",
              },
            ],
            areaServed: [
              "Uttam Nagar",
              "Dwarka",
              "Janakpuri",
              "Delhi",
              "New Delhi",
              "Delhi NCR",
              "Noida",
              "Gurgaon",
              "Faridabad",
              "Ghaziabad",
            ],
            serviceArea: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: "28.6219",
                longitude: "77.0529",
              },
              geoRadius: "50000",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Legal Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Criminal Defence & Bail Application",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "NDPS Cases & Narcotics Law",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Family Law & Divorce",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Civil Litigation & Property Disputes",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Cheque Bounce Cases",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Consumer Forum Matters",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Writ Petitions & PIL",
                  },
                },
              ],
            },
            employee: [
              {
                "@type": "Person",
                name: "Adv. Govind Mishra",
                jobTitle: "Advocate",
                hasCredential: "LL.B., Bar Council of Delhi",
              },
              {
                "@type": "Person",
                name: "Adv. Akansh Sharma",
                jobTitle: "Advocate",
                hasCredential: "LL.B., Bar Council of Delhi",
              },
            ],
            sameAs: ["https://www.google.com/search?kgmid=/g/11zwn054hm"],
          }),
        }}
      />
      <HeroSection />
      <AdvocateSection />
      <ServicesSection />
      <TestimonialsSection />
      <VideoInsightsSection />
    </>
  );
}
