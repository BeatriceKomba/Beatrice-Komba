/** @type {import('tailwindcss').Config} */
// Vrolijk babyblauw: lichte, zachte achtergronden met overgangen naar lila en perzik, marineblauwe tekst.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F4F9FF',
        surface: '#E4F1FD',
        raised: '#FFFFFF',
        ink: { DEFAULT: '#14284B', soft: '#4A5D7E' },
        muted: '#6F82A3',
        hair: 'rgba(20, 40, 75, 0.12)',
        azure: { DEFAULT: '#5AA9E6', light: '#A9D6F8', deep: '#2F7FC1' },
        lilac: '#D9CCF7',
        peach: '#FFDCCB',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(47,127,193,.08), 0 14px 32px -14px rgba(47,127,193,.3)',
        lift: '0 2px 6px rgba(47,127,193,.12), 0 26px 50px -18px rgba(47,127,193,.4)',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        spin: { to: { transform: 'rotate(360deg)' } },
        twinkle: {
          '0%,100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(.7) rotate(45deg)', opacity: '.6' },
        },
        blink: { '0%,49%': { opacity: '1' }, '50%,100%': { opacity: '0' } },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(30px,-20px,0)' },
        },
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        drift: 'drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
