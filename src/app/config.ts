import { DefaultTheme } from "styled-components"
import { defaultTheme } from "@xstyled/styled-components"

const range = (length: number) => Array.from(Array(length).keys())

export const theme: DefaultTheme = {
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
