/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ORYZO Cinematic Adaptation for Re:kula
        void: '#070D14',          // Page canvas / deepest warm-navy void
        surface: {
          DEFAULT: '#111D2A',     // Elevated surface / card background
          subtle: '#162536',      // Hover / secondary elevated surface
          light: '#1D2E42',
        },
        border: {
          cork: '#203448',        // Hairline dividers, dashed section separators
          driftwood: '#324E6B',   // Mid-tone dividers
          cream: '#F3EADB',       // Outline button border
        },
        cream: {
          DEFAULT: '#F3EADB',     // Warm cream typography & high contrast captions
          light: '#FAF6F0',
          muted: '#C8BDB0',
          dim: '#8E857B',
        },
        softblue: {
          DEFAULT: '#4C86A8',
          hover: '#3D7290',
          light: '#72A3C0',
          glow: '#4C86A8',
        },
        ember: {
          DEFAULT: '#D97736',     // Rare editorial accent for credits and focus badges
          glow: '#E06D3B',
        },
        navy: {
          950: '#060B11',
          900: '#0A121C',
          DEFAULT: '#14304A',
          800: '#1A3D5E',
        }
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display': ['51px', { lineHeight: '0.9', letterSpacing: '0px' }],
        'display-lg': ['72px', { lineHeight: '0.9', letterSpacing: '-0.01em' }],
        'display-xl': ['96px', { lineHeight: '0.88', letterSpacing: '-0.02em' }],
        'heading': ['41px', { lineHeight: '0.9', letterSpacing: '0px' }],
        'body-editorial': ['29px', { lineHeight: '1.26', letterSpacing: '0px' }],
        'body-editorial-sm': ['22px', { lineHeight: '1.3', letterSpacing: '0px' }],
        'micro': ['8px', { lineHeight: '1.2', letterSpacing: '0.05em' }],
        'sub': ['12px', { lineHeight: '1.2', letterSpacing: '0.08em' }],
      },
      borderRadius: {
        'cards': '12px',
        'buttons-pill': '36px',
        'buttons-outlined': '22.5px',
      },
      spacing: {
        '6': '6px',
        '8': '8px',
        '9': '9px',
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '18': '18px',
        '24': '24px',
        '31': '31px',
        '41': '41px',
        '45': '45px',
        '68': '68px',
        '204': '204px',
      },
    },
  },
  plugins: [],
}
