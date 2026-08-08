import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

// ── Priority advocates (full profile) ──────────────────────────
const PRIORITY_ADVOCATES = [
  {
    name: "Adv. Govind Mishra",
    designation: "Advocate",
    qualification: "LL.B.",
    photo: "/images/team/govind-mishra.jpg",
    courts: [
      "Delhi High Court",
      "Dwarka District Courts",
      "Tis Hazari Courts",
      "Allahabad High Court",
      "Lucknow High Court Bench",
    ],
    practice: [
      "Criminal Law & Bail Applications",
      "Family Law & Divorce Matters",
      "Civil Litigation & Property",
      "NDPS & Narcotics Cases",
      "Writ Petitions & PIL",
      "Consumer Matters",
      "Cheque Bounce Matters",
    ],
    skills: [
      "Legal Drafting",
      "Court Representation",
      "Legal Research",
      "Client Counselling",
    ],
    bio1: `Adv. Govind Mishra is a dedicated criminal and civil law practitioner with approximately
4 years of focused courtroom experience across Delhi's major courts. Enrolled with the
Bar Council of Delhi, he regularly appears before the Delhi High Court, Dwarka District
Courts, Tis Hazari, Allahabad High Court, and the Lucknow High Court Bench.`,
    bio2: `Qualified with an LL.B., Adv. Mishra brings sharp legal acumen and a client-first
approach to every matter — ensuring transparent communication, strategic representation,
and no hidden charges at any stage of the proceedings.`,
    phone: "9958026303",
    experience: "4+ Years",
    clients: "150+",
  },
  {
    name: "Adv. Nikita Harsoliya",
    designation: "Advocate",
    qualification: "B.A. LL.B., LL.M. (Corporate & Commercial Law)",
    photo: "/images/team/nikita-harsoliya.jpg",
    courts: ["Delhi High Court", "Dwarka District Courts", "Tis Hazari Courts"],
    practice: [
      "Criminal Defence",
      "Civil Litigation",
      "Consumer Protection Cases",
      "Family Law",
      "Commercial Disputes",
      "Corporate & Commercial Law",
    ],
    skills: [
      "Legal Drafting",
      "Court Representation",
      "Legal Research",
      "Client Counselling",
    ],
    bio1: `Adv. Nikita Harsoliya is a dedicated advocate practising across Delhi High Court
  and Dwarka District Courts. With a strong academic foundation in corporate and commercial
  law, she handles a broad range of civil, criminal, family, and consumer matters.`,
    bio2: `Known for a meticulous approach to case preparation and a client-first philosophy,
  Adv. Harsoliya ensures every client receives clear communication and thorough
  representation at each stage of their legal journey.`,
    phone: "9958026303",
    experience: "Experienced",
    clients: "100+",
  },
];

// ── Supporting team (small cards) ──────────────────────────────
const TEAM_MEMBERS = [
  {
    name: "Adv. Akansh Sharma",
    designation: "Advocate",
    qualification: "LL.B.",
    photo: "/images/team/akansh-sharma.jpg",
    practice: "Criminal Defence, Civil Litigation, Consumer Matters, PIL",
  },
  {
    name: "Adv. Rajat Sikri",
    designation: "Advocate — Government Pleader, Union of India",
    qualification: "CLC DU, LL.B.",
    photo: "/images/team/rajat-sikri.jpg",
    practice: "Criminal Law, Civil Litigation, Writ Petitions, PIL",
  },
  {
    name: "Adv. Nikita Harsoliya",
    designation: "Advocate",
    qualification: "B.A. LL.B., LL.M. (Corporate & Commercial Law)",
    photo: "/images/team/nikita-harsoliya.jpg",
    practice: "Criminal Law, Family Law, Civil Litigation, Consumer Matters",
  },
  {
    name: "Adv. Seema Rani",
    designation: "Advocate",
    qualification: "LL.B.",
    photo: "/images/team/seema-rani.jpg",
    practice: "Criminal Law, Family Law, Civil Litigation, Cheque Bounce",
  },
  {
    name: "Adv. Shalini Sharma",
    designation: "Advocate",
    qualification: "B.A. LL.B.",
    photo: "/images/team/shalini-sharma.jpg",
    practice: "Criminal Law, Family Law, Consumer Matters, PIL",
  },
  {
    name: "Adv. Jitender Verma",
    designation: "Advocate",
    qualification: "B.A. LL.B., LL.M. (Corporate & Commercial Law)",
    photo: "/images/team/jitender-verma.jpg",
    practice: "Civil Litigation, Commercial Disputes, NCLT, Arbitration",
  },
  {
    name: "Adv. Santosh Kumar",
    designation: "Advocate",
    qualification: "B.A. LL.B.",
    photo: "/images/team/santosh-kumar.jpg",
    practice: "Criminal Law, Civil Litigation, Cheque Bounce, Consumer Matters",
  },
];

