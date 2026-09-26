/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#0d0a16",
        surface: "#171221",
        blush: "#3d203c",
        rose: "#ff5c8a",
        "rose-dark": "#d33f70",
        plum: "#f8edf6",
        gold: "#f5c76b",
        lilac: "#b99be8",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Outfit", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
      keyframes: {
        flicker: {
          "0%, 100%": { transform: "scaleY(1) scaleX(1)", opacity: "1" },
          "50%": { transform: "scaleY(1.15) scaleX(0.92)", opacity: "0.85" },
        },
        float: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(-110vh) translateX(20px)", opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        flicker: "flicker 0.9s ease-in-out infinite",
        float: "float 8s ease-in infinite",
        drift: "drift 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
