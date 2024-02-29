/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { nunito: "Nunito" },
      screens: {
        s: { min: "0px", max: "680px" },
        m: { min: "0px", max: "768px" },
        l: { min: "0px", max: "1024px" },
      },
      colors: {
        gray: { 50: "#a6a4a4", 100: "#808080", 200: "#323232", 300: "#212121" },
        white: "#fff",
        cyan: "#14ffec",
        red: "#d6436e",
        green: "#25da72",
      },
      fontSize: {
        sm: "14px",
        md: "18px",
        lg: "24px",
        xl: "32px",
        base: "16px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
