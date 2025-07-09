import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import twAnimate from "tailwindcss-animate";
import twTypography from "@tailwindcss/typography";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      typography: {
        /* DEFAULT: {
           css: {
            '--tw-prose-body': "#fff",
            '--tw-prose-headings': "#fff",
            '--tw-prose-lead': "#fff",
            '--tw-prose-links': "#fff",
            '--tw-prose-bold': "#fff",
            '--tw-prose-counters': "#fff",
            '--tw-prose-bullets': "#fff",
            '--tw-prose-hr': "#fff",
            '--tw-prose-quotes': "#fff",
            '--tw-prose-quote-borders': "#fff",
            '--tw-prose-captions': "#fff",
            '--tw-prose-code': "#fff",
            '--tw-prose-pre-code': "#fff",
            '--tw-prose-pre-bg': "rgb(0 0 0 / 50%)",
            '--tw-prose-th-borders': "#fff",
            '--tw-prose-td-borders': "#fff",
            '--tw-prose-invert-body': "#fff",
            '--tw-prose-invert-headings': "#fff",
            '--tw-prose-invert-lead': "#fff",
            '--tw-prose-invert-links': "#fff",
            '--tw-prose-invert-bold': "#fff",
            '--tw-prose-invert-counters': "#fff",
            '--tw-prose-invert-bullets': "#fff",
            '--tw-prose-invert-hr': "#fff",
            '--tw-prose-invert-quotes': "#fff",
            '--tw-prose-invert-quote-borders': "#fff",
            '--tw-prose-invert-captions': "#fff",
            '--tw-prose-invert-code': "#fff",
            '--tw-prose-invert-pre-code': "#fff",
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': "#fff",
            '--tw-prose-invert-td-borders': "#fff",
          },
        }, */
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1440px",
        },
      },
      colors: {
        black_v2: {
          100: "#000205",
          80: "rgba(0, 2, 5, 0.80)",
          72: "rgba(0, 2, 5, 0.72)",
          50: "rgba(0, 2, 5, 0.50)",
          32: "rgba(0, 2, 5, 0.32)",
          16: "rgba(0, 2, 5, 0.16)",
          12: "rgba(0, 2, 5, 0.12)",
          8: "rgba(0, 2, 5, 0.08)",
          4: "rgba(0, 2, 5, 0.04)",
        },

        gray_v2: {
          100: "rgba(242, 242, 243, 1.00)",
          80: "rgba(242, 242, 243, 0.80)",
          72: "rgba(242, 242, 243, 0.72)",
          50: "rgba(242, 242, 243, 0.50)",
          32: "rgba(242, 242, 243, 0.32)",
          16: "rgba(242, 242, 243, 0.16)",
          12: "rgba(242, 242, 243, 0.12)",
          8: "rgba(242, 242, 243, 0.08)",
          4: "rgba(242, 242, 243, 0.04)",
        },

        white_v2: {
          100: "#FFF",
          80: "rgba(255, 255, 255, 0.80)",
          72: "rgba(255, 255, 255, 0.72)",
          50: "rgba(255, 255, 255, 0.50)",
          32: "rgba(255, 255, 255, 0.32)",
          16: "rgba(255, 255, 255, 0.16)",
          12: "rgba(255, 255, 255, 0.12)",
          8: "rgba(255, 255, 255, 0.08)",
          4: "rgba(255, 255, 255, 0.04)",
        },

        gold_v2: {
          100: "#F3BC30",
          80: "rgba(243, 188, 48, 0.80)",
          72: "rgba(243, 188, 48, 0.72)",
          50: "rgba(243, 188, 48, 0.50)",
          32: "rgba(243, 188, 48, 0.32)",
          16: "rgba(243, 188, 48, 0.16)",
          12: "rgba(243, 188, 48, 0.12)",
          8: "rgba(243, 188, 48, 0.08)",
          4: "rgba(243, 188, 48, 0.04)",
        },

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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
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
  plugins: [
    twTypography,
    twAnimate,
    plugin(function ({ addBase, addComponents, addUtilities }: PluginAPI) {
      addBase({});
      addComponents({
        ".ty-outline": {
          "@apply text-[8.19px] font-medium leading-[120%]": {},
        },
        ".ty-subtext": {
          "@apply text-[10.24px] font-normal leading-[120%]": {},
        },
        ".ty-subtitle": {
          "@apply text-[12px] font-semibold leading-[120%]": {},
        },
        ".ty-descriptions": {
          "@apply text-[14px] font-normal leading-[120%]": {},
        },
        ".ty-title": {
          "@apply text-[16px] font-bold leading-[120%]": {},
        },
        ".ty-subheading": {
          "@apply text-[20px] font-normal leading-[120%]": {},
        },
        ".ty-h6": {
          "@apply text-[20px] font-semibold leading-[120%]": {},
        },
        ".ty-h5": {
          "@apply text-[25px] font-semibold leading-[120%]": {},
        },
        ".ty-h4": {
          "@apply text-[31.25px] font-semibold leading-[120%]": {},
        },
        ".ty-h3": {
          "@apply text-[39.06px] font-bold leading-[120%]": {},
        },
        ".ty-h2": {
          "@apply text-[48.83px] font-semibold leading-[120%]": {},
        },
        ".ty-h1": {
          "@apply text-[61.04px] font-semibold leading-[120%]": {},
        },
        ".ty-display": {
          "@apply text-[96px] font-bold  leading-[120%]": {},
        },
      });
      addUtilities({
        ".tap-highlight-color": {
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        },
      });
    }),
  ],
};

export default config;
