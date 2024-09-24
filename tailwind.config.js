/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      koulen: ["Koulen", "sans-serif"],
      ubuntu: ["Ubuntu Condensed", "sans-serif"],
    },
    colors: {
      primary: "#4C7766",
      secondary: "#EBE6E0",
      primaryDark: "#89B3A2",
      secondaryDark: "#4F4C4A",
      bg: "#FAF9F6",
      bgDark: "#161616",
      gray: "#D9D9D9",
      black: "#000000",
      white: "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
};
