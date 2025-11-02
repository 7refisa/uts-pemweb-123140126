/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan semua file JS/TS/JSX/TSX di folder src
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Pakai font Inter
      },
      colors: {
        pink: {
          50: "#fdf2f8",
          100: "#fbeff2",
          200: "#f8d9e6",
          300: "#f3bada",
          400: "#ec90c1",
          500: "#e660a5",
          600: "#ec4899", // Warna pink utama
          700: "#d02677",
          800: "#a21e5c",
          900: "#881c4c",
        },
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"), // Plugin untuk styling elemen form
  ],
};
