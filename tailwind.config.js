/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gleam-cream': '#F6F1EB',
        'gleam-beige': '#EDECE4',
        'gleam-brown': '#8B7355',
        'gleam-dark': '#171515',
        'gleam-accent': '#CFC7BE',
      },
      fontFamily: {
        'cardo': ['Cardo', 'serif'],
        'cormorant': ['Cormorant', 'serif'],
      },
    },
  },
  plugins: [],
}
