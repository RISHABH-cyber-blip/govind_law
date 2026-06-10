import { SITE_CONFIG } from '@/lib/constants'

export default function OfficeMap() {
  return (
    <div>
      <div className="space-y-6 mb-8">
        <h3 className="font-serif text-white text-2xl mb-6">Our Office</h3>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="fas fa-location-dot text-gold" aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-serif text-white text-base mb-1">Address</h4>
            {/* CHANGE MAP: Update address here AND update SITE_CONFIG.googleMapsEmbedURL */}
            <p className="text-text-gray text-sm leading-relaxed">{SITE_CONFIG.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="fas fa-phone text-gold" aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-serif text-white text-base mb-1">Phone</h4>
            <a href={`tel:${SITE_CONFIG.phone1}`} className="text-text-gray text-sm hover:text-gold transition-colors block">
              {SITE_CONFIG.phone1}
            </a>
            <a href={`tel:${SITE_CONFIG.phone2}`} className="text-text-gray text-sm hover:text-gold transition-colors block">
              {SITE_CONFIG.phone2}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="fas fa-envelope text-gold" aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-serif text-white text-base mb-1">Email</h4>
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-text-gray text-sm hover:text-gold transition-colors">
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="fas fa-clock text-gold" aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-serif text-white text-base mb-1">Office Hours</h4>
            <p className="text-text-gray text-sm">{SITE_CONFIG.officeHours}</p>
          </div>
        </div>
      </div>

      {/* Google Maps iframe */}
      {/* TO UPDATE MAP: Change googleMapsEmbedURL in lib/constants.ts */}
      {/* Get embed URL: maps.google.com → Share → Embed a map → copy the src value */}
      {/* The address on the left above and the map are linked through SITE_CONFIG */}
      <div className="rounded-2xl overflow-hidden border border-gold/20">
        <iframe
          src={SITE_CONFIG.googleMapsEmbedURL}
          width="100%"
          height="380"
          style={{ border: 'none', display: 'block', filter: 'grayscale(30%)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location Map"
        />
      </div>
    </div>
  )
}
