import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const SERVICES = [
  {
    icon: 'fas fa-gavel',
    title: 'Criminal Law',
    desc: 'Bail applications, FIR quashing, trial defence, and strong courtroom representation across all Delhi NCR courts.',
  },
  {
    icon: 'fas fa-heart',
    title: 'Family Law',
    desc: 'Divorce, maintenance, domestic violence protection, and child custody handled with compassion and precision.',
  },
  {
    icon: 'fas fa-file-contract',
    title: 'Civil Law',
    desc: 'Property disputes, injunctions, recovery suits, and contract matters handled with diligence and expertise.',
  },
  {
    icon: 'fas fa-scale-balanced',
    title: 'NDPS Law',
    desc: 'Specialized bail strategy and expert defence for NDPS cases with strict legal compliance throughout.',
  },
  {
    icon: 'fas fa-briefcase',
    title: 'Commercial Law',
    desc: 'Business disputes, contract enforcement, and corporate recovery for companies and individuals.',
  },
  {
    icon: 'fas fa-shield-halved',
    title: 'Consumer Law',
    desc: 'Protection of consumer rights against deficient services and unfair trade practices — we fight for you.',
  },
]

export default function ServicesSection() {
  return (
    <section className="section-padding bg-black">
      <div className="site-container">
        <SectionHeading
          tag="What We Practise"
          title="Legal Services We Offer"
          subtitle="Comprehensive legal solutions tailored to your specific needs across Delhi NCR courts."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="service-card-base group cursor-default"
              data-aos="zoom-in"
              data-aos-delay={String(i * 80)}
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <i className={`${s.icon} text-gold text-xl`} aria-hidden="true" />
              </div>
              <h3 className="font-serif text-white text-xl mb-3">{s.title}</h3>
              <p className="text-text-gray text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/contact" className="btn-primary text-base py-4 px-10">
            <i className="fas fa-calendar-check" aria-hidden="true" />
            Get Legal Consultation Now
          </Link>
        </div>
      </div>
    </section>
  )
}
