/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E2ECF9",
        secondary:'#878787',
        tableColor:'#f3f4f6',
        trowColor:'#f1f1f1'
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],  
      },
    },
  },
  plugins: [],
}