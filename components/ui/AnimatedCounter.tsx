'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  label: string
}

export default function AnimatedCounter({ target, suffix = '+', label }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const started = useRef(false)

  useEffect(() => {
    if (isInView && !started.current) {
      started.current = true
      const duration = 2000
      const steps = 60
      const stepValue = target / steps
      let current = 0
      const timer = setInterval(() => {
        current += stepValue
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
    }
  }, [isInView, target])

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-4xl md:text-5xl font-bold text-gold leading-none">
        {count}{suffix}
      </div>
      <div className="text-text-gray text-xs uppercase tracking-widest mt-2">{label}</div>
    </div>
  )
}
