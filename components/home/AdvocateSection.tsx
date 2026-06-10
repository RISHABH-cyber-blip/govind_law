import Image from 'next/image'
import Link from 'next/link'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { SITE_CONFIG } from '@/lib/constants'

export default function AdvocateSection() {
  const waHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`

  return (
    <section className="section-padding bg-dark-card">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image — right on desktop */}
          <div className="order-2 lg:order-2" data-aos="fade-left">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 0 50px rgba(201,168,76,0.12)' }}
            >
              {/* REPLACE: Add advocate's actual photo here */}
              {/* TO ADD ADVOCATE PHOTO: Replace the src below with the actual photo path e.g. /images/advocate.jpg */}
              <Image
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=700&q=80"
                alt="Advocate — replace with actual photo"
                width={600}
                height={520}
                className="w-full object-cover"
                style={{ height: '520px', objectFit: 'cover', filter: 'grayscale(10%)' }}
              />
              {/* Gold border overlay */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ border: '1.5px solid rgba(201,168,76,0.2)' }}
              />
            </div>
          </div>

          {/* Text — left on desktop */}
          <div className="order-1 lg:order-1" data-aos="fade-right">
            <span className="section-tag">Meet Your Advocate</span>
            <div className="gold-line" />
            <h2 className="font-serif text-white text-4xl md:text-5xl font-semibold leading-tight mb-4">
              Your Case Is In<br />Capable Hands
            </h2>
            <p className="font-garamond italic text-gold text-xl mb-2">
              {SITE_CONFIG.advocateName} | Delhi NCR
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              {/* REPLACE: Update this bio with the advocate's actual biography */}
              With years of courtroom experience across Delhi High Court, Dwarka District Court, and
              Tis Hazari, our advocate brings unmatched dedication and legal precision to every case.
              Each client receives direct, personal attention — no juniors, no handoffs. Your matter
              is handled with the gravity it deserves.
            </p>

            {/* Counters */}
            <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-[#2a2a2a]">
              <AnimatedCounter target={150} suffix="+" label="Clients Served" />
              <AnimatedCounter target={10} suffix="+" label="Years Experience" />
              <AnimatedCounter target={500} suffix="+" label="Cases Handled" />
            </div>

            <div className="flex flex-wrap gap-4">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <i className="fab fa-whatsapp" aria-hidden="true" />
                WhatsApp Now
              </a>
              <Link href="/contact" className="btn-outline">
                <i className="fas fa-calendar-check" aria-hidden="true" />
                Book Consultation
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
