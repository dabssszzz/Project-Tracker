/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Shadcn/UI colors (existing)
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
        // OpsPortal gray scale
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
        // OpsPortal contextual colors
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
        dark: {
          DEFAULT: "rgb(var(--tw-dark))",
          active: "rgb(var(--tw-dark-active))",
          light: "rgb(var(--tw-dark-light))",
        },
      },
      // OpsPortal custom font sizes
      fontSize: {
        '4xs': ['0.5rem', { lineHeight: '0.75rem' }],
        '3xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        '2sm': ['0.8125rem', { lineHeight: '1.25rem' }],
        'md': ['0.9375rem', { lineHeight: '1.5rem' }],
        '1.5xl': ['1.375rem', { lineHeight: '1.875rem' }],
        '2.5xl': ['1.75rem', { lineHeight: '2.25rem' }],
      },
      // OpsPortal custom spacing
      spacing: {
        '0.75': '0.1875rem',
        '1.25': '0.3125rem',
        '1.75': '0.4375rem',
        '2.25': '0.5625rem',
        '2.75': '0.6875rem',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '12.5': '3.125rem',
      },
      // OpsPortal box shadows
      boxShadow: {
        'sm-light': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'light': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md-light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg-light': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl-light': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl-light': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'sm-dark': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'dark': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
        'md-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
        'lg-dark': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
        'xl-dark': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
        '2xl-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // OpsPortal shake animation
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shake: "shake 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
