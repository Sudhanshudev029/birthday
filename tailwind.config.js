/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: '#800020',
        'burgundy-light': '#9E2A44',
        rose: '#E8B4BC',
        'rose-red': '#C94F6D',
        blush: '#F7D9DD',
        'baby-pink': '#FADDE1',
        beige: '#F3E8DC',
        cream: '#FFF8F0',
        'sky-blue': '#AEE1F9',
        'royal-blue': '#3F5EAA',
        lavender: '#D9CFF0',
        gold: '#D4AF37',
        'gold-light': '#F1DFA4',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px rgba(212,175,55,0.35)',
        card: '0 10px 40px rgba(128,0,32,0.12)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-30px) translateX(10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px)' },
          '40%, 80%': { transform: 'translateX(8px)' },
        },
        waveMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'floatSlow 9s ease-in-out infinite',
        sparkle: 'sparkle 2.4s ease-in-out infinite',
        shake: 'shake 0.5s ease-in-out',
        waveMove: 'waveMove 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
