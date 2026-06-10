'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { SITE_CONFIG } from '@/lib/constants'

// Three.js canvas loaded only client-side
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!headingRef.current) return

      // Split heading into words and animate
      const h1 = headingRef.current
      const words = h1.textContent?.split(' ') || []
      h1.innerHTML = words
        .map((w) => `<span class="word-wrap" style="overflow:hidden;display:inline-block;"><span class="word" style="display:inline-block;">${w}</span></span>`)
        .join(' ')

      gsap.fromTo(
        h1.querySelectorAll('.word'),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.3,
        }
      )

      // Animate content block
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.8 }
      )
    }
    initGSAP()
  }, [])

  const waHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-black">
      {/* Three.js background — gold wireframe icosahedron */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ opacity: 0.12 }}>
        <HeroCanvas />
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.07) 0%, transparent 65%)' }}
      />

      <div className="site-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16">

          {/* Left — text */}
          <div>
            <div
              className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6"
              data-aos="fade-down"
            >
              <i className="fas fa-scale-balanced text-gold text-xs" aria-hidden="true" />
              <span className="text-gold text-xs font-sans tracking-[2px] uppercase">
                Trusted Legal Advocates — Delhi NCR
              </span>
            </div>

            <h1
              ref={headingRef}
              className="font-serif text-white text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6"
            >
              Justice Is Not a Luxury. It Is Your Right.
            </h1>

            <div ref={contentRef}>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Experienced advocates providing confidential, result-oriented legal representation
                across Delhi NCR courts — from Tis Hazari to Delhi High Court.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/contact" className="btn-primary text-base py-3 px-8">
                  <i className="fas fa-calendar-check" aria-hidden="true" />
                  Book Consultation
                </Link>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-outline text-base py-3 px-8">
                  <i className="fab fa-whatsapp" aria-hidden="true" />
                  WhatsApp Now
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-gold tracking-widest text-base">★★★★★</div>
                <p className="text-gray-400 text-sm">Trusted by 150+ Clients Across Delhi NCR</p>
              </div>
            </div>
          </div>

          {/* Right — image mosaic */}
          <div className="relative h-[500px] lg:h-[580px] hidden sm:block" data-aos="fade-left">
            {/* Main image */}
            <div
              className="absolute top-0 left-0 right-20 bottom-0 rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 0 40px rgba(201,168,76,0.18)' }}
            >
              {/* REPLACE: Add your actual image here */}
              <Image
                src="https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=700&q=80"
                alt="Lady Justice statue"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 60vw, 40vw"
                priority
              />
            </div>

            {/* Top-right small image */}
            <div className="absolute top-6 right-0 w-[160px] h-[200px] rounded-xl overflow-hidden border-2 border-dark-card z-10">
              {/* REPLACE: Add gavel or court image */}
              <Image
                src="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=300&q=80"
                alt="Judge gavel"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>

            {/* Bottom-right small image */}
            <div className="absolute bottom-10 right-0 w-[160px] h-[175px] rounded-xl overflow-hidden border-2 border-dark-card z-10">
              {/* REPLACE: Add lawyer/document image */}
              <Image
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&q=80"
                alt="Lawyer at work"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>

            {/* Stats badge overlay */}
            <div
              className="absolute bottom-6 left-6 z-20 bg-black/90 backdrop-blur-sm border border-gold/30 rounded-xl px-5 py-3"
            >
              <strong className="font-serif text-gold text-2xl block leading-none">150+</strong>
              <span className="text-gray-400 text-xs">Satisfied Clients</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
