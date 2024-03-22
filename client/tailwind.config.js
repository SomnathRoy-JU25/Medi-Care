/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue":"#90E0EF",
        "red":"#FF0000",
        "secondary":"#555",
        "primaryBG":"#FCFCFC"  
      },
      fontFamily: {
           "primary":['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
}

