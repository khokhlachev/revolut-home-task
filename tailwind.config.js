const range = (length) => Array.from(Array(length).keys())
const grid = (columns) =>
  range(columns).reduce(
    (acc, i) => ({
      ...acc,
      [`${i + 1}/${columns}`]: `${((i + 1) / columns) * 100}%`,
    }),
    {}
  )

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ["Inter", "Helvetica\\ Neue", "sans-serif"],
    },
    spacing: range(40).reduce(
      (acc, step) => ({
        ...acc,
        [step]: `${(step * 5) / 10}rem`,
      }),
      {}
    ),
    extend: {
      screens: {
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1360px",
        "3xl": "1440px",
      },
      colors: {
        black: "#1A1A1A",
        gray: "#F7F7F7",
        blue: "#2E6AD2",
      },
      width: {
        auto: "auto",
        "1/2": "50%",
        ...grid(3),
        ...grid(4),
        ...grid(5),
        ...grid(6),
        ...grid(7),
        ...grid(8),
        ...grid(9),
        ...grid(10),
        ...grid(12),
        full: "100%",
        screen: "100vw",
      },
      minHeight: {
        screen: "100vh",
      },
      animation: {
        "fade-in": "fade-in 1s ease forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
