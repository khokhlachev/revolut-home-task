import { DefaultTheme, createGlobalStyle } from "styled-components"
import { defaultTheme, th } from "@xstyled/styled-components"

const range = (length: number) => Array.from(Array(length).keys())

export const theme: DefaultTheme = {
  ...defaultTheme,
  fonts: {
    ...defaultTheme.fonts,
    sans: `Inter, "Helvetica Neue", sans-serif`,
  },
  screens: {
    _: 0,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1360,
    "3xl": 1440,
  },
  colors: {
    ...defaultTheme.colors,
    black: "#1A1A1A",
    gray: "#F7F7F7",
    blue: "#2E6AD2",
  },
  space: range(20).reduce(
    (acc, step) => ({
      ...acc,
      [step]: `${(step * 5) / 10}rem`,
    }),
    {} as any
  ),
  animations: {
    ...defaultTheme.animations,
    "fade-in-slow": "fade-in 1s ease-in-out forwards",
    "fade-in": "fade-in .3s ease-in-out forwards",
  },
}

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Inter";
    src: url("/fonts/inter-latin-var.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: ${th.font("sans")};
  }

  @keyframes fade-in {
    from {opacity: 0}
    to {opacity: 1}
  }
`
