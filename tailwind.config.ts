import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        themeBlue: "#3A37EC",
        themeVilot: "#DD3FEB",
        lightBlue: "rgba(58, 55, 236, .4)",
        lightVilot: "rgba(221, 63, 235, .4)",
      },
      dropShadow: {
        'strong-black': '0 8px 16px rgba(0, 0, 0, 0.85)',
      },
      backgroundImage: {
        "bg-gradiant": "linear-gradient(180deg, transparent 0%, transparent 50%,  rgba(58, 55, 236, .5) 75%, #DD3FEB 100%)",
        "landing-yoga": "url('/assets/images/yoga.png')",
      },
    },
  },
  plugins: [],
};
export default config;
