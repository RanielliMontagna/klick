/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0D1117",
        primary: "#7C4DFF",
        accent: "#39FF88",
      },
    },
  },
  plugins: [],
};