export default function AdvocateProfile() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════
          PRIORITY ADVOCATES — Full profile
      ════════════════════════════════════════════════════════ */}
      {PRIORITY_ADVOCATES.map((adv, idx) => (
        <section
          key={adv.name}
          className={`section-padding ${idx % 2 === 0 ? "bg-dark-card" : "bg-black"}`}
        >
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 items-start">
              {/* Photo + name card */}
              <div data-aos="fade-right">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 0 40px rgba(201,168,76,0.1)" }}
                >
                  <div className="relative h-[420px]">
                    <Image
                      src={adv.photo}
                      alt={adv.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 360px"
                      className="object-cover object-top"
                      style={{ filter: "grayscale(8%)" }}
                    />
                  </div>
                </div>
                <div className="bg-black border border-[#252525] border-t-0 rounded-b-xl py-4 px-5">
                  <p className="font-serif text-gold text-lg font-semibold">
                    {adv.name}
                  </p>
                  <p className="text-text-gray text-sm mt-1">
                    {adv.designation}
                  </p>
                  <p className="text-text-gray text-sm">{adv.qualification}</p>
                  <div className="flex gap-4 mt-3">
                    <div className="text-center">
                      <p className="text-gold font-bold text-lg">
                        {adv.experience}
                      </p>
                      <p className="text-gray-500 text-xs">Experience</p>
                    </div>
                    <div className="w-px bg-[#252525]" />
                    <div className="text-center">
                      <p className="text-gold font-bold text-lg">
                        {adv.clients}
                      </p>
                      <p className="text-gray-500 text-xs">Clients</p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="mt-4 flex gap-3">
                  <a
                    href={`https://wa.me/91${adv.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-primary justify-center text-sm py-2.5"
                  >
                    <i className="fab fa-whatsapp" /> WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    className="flex-1 btn-outline justify-center text-sm py-2.5"
                  >
                    <i className="fas fa-calendar-check" /> Consult
                  </Link>
                </div>
              </div>

              {/* Profile content */}
              <div data-aos="fade-left">
                <span className="section-tag">Profile</span>
                <div className="gold-line" />
                <h2 className="font-serif text-gold text-3xl font-semibold mb-1">
                  {adv.name}
                </h2>
                <p className="text-text-gray text-sm mb-6">
                  {adv.designation} | Bar Council of Delhi | Delhi NCR Courts
                </p>

                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  {adv.bio1}
                </p>
                <p className="text-gray-300 text-base leading-relaxed mb-8">
                  {adv.bio2}
                </p>

                {/* Courts */}
                <div className="mb-6">
                  <h3 className="font-serif text-white text-lg mb-3">
                    <i className="fas fa-landmark text-gold mr-2" />
                    Courts of Practice
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {adv.courts.map((c) => (
                      <span
                        key={c}
                        className="text-xs px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Practice areas */}
                <div className="mb-6">
                  <h3 className="font-serif text-white text-lg mb-3">
                    <i className="fas fa-gavel text-gold mr-2" />
                    Areas of Practice
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {adv.practice.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-gray-300 text-sm"
                      >
                        <i className="fas fa-circle-check text-gold text-xs flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-serif text-white text-lg mb-3">
                    <i className="fas fa-star text-gold mr-2" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {adv.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-3 py-1.5 rounded-full bg-gold/10 text-gold border border-gold/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ════════════════════════════════════════════════════════
          SUPPORTING TEAM — Small cards
      ════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-dark-card">
        <div className="site-container">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="section-tag">Our Team</span>
            <div className="gold-line mx-auto" />
            <h2 className="font-serif text-white text-3xl font-semibold mt-4">
              More Advocates in Our Chamber
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              A full team of dedicated legal professionals, each bringing
              specialised expertise to serve our clients across Delhi NCR.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <div
                key={member.name}
                className="bg-black border border-[#252525] rounded-2xl overflow-hidden hover:border-gold/30 transition-colors"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                {/* Small photo */}
                <div className="relative h-[200px]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top"
                    style={{ filter: "grayscale(15%)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                    }}
                  />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif text-gold text-base font-semibold leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-0.5 mb-1">
                    {member.designation}
                  </p>
                  <p className="text-gray-500 text-xs mb-3">
                    {member.qualification}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed border-t border-[#1a1a1a] pt-3">
                    <i className="fas fa-gavel text-gold mr-1.5 text-[10px]" />
                    {member.practice}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12" data-aos="fade-up">
            <p className="text-gray-400 mb-4">
              All our advocates share the same contact — reach the right person
              for your matter.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <i className="fab fa-whatsapp" /> WhatsApp Our Team
              </a>
              <Link href="/contact" className="btn-outline">
                <i className="fas fa-envelope" /> Send a Message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
