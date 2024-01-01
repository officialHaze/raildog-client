/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "raildog-blue": "#1640D6",
      },
      boxShadow: {
        "all-4": "2px 2px 15px 1px",
      },
    },
  },
  plugins: [],
};
