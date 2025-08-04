// tailwind.config.js or tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 👈 use class strategy (essential for next-themes)
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
