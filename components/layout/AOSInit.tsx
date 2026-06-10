'use client'

import { useEffect } from 'react'

export default function AOSInit() {
  useEffect(() => {
    const initAOS = async () => {
      const AOS = (await import('aos')).default
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-cubic',
        offset: 80,
      })
    }
    initAOS()
  }, [])

  return null
}
