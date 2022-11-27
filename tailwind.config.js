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
        primary: "#1B1B1B",
        secondary: "#F2F2F2",
        accent: "#069091",
        grey: "#EAEAEA",
      },
    },
  },
  plugins: [],
};
