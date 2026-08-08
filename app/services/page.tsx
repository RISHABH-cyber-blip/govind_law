import ServiceCard from "@/components/services/ServiceCard";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import TermsSection from "@/components/services/TermsSection";
import type { ServiceItem } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Legal Services | Govind Legal Associates",
  description:
    "Criminal Law, Family Law, Civil Law, NDPS Law, Commercial Law — Delhi NCR.",
};

const SERVICES: ServiceItem[] = [
  {
    id: "criminal",
    icon: "fas fa-gavel",
    title: "Criminal Law",
    description:
      "We provide comprehensive criminal defence from the moment of arrest through trial and appeal. Our approach is aggressive, strategic, and always focused on protecting your freedom and fundamental rights.",
    bullets: [
      "Bail & Anticipatory Bail Applications",
      "FIR Quashing Petitions",
      "Sessions Court & High Court Trials",
      "Cheque Bounce Cases (Section 138)",
      "Criminal Appeals & Revisions",
    ],
    image: "/images/services/criminal-law.jpg",
  },
  {
    id: "family",
    icon: "fas fa-heart",
    title: "Family Law",
    description:
      "Family disputes require both deep legal expertise and genuine human sensitivity. We handle your matter with care, always prioritising outcomes that protect you and the people you love.",
    bullets: [
      "Divorce (Mutual Consent & Contested)",
      "Maintenance & Alimony",
      "Child Custody & Visitation Rights",
      "Domestic Violence Protection Orders",
      "Property & Asset Division",
    ],
    image: "/images/services/family-law.jpg",
  },
  {
    id: "civil",
    icon: "fas fa-file-contract",
    title: "Civil Law",
    description:
      "From property disputes to contract enforcement, our civil litigation practice is built on meticulous preparation and strategic advocacy at every stage of the proceeding.",
    bullets: [
      "Property Title & Possession Disputes",
      "Injunctions & Stay Orders",
      "Recovery & Money Suits",
      "Specific Performance of Contracts",
      "Declaratory Suits & Succession",
    ],
    image: "/images/services/civil-law.jpg",
  },
  {
    id: "ndps",
    icon: "fas fa-scale-balanced",
    title: "NDPS Law",
    description:
      "NDPS cases demand specialised expertise and a precise understanding of the law. We craft targeted defence strategies for bail and trial in even the most complex narcotics matters.",
    bullets: [
      "NDPS Bail Applications (Regular & Special)",
      "Default Bail Under NDPS Act",
      "Trial Defence & Cross-Examination",
      "Challenging Improper Search & Seizure",
      "Appeals Against Conviction",
    ],
    image: "/images/services/NDPS-LAW.jpg",
  },
  {
    id: "commercial",
    icon: "fas fa-briefcase",
    title: "Commercial Law",
    description:
      "Business disputes require speed, precision, and a clear-eyed understanding of commercial realities. We provide decisive legal support for companies and individuals navigating complex commercial matters.",
    bullets: [
      "Business Disputes & Commercial Litigation",
      "Contract Enforcement & Breach Claims",
      "Corporate Recovery Proceedings",
      "Partnership & Shareholder Disputes",
      "Injunctions & Interim Relief",
    ],
    image: "/images/services/commercial-law.jpg",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-36 pb-16 text-center relative bg-black overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="site-container relative z-10">
          <span className="section-tag">What We Do</span>
          <h1
            className="font-serif text-white text-5xl md:text-6xl font-semibold"
            data-aos="fade-up"
          >
            Our Legal Services
          </h1>
          <div className="gold-line mx-auto mt-4" />
        </div>
      </section>

      {/* Service blocks */}
      {SERVICES.map((service, i) => (
        <ServiceCard key={service.id} {...service} index={i} />
      ))}

      <WhyChooseUs />
      <TermsSection />
    </>
  );
}
