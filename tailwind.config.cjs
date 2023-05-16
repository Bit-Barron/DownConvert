/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#461196",
        secondary: "#f2f2f2",
        downloadContainer: "#1a252c",
        primaryhover: "#340a71",
      },
    },
  },
  plugins: [],
}
