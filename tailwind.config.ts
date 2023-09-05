import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1.25rem',
        lg: '1.5rem'
      },
      screens: {
        '2xl': '1440px'
      }
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)']
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
export default config
