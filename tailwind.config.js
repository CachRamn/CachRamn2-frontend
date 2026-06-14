/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F1117',
        surface: '#1A1D26',
        elevated: '#22263A',
        border: '#2E3150',
        accent: '#6C63FF',
        'accent-hover': '#5A52E0',
        wa: '#25D366',
        'wa-hover': '#1DB954',
        'text-primary': '#F0F0F5',
        'text-secondary': '#9898B0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
