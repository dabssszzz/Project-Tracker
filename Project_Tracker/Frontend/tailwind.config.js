/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          active: "hsl(var(--primary-active))",
          light: "hsl(var(--primary-light))",
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
        gray: {
          100: "rgb(var(--tw-gray-100))",
          200: "rgb(var(--tw-gray-200))",
          300: "rgb(var(--tw-gray-300))",
          400: "rgb(var(--tw-gray-400))",
          500: "rgb(var(--tw-gray-500))",
          600: "rgb(var(--tw-gray-600))",
          700: "rgb(var(--tw-gray-700))",
          800: "rgb(var(--tw-gray-800))",
          900: "rgb(var(--tw-gray-900))",
        },
        brand: {
          DEFAULT: "rgb(var(--tw-brand))",
          active: "rgb(var(--tw-brand-active))",
          light: "rgb(var(--tw-brand-light))",
        },
        success: {
          DEFAULT: "rgb(var(--tw-success))",
          active: "rgb(var(--tw-success-active))",
          light: "rgb(var(--tw-success-light))",
        },
        warning: {
          DEFAULT: "rgb(var(--tw-warning))",
          active: "rgb(var(--tw-warning-active))",
          light: "rgb(var(--tw-warning-light))",
        },
        danger: {
          DEFAULT: "rgb(var(--tw-danger))",
          active: "rgb(var(--tw-danger-active))",
          light: "rgb(var(--tw-danger-light))",
        },
        info: {
          DEFAULT: "rgb(var(--tw-info))",
          active: "rgb(var(--tw-info-active))",
          light: "rgb(var(--tw-info-light))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
