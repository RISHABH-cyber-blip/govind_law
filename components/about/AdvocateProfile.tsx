import Image from 'next/image'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

const SPECIALIZATIONS = [
  'Criminal Defence & Bail Applications',
  'Family Law & Divorce Matters',
  'Civil Property & Recovery Suits',
  'NDPS Cases & Narcotics Law',
  'Consumer Protection Cases',
  'Commercial Disputes & Recovery',
]

export default function AdvocateProfile() {
  const waHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`

  return (
    <section className="section-padding bg-dark-card">
      <div className="site-container">
        <span className="section-tag">Your Advocate</span>
        <h2 className="font-serif text-white text-4xl font-semibold mb-14">Meet Your Legal Advocate</h2>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-start">

          {/* Photo */}
          <div data-aos="fade-right">
            <div className="rounded-2xl overflow-hidden">
              {/* TO ADD ADVOCATE PHOTO: Replace the src below with your actual photo path, e.g. /images/advocate.jpg */}
              <Image
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80"
                alt="Advocate photo — replace with actual photo"
                width={380}
                height={480}
                className="w-full object-cover"
                style={{ height: '480px', objectFit: 'cover', filter: 'grayscale(10%)' }}
              />
            </div>
            <div className="bg-black border border-[#252525] border-t-0 rounded-b-xl py-4 text-center">
              {/* REPLACE: Update with actual advocate name */}
              <p className="font-serif text-gold text-lg">{SITE_CONFIG.advocateName}</p>
              <p className="text-text-gray text-sm mt-1">Delhi High Court | Delhi NCR</p>
            </div>
          </div>

          {/* Profile content */}
          <div data-aos="fade-left">
            <span className="section-tag">Profile</span>
            <div className="gold-line" />
            {/* REPLACE: Update advocate name and bio */}
            <h2 className="font-serif text-gold text-3xl font-semibold mb-2">{SITE_CONFIG.advocateName}</h2>
            <p className="text-text-gray mb-6">Enrolled Advocate | Bar Council of Delhi | Delhi NCR Courts</p>

            <p className="text-gray-300 text-base leading-relaxed mb-4">
              {/* REPLACE: Add your advocate's actual biography */}
              With over a decade of dedicated courtroom practice, [Name] has built a reputation for
              fearless representation and client-first advocacy across Delhi&apos;s courts. Having
              appeared before the Delhi High Court, Dwarka District Court, Patiala House Courts,
              and Tis Hazari, [Name] brings deep strategic thinking and precise legal expertise to
              every matter entrusted to them.
            </p>
            <p className="text-gray-300 text-base leading-relaxed mb-8">
              {/* REPLACE: Continue bio */}
              A graduate of a premier law institution, [Name] specializes in criminal defence,
              family law, and civil litigation — and is known for a meticulous approach that leaves
              no detail unaddressed. Every client receives direct access from day one.
            </p>

            <h3 className="font-serif text-white text-xl mb-4">Areas of Specialisation</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {SPECIALIZATIONS.map((s) => (
                <li key={s} className="flex items-center gap-3 text-gray-300 text-sm">
                  <i className="fas fa-circle-check text-gold text-sm flex-shrink-0" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>

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
