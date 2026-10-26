'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { ServiceItem } from '@/lib/types'

interface ServiceCardProps extends ServiceItem {
  index: number
}

export default function ServiceCard({ icon, title, description, bullets, image, index }: ServiceCardProps) {
  const blockRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isEven = index % 2 === 0 // even = image left, odd = image right (per spec: odd index → reverse)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!blockRef.current) return

      gsap.fromTo(
        imgRef.current,
        { x: isEven ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: blockRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: blockRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    init()
  }, [isEven])

  return (
    <div
      ref={blockRef}
      className={`border-b border-[#1a1a1a] py-20 ${index % 2 === 1 ? 'bg-dark-card' : 'bg-black'}`}
    >
      <div className="site-container">
        {/* Responsive grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center`}>

          {/* Image */}
          <div className={isEven ? 'order-1' : 'order-1 lg:order-2'} ref={imgRef}>
            <div className="rounded-2xl overflow-hidden h-[250px] sm:h-[320px] md:h-[420px]">
              <Image
                src={image}
                alt={title}
                width={700}
                height={420}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                style={{ filter: 'grayscale(15%)' }}
              />
            </div>
          </div>

          {/* Text */}
          <div className={isEven ? 'order-2' : 'order-2 lg:order-1'} ref={textRef}>
            <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
              <i className={`${icon} text-gold text-2xl`} aria-hidden="true" />
            </div>
            <h2 className="font-serif text-white text-3xl md:text-4xl font-semibold mb-4">{title}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">{description}</p>
            <ul className="space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}
