/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        silvoraa: {
          white: '#FFFFFF',
          softWhite: '#FAFAFA',
          gold: '#D4AF37',
          deepGold: '#B8941E',
          lightGold: '#E6D5B8',
          darkGold: '#A3855E',
          black: '#1A1A1A',
          warmGray: '#6B6B6B',
          lightGray: '#E5E5E5',
          silver: '#7B8794',
          cream: '#F9F8F6',
          pearl: '#FAFAFA',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-cormorant)', '"Cormorant Garamond"', 'serif'],
        display: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'scroll-left': 'scroll-left var(--speed, 40s) linear infinite',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
