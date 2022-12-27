/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "Montserrat",
        "montserrat-bold": "Montserrat Bold",
      },
      colors: {
        primary: "#0B0B0B",
        "primary-light": "#323232",
        secondary: "#FAFAFA",
        accent: "#069091",
        grey: "#878787",
        "grey-light": "#CECECE",
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
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(160px, 1fr))",
      },
    },
  },
  plugins: [],
};
