import type { Config } from "tailwindcss";

// Define a custom config type that includes safelist
type CustomConfig = Config & {
  safelist?: string[];
};

const config: CustomConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2463EB",
          color: "#2463EB", // kept for backward compatibility
          dark: "#10172A",
        },
      },
      content: {
        counter: "counter(test, decimal-leading-zero)",
      },
    },
    screens: {
      xs: "440px",
      sm: "640px",
      md: "835px",
      "l-md": "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
  safelist: [
    "text-brand",
    "text-brand-dark",
    "bg-brand",
    "bg-brand-dark",
    "border-brand",
    "border-brand-dark",
  ],
};

export default config;
