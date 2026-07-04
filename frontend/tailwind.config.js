/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4338ca',
        secondary: '#6366f1',
        accent: '#111827',
      },
      borderRadius: {
        'full': '999px',
      },
    },
  },
  plugins: [],
}
