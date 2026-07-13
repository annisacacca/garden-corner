/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#B9D7A8',
        secondary: '#E9EFD9',
        cream: '#FFF9F1',
        accent: '#E7CFA4',
        dark: '#5F6F52',
        ink: '#4A5140',
        blush: '#F3D9CF',
        sky: '#CFE3E0',
      },
      fontFamily: {
        heading: ['"DM Serif Display"', 'serif'],
        hand: ['Caveat', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(95, 111, 82, 0.25)',
        paper: '0 4px 14px rgba(95, 111, 82, 0.15), 0 1px 3px rgba(95, 111, 82, 0.1)',
        lift: '0 20px 40px -16px rgba(95, 111, 82, 0.35)',
        tape: 'inset 0 0 0 1px rgba(255,255,255,0.4)',
      },
      borderRadius: {
        blob: '42% 58% 65% 35% / 45% 40% 60% 55%',
        paper: '18px',
      },
      backgroundImage: {
        'paper-grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(4deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%, 92%, 100%': { transform: 'scaleY(1)' },
          '96%': { transform: 'scaleY(0.1)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'floatSlow 10s ease-in-out infinite',
        wiggle: 'wiggle 3s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        blink: 'blink 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
