import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "strapi-blue": "#4945FF", // Strapi's primary blue color
        "strapi-gray": "#6B6F7B", // Strapi's gray color
        "strapi-dark": "#181826", // Strapi's dark color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Strapi uses Inter font
      },
    },
  },
  plugins: [nextui(),require("@tailwindcss/typography")],
} satisfies Config;
