import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ApsnyTravel color palette
        navy: {
          900: "#0f172a", // Primary background
          800: "#1e293b", // Slightly lighter for cards/sections
          700: "#334155", // Borders, dividers
        },
        cloud: {
          DEFAULT: "#f8f7f4", // Cloud Dancer - accent for cards
          dark: "#e5e7eb",    // Primary text
          muted: "#9ca3af",   // Secondary/muted text
        },
        winter: {
          blue: "#60a5fa",    // Accent for links/highlights
          teal: "#2dd4bf",    // Secondary accent
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
