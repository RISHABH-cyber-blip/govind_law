import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C9A84C',
        'gold-light': '#E8C96A',
        'gold-dark': '#9A7A30',
        'dark-bg': '#000000',
        'dark-card': '#111111',
        'dark-gray': '#1a1a1a',
        'mid-gray': '#242424',
        'text-gray': '#9ca3af',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        garamond: ['var(--font-garamond)', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-wa': 'pulse-wa 2.5s infinite',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
      },
      keyframes: {
        'pulse-wa': {
          '0%, 100%': { boxShadow: '0 4px 24px rgba(37,211,102,0.4)' },
          '50%': { boxShadow: '0 4px 48px rgba(37,211,102,0.75)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
