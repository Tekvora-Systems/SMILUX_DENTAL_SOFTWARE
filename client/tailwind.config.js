import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
        inter: ['Lexend', 'sans-serif'],
        'better-grade': ["'Better Grade'", 'cursive'],
        script: ["'Better Grade'", 'cursive'],
      },
      colors: {
        brand: {
          DEFAULT: "#118bb0",
          blue: "#118bb0",
          sky: "#38bdf8",
          navy: "#1c2536",
          pink: "#e8368f",
          green: "#2ec4b6",
          amber: "#ffb703",
          50: "#f0f9fb",
          100: "#d9f0f5",
          200: "#b7e2ec",
          300: "#85cedf",
          400: "#4cb2cc",
          500: "#118bb0",
          600: "#0e7394",
          700: "#0f5d77",
          800: "#124c61",
          900: "#134051",
          950: "#072a37",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
