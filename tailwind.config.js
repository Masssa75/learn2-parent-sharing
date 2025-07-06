/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5D547',
        background: '#000000',
        surface: '#111111',
        border: 'rgba(255, 255, 255, 0.1)',
        'brand-yellow': '#F5D547',
        'dark-bg': '#000000',
        'dark-surface': '#111111',
        'dark-border': 'rgba(255, 255, 255, 0.1)',
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255, 255, 255, 0.7)',
        'text-muted': 'rgba(255, 255, 255, 0.5)',
      },
      fontSize: {
        'display': '48px',
        'title-lg': '36px',
        'title': '24px',
      },
      borderRadius: {
        'button': '25px',
        'card': '16px',
        'input': '12px',
        'avatar': '50%',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}