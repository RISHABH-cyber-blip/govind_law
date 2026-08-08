import Image from "next/image";
import Link from "next/link";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { SITE_CONFIG } from "@/lib/constants";

export default function AdvocateSection() {
  return (
    <section className="section-padding bg-dark-card">
      <div className="site-container">
        {/* Section heading */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="section-tag">Our Leading Advocates</span>
          <div className="gold-line mx-auto" />
          <h2 className="font-serif text-white text-4xl md:text-5xl font-semibold leading-tight mt-4">
            Your Case Is In
            <br />
            Capable Hands
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            Led by experienced advocates with proven track records across
            Delhi's most prominent courts — every client receives direct,
            personal attention.
          </p>
        </div>

        {/* Two priority advocates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* ── Advocate 1: Govind Mishra ── */}
          <div
            className="bg-black border border-[#252525] rounded-2xl overflow-hidden"
            data-aos="fade-right"
          >
            <div className="relative h-[380px]">
              <Image
                src="/images/team/govind-mishra.jpg"
                alt="Adv. Govind Mishra"
                fill
                className="object-cover object-top"
                style={{ filter: "grayscale(10%)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-gold text-2xl font-semibold">
                  Adv. Govind Mishra
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  Advocate | Bar Council of Delhi
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Criminal Law",
                  "Family Law",
                  "Civil Litigation",
                  "NDPS",
                  "Writ Petitions",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Enrolled Advocate with approx. 4 years of dedicated practice.
                Appears regularly before Delhi High Court, Dwarka District
                Courts, Tis Hazari, Allahabad High Court and Lucknow High Court
                Bench. LL.B. qualified with expertise in criminal defence,
                family disputes, and civil litigation.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-5 pb-5 border-b border-[#252525]">
                <span>
                  <i className="fas fa-gavel text-gold mr-2" />
                  Delhi High Court
                </span>
                <span>
                  <i className="fas fa-map-marker-alt text-gold mr-2" />
                  Delhi NCR
                </span>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary justify-center text-sm py-2.5"
                >
                  <i className="fab fa-whatsapp" /> WhatsApp
                </a>
                <Link
                  href="/about"
                  className="flex-1 btn-outline justify-center text-sm py-2.5"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>

          {/* ── Advocate 2: Nikita Harsoliya ── */}
          <div
            className="bg-black border border-[#252525] rounded-2xl overflow-hidden"
            data-aos="fade-left"
          >
            <div className="relative h-[380px]">
              <Image
                src="/images/team/nikita-harsoliya.jpg"
                alt="Adv. Nikita Harsoliya"
                fill
                className="object-cover object-top"
                style={{ filter: "grayscale(10%)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-gold text-2xl font-semibold">
                  Adv. Nikita Harsoliya
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  Advocate | Bar Council of Delhi
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Criminal Law",
                  "Family Law",
                  "Civil Litigation",
                  "Consumer Matters",
                  "Corporate Law",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Dedicated advocate practising across Delhi NCR courts with
                expertise in criminal law, family law, civil litigation, and
                consumer matters. Known for a client-first approach and
                meticulous legal drafting.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-5 pb-5 border-b border-[#252525]">
                <span>
                  <i className="fas fa-gavel text-gold mr-2" />
                  Delhi High Court
                </span>
                <span>
                  <i className="fas fa-map-marker-alt text-gold mr-2" />
                  Delhi NCR
                </span>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary justify-center text-sm py-2.5"
                >
                  <i className="fab fa-whatsapp" /> WhatsApp
                </a>
                <Link
                  href="/about"
                  className="flex-1 btn-outline justify-center text-sm py-2.5"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-3 gap-6 border-t border-[#252525] pt-12"
          data-aos="fade-up"
        >
          <AnimatedCounter target={150} suffix="+" label="Clients Served" />
          <AnimatedCounter target={4} suffix="+" label="Years Experience" />
          <AnimatedCounter target={6} suffix="" label="Advocates in Team" />
        </div>
      </div>
    </section>
  );
}
