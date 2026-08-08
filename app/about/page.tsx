import AboutHero from "@/components/about/AboutHero";
import AdvocateProfile from "@/components/about/AdvocateProfile";
import FAQSection from "@/components/about/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Govind Legal Associates",
  description:
    "Meet our team of 6 dedicated advocates practising across Delhi NCR courts.",
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
