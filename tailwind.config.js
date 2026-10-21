/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B1B2B',
          900: '#0F2438',
          DEFAULT: '#14304A',
          800: '#1A3D5E',
          700: '#224F79',
          600: '#2C6496',
        },
        softblue: {
          DEFAULT: '#4C86A8',
          hover: '#3D7290',
          light: '#72A3C0',
          tint: '#EAF1F6',
          mist: '#F3F7FA',
        },
        slate: {
          subtle: '#5A6772',
          muted: '#808F9B',
          light: '#E2E8F0',
        },
        brand: {
          bg: '#FFFFFF',
          tint: '#EAF1F6',
          dark: '#14304A',
          accent: '#4C86A8',
          leaf: '#428173',
        }
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Newsreader', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'bezel': '0 0 0 1px rgba(20, 48, 74, 0.06), 0 2px 4px rgba(20, 48, 74, 0.04), 0 12px 24px -4px rgba(20, 48, 74, 0.06)',
        'bezel-hover': '0 0 0 1px rgba(76, 134, 168, 0.2), 0 8px 16px -2px rgba(20, 48, 74, 0.08), 0 20px 32px -4px rgba(20, 48, 74, 0.1)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
        'soft-float': '0 20px 40px -15px rgba(20, 48, 74, 0.08)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.32, 0.72, 0, 1)',
      }
    },
  },
  plugins: [],
}
