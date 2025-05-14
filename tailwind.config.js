/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'tablet': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      animation: {
        'text-reveal': 'textReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'sequential-reveal': 'sequentialReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scroll-down': 'scrollDown 1.5s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
      },
      keyframes: {
        textReveal: {
          '0%': {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
            transform: 'translateX(-10px)',
            opacity: '0',
          },
          '100%': {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        sequentialReveal: {
          '0%': {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
            transform: 'translateY(10px)',
            opacity: '0',
          },
          '100%': {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        scrollDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-5px)',
          },
          '30%': {
            opacity: '1',
          },
          '60%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(5px)',
          },
        },
        slideInRight: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0.6',
          },
        },
      },
    },
  },
  plugins: [],
};