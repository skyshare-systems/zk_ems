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
  			padding: '1rem',
  			screens: {
  				'2xl': '1440px'
  			}
  		},
  		colors: {
  			gold: 'hsl(var(--gold))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsla(var(--background))',
  			foreground: 'hsla(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [twTypography,twAnimate,  plugin(function ({ addBase, addComponents, addUtilities }: PluginAPI) {
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
