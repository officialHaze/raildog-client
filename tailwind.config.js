/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "raildog-blue": "#1640D6",
        "github-black-secondary": "#010409",
        "github-black-primary": "#0D1117",
        "github-black-ternary": "#161B22",
      },
      boxShadow: {
        "all-4": "2px 2px 15px 1px",
      },
      fontFamily: {
        "api-key-400": "font-family: 'Dosis', sans-serif;",
      },
    },
  },
  plugins: [],
};
