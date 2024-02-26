/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    // if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { primaryColor: "#FF4C29", buttonBgColor: "#9ADE7B" },
    },
  },
  plugins: [],
};
