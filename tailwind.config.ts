import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#0D0221",
        accent_secondary: "#26408B",
        accent_oscuro: "#0D0221",
      },
      backgroundImage: {
        body: "url('/fondo-bg.png')",
      },
    },
  },
  plugins: [animate],
};

export default config;
