/** @type {import('tailwindcss').Config} */
export default {
content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],  theme: {
  extend: {
    fontFamily: {
      cairo: ['Cairo', 'sans-serif'],
      Tajawal: ['Tajawal', 'sans-serif'],
    }
  }
},
  plugins: [],
}

