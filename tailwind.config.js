/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "Montserrat",
        montserratBold: "Montserrat Bold",
      },
      colors: {
        primary: "#0B0B0B",
        primaryLight: "#323232",
        secondary: "#F2F2F2",
        accent: "#069091",
        grey: "#878787",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
      },
      animation: {
        rotate: "rotate 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
