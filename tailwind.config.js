/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: "#0a0a0a",
          800: "#0f0f0f",
        },
      },
    },
  },
  plugins: [],
}