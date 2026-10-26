'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function AOSInit() {
  const pathname = usePathname()

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const initAOS = async () => {
      const AOS = (await import('aos')).default
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-cubic',
        offset: 80,
      })
      // Give DOM time to update after route transition
      timeout = setTimeout(() => {
        AOS.refresh()
      }, 150)
    }
    initAOS()
    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
