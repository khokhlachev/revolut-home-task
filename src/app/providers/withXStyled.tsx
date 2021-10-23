import {
  ThemeProvider,
  Preflight,
  defaultTheme,
} from "@xstyled/styled-components"
import { DefaultTheme, createGlobalStyle } from "styled-components"
import { ReactNode } from "react"

const range = (length: number) => Array.from(Array(length).keys())

const theme: DefaultTheme = {
  ...defaultTheme,
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

const GlobalStyle = createGlobalStyle`
  @keyframes fade-in {
    from {opacity: 0}
    to {opacity: 1}
  }
`

export const withXStyled = (component: () => ReactNode) => () =>
  (
    <ThemeProvider theme={theme}>
      <Preflight />
      <GlobalStyle />
      {component()}
    </ThemeProvider>
  )
