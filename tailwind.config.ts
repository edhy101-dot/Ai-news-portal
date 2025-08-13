import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,0.06)" },
      borderRadius: { '2xl': '1.25rem' }
    }
  },
  plugins: []
};
export default config;
