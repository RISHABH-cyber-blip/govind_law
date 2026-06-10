import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline'
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'py-2 px-5 text-sm',
  md: 'py-3 px-8 text-sm',
  lg: 'py-4 px-10 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  href,
  external,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  size = 'md',
}: ButtonProps) {
  const base = `inline-flex items-center gap-2 font-sans font-bold rounded-full transition-all duration-300 ${sizeClasses[size]} ${className}`

  const styles =
    variant === 'primary'
      ? `${base} bg-gold text-black hover:bg-gold-light hover:-translate-y-0.5`
      : `${base} border border-white/40 text-white hover:border-gold hover:text-gold`

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  )
}
