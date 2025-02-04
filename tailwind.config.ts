import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import twAnimate from "tailwindcss-animate";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1440px",
        },
      },
      colors: {
        gold: "hsl(var(--gold))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsla(var(--background))",
        foreground: "hsla(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [twAnimate,  plugin(function ({ addBase, addComponents, addUtilities }: PluginAPI) {
      addBase({});
      addComponents({
        ".ty-outline": {
          "@apply font-normal text-[0.512rem]": {},
        },
        ".ty-subtext": {
          "@apply font-normal text-[0.64rem]": {},
        },
        ".ty-subtitle": {
          "@apply font-medium text-[0.8rem]": {},
        },
        ".ty-descriptions": {
          "@apply font-normal text-[1rem]": {},
        },
        ".ty-title": {
          "@apply font-bold text-[1rem]": {},
        },
        ".ty-subheading": {
          "@apply font-normal text-[1.25rem]": {},
        },
        ".ty-h6": {
          "@apply font-bold text-[1.25rem]": {},
        },
        ".ty-h5": {
          "@apply font-bold text-[1.563rem]": {},
        },
        ".ty-h4": {
          "@apply font-bold text-[1.953rem]": {},
        },
        ".ty-h3": {
          "@apply font-bold text-[2.44125rem]": {},
        },
        ".ty-h2": {
          "@apply font-bold text-[3.05188rem]": {},
        },
        ".ty-h1": {
          "@apply font-bold text-[3.815rem]": {},
        },
        ".ty-display": {
          "@apply font-bold text-[6rem]": {},
        },
      });
      addUtilities({
        ".tap-highlight-color": {
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        },
      });
    })],
};

export default config;
