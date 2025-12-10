import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════════════════════════
        // ABKHAZIA TOUR CATALOG - NATURE-INSPIRED COLOR SYSTEM
        // Based on: Cloud Dancer (PANTONE 11-4201), Lake Ritsa emerald waters,
        // Caucasus mountain forests, warm stone textures
        // ═══════════════════════════════════════════════════════════════

        // ── BASE: Cloud Dancer (#f8f7f4) ──
        // The warm, off-white creates a calm, trustworthy foundation
        cloud: {
          DEFAULT: "#f8f7f4", // Cloud Dancer - Main background
          soft: "#fdfcfa",    // Lighter variant for elevated cards
          warm: "#f3f1ec",    // Warmer tone for alternating sections
          cream: "#e8e5de",   // Soft borders and dividers
        },

        // ── TEXT: Ink System ──
        // Deep, legible text colors with warm undertones
        ink: {
          950: "#1c1917",     // Headlines - almost black with warmth
          900: "#292524",     // Primary text - rich charcoal
          700: "#44403c",     // Body text - readable gray-brown
          500: "#78716c",     // Secondary/muted text
          400: "#a8a29e",     // Placeholder, disabled states
          300: "#d6d3d1",     // Very subtle text, decorative
        },

        // ── PRIMARY ACCENT: Emerald ──
        // Inspired by Lake Ritsa's famous turquoise-emerald waters
        emerald: {
          DEFAULT: "#059669", // Primary CTA, links - vibrant lake green
          light: "#10b981",   // Hover state - lighter emerald
          dark: "#047857",    // Active/pressed state
          muted: "#d1fae5",   // Subtle backgrounds, badges
          50: "#ecfdf5",      // Very light tint for large areas
        },

        // ── SECONDARY ACCENT: Forest ──
        // Deep Caucasus evergreen boxwood forests
        forest: {
          DEFAULT: "#365314", // Deep forest green for emphasis
          light: "#4d7c0f",   // Lighter forest for hover
          dark: "#1a2e05",    // Very dark for contrast
          muted: "#d9f99d",   // Light lime for subtle accents
        },

        // ── TERTIARY: Warm Terracotta ──
        // Georgian/Caucasus traditional warm clay tones
        // Used sparingly for prices, important actions
        terracotta: {
          DEFAULT: "#c2410c", // Warm orange-red for CTAs, prices
          light: "#ea580c",   // Hover - brighter orange
          dark: "#9a3412",    // Active state
          muted: "#fed7aa",   // Subtle warm backgrounds
        },

        // ── NEUTRAL: Stone ──
        // Mountain stone and pebble colors for UI elements
        stone: {
          DEFAULT: "#78716c", // Neutral text/icons
          light: "#a8a29e",   // Borders, subtle elements
          lighter: "#d6d3d1", // Very light borders
          dark: "#57534e",    // Darker neutral
          100: "#f5f5f4",     // Near-white stone
          200: "#e7e5e4",     // Light stone
          300: "#d6d3d1",     // Medium-light
          400: "#a8a29e",     // Medium
          500: "#78716c",     // Base
          600: "#57534e",     // Dark
          700: "#44403c",     // Darker
          800: "#292524",     // Very dark
        },

        // ── ACCENT: Lake Blue ──
        // The famous turquoise-blue of Lake Ritsa and Blue Lake
        lake: {
          DEFAULT: "#0891b2", // Vivid cyan for water-themed elements
          light: "#22d3ee",   // Light cyan
          dark: "#0e7490",    // Deeper cyan
          muted: "#cffafe",   // Very light cyan backgrounds
        },

        // ── SEMANTIC: Status Colors ──
        success: "#16a34a",   // Confirmations, availability
        warning: "#ca8a04",   // Cautions, limited spots
        error: "#dc2626",     // Errors, cancellations
        info: "#0284c7",      // Information, tips
      },

      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif"
        ],
      },

      // Extended shadows for depth
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(28, 25, 23, 0.08)',
        'card': '0 4px 12px -4px rgba(28, 25, 23, 0.1)',
        'elevated': '0 8px 24px -8px rgba(28, 25, 23, 0.12)',
      },

      // Smooth border radius
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
