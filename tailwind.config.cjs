/************************************************************
 * Tailwind Config
 * Dark mode first to match the desired aesthetic.
 ************************************************************/
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0b0f17",
          subtle: "#101521",
        },
        surface: "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.12)",
        primary: "#5b7cfa",
        accent: "#22d3ee",
        muted: "#a8b0c0",
      },
      boxShadow: {
        card: "0 20px 60px rgba(0,0,0,.45)",
        soft: "0 10px 30px rgba(0,0,0,.35)",
      },
      borderRadius: {
        lg: "14px",
        md: "12px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
