/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco': {
          'dark': '#1B4332',
          'medium': '#2D6A4F',
          'light': '#52B788',
          'lighter': '#95D5B2',
          'accent': '#40916C',
        },
        'gray': {
          'eco-light': '#F5F5F5',
          'eco-medium': '#E0E0E0',
        }
      },
    },
  },
  plugins: [],
}
