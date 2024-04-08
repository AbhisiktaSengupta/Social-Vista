/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "LogoutFont": ["Tac One", "sans-serif"],
        "Title":["Rakkas", "serif"],
        "Btns":["Pacifico", "serif"],
        "NavBtn":["Permanent Marker","serif"]
      }
    },
  },
  plugins: [],
}

