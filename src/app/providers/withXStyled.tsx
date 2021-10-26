import { ThemeProvider, Preflight } from "@xstyled/styled-components"
import { ReactNode } from "react"
import { theme, GlobalStyle } from "../config"

export const withXStyled = (component: () => ReactNode) => () =>
  (
    <ThemeProvider theme={theme}>
      <Preflight />
      <GlobalStyle />
      {component()}
    </ThemeProvider>
  )
