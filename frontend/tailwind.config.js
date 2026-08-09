/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        clinical: {
          50: "#F3F8FF",
          100: "#E4EFFF",
          200: "#C3DDFF",
          300: "#93C1FF",
          400: "#5C9EFB",
          500: "#3478F6",
          600: "#215BDB",
          700: "#1B45AC",
          800: "#193A87",
          900: "#122A61",
        },
        pulse: {
          400: "#38D6D0",
          500: "#0FBFB8",
          600: "#0AA39D",
        },
        ink: "#0E1B33",
        muted: "#5B6B85",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(14, 27, 51, 0.04), 0 8px 24px -8px rgba(18, 42, 97, 0.12)",
        cardHover: "0 4px 12px rgba(14, 27, 51, 0.06), 0 16px 32px -12px rgba(18, 42, 97, 0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
