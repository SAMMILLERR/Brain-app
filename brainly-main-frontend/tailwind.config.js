/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary neural colors
        primary: {
          DEFAULT: '#8b74a5',
          50: '#f7f5f9',
          100: '#efebf3',
          200: '#dfd6e7',
          300: '#c9b8d4',
          400: '#b19dd1',
          500: '#8b74a5',
          600: '#7a6394',
          700: '#6b5583',
          800: '#5a496e',
          900: '#4a3e5b',
        },
        accent: {
          DEFAULT: '#f4a49c',
          50: '#fef8f7',
          100: '#fdf2f0',
          200: '#fbe5e1',
          300: '#f8d1ca',
          400: '#f6bdb3',
          500: '#f4a49c',
          600: '#f2958b',
          700: '#ef7d70',
          800: '#ea5d4a',
          900: '#d64332',
        },
        // Background and surfaces
        bg: {
          DEFAULT: '#fdfcfa',
          subtle: '#f9f7f4',
        },
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.8)',
          elevated: 'rgba(255, 255, 255, 0.95)',
        },
        // Status colors
        success: '#6bbf59',
        danger: '#e85d75',
        warning: '#f0b849',
        // Text colors
        text: {
          primary: '#2d2a33',
          secondary: '#5a5560',
          muted: '#8a8591',
          inverse: '#ffffff',
        },
        // Glass effect
        glass: 'rgba(255, 255, 255, 0.25)',
        // Borders
        border: {
          DEFAULT: 'rgba(139, 116, 165, 0.15)',
          hover: 'rgba(139, 116, 165, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.25' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.5' }],
        'lg': ['1.125rem', { lineHeight: '1.5' }],
        'xl': ['1.25rem', { lineHeight: '1.25' }],
        '2xl': ['1.5rem', { lineHeight: '1.25' }],
        '3xl': ['1.875rem', { lineHeight: '1.25' }],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(139, 116, 165, 0.1)',
        'neural': '0 4px 12px rgba(139, 116, 165, 0.1)',
        'lift': '0 12px 24px rgba(139, 116, 165, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'gradient': 'gradientShift 15s ease infinite',
      },
      keyframes: {
        slideUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        gradientShift: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      backgroundImage: {
        'neural-pattern': `
          radial-gradient(circle at 20% 50%, rgba(139, 116, 165, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(244, 164, 156, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(194, 153, 209, 0.03) 0%, transparent 50%)
        `,
        'primary-gradient': 'linear-gradient(135deg, #8b74a5 0%, #c299d1 50%, #f4a49c 100%)',
        'accent-gradient': 'linear-gradient(135deg, #f4a49c 0%, #ffb4a3 100%)',
      },
    },
  },
  plugins: [
    // Custom plugin for glass morphism utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.25)',
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(42, 37, 50, 0.4)',
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          border: '1px solid rgba(139, 116, 165, 0.2)',
        },
        '.neural-bg': {
          'background-image': `
            radial-gradient(circle at 20% 50%, rgba(139, 116, 165, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(244, 164, 156, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(194, 153, 209, 0.03) 0%, transparent 50%)
          `,
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
