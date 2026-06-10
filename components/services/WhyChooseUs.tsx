import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

const WHY_POINTS = [
  'Direct access to your lawyer — no juniors handling your case',
  'Transparent fee structure — no hidden charges, ever',
  'Proven track record across Delhi High Court & District Courts',
  'Available 6 days a week, including for emergencies',
  'Strict client confidentiality — your privacy is sacred',
  'Result-oriented approach with honest, clear assessments',
]

export default function WhyChooseUs() {
  const waHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`

  return (
    <section className="section-padding bg-black">
      <div className="site-container">
        {/* Bootstrap grid per spec */}
        <div className="row g-5 align-items-start">

          <div className="col-md-6" data-aos="fade-right">
            <span className="section-tag">Our Promise</span>
            <h2 className="font-serif text-white text-4xl font-semibold mb-2">Why Choose Us</h2>
            <div className="gold-line" />
            <p className="text-gray-400 mt-4 mb-8 leading-relaxed">
              When your freedom, family, or livelihood is at stake, you deserve an advocate who
              treats your matter with the urgency and precision it demands.
            </p>
            <ul className="space-y-4">
              {WHY_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3" data-aos="fade-right">
                  <i className="fas fa-circle-check text-gold text-sm mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-300 text-base">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-6" data-aos="fade-left">
            <div className="flex flex-col gap-4 mt-0 lg:mt-16 lg:pl-8">
              <Link
                href="/contact"
                className="block w-full text-center bg-gold text-black font-bold text-lg py-5 px-8 rounded-lg hover:bg-gold-light transition-colors"
              >
                <i className="fas fa-calendar-check mr-2" aria-hidden="true" />
                Book Consultation
              </Link>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center border border-white/20 text-white font-semibold text-lg py-5 px-8 rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                <i className="fab fa-whatsapp mr-2" aria-hidden="true" />
                WhatsApp Now
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
