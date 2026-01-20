/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#10B981", // Emerald
        secondary: "#0F172A", // Slate
        background: "#F8FAFC", // Limpieza total
        accent: "#F59E0B", // Gold/Amber para alertas
        slate: {
          600: "#475569", // Para mejor lectura del Body
        },
      },
      borderRadius: {
        "2xl": "16px", // Look amigable
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};