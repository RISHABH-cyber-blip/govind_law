import AboutHero from "@/components/about/AboutHero";
import AdvocateProfile from "@/components/about/AdvocateProfile";
import FAQSection from "@/components/about/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Our Legal Team",
  description:
    "Meet Adv. Govind Mishra, Adv. Akansh Sharma, and our team of 6 advocates practising across Delhi NCR courts. Bar Council of Delhi enrolled. Criminal, civil, family law specialists.",
  alternates: { canonical: "https://mhlegal.in/about" },
  openGraph: {
    title: "About MH Legal | Advocate Team in Delhi NCR",
    description:
      "Meet our team of 6 dedicated advocates in Uttam Nagar, New Delhi.",
    url: "https://mhlegal.in/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AdvocateProfile />
      <FAQSection />
    </>
  );
}
