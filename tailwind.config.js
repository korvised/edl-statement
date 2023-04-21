/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        auth: "url('/bg.jpeg')",
      },
      fontFamily: {
        lao: ["Noto Sans Lao", "serif"],
      },
      gridTemplateColumns: {
        values: "max-content 1fr",
      },
      width: {
        screen: "100vw",
      },
      minWidth: {
        screen: "100vw",
      },
    },
  },
  plugins: [],
}
