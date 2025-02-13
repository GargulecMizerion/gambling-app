/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF7F11",
        secondary: {
          DEFAULT: "#262626"
        },
        vanilla: "#F1FAEE",
        secondaryGray: "#D9D9D9",
        darkGray: "#262626"

      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};
