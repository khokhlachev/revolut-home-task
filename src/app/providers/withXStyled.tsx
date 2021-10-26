import { ThemeProvider, Preflight } from "@xstyled/styled-components"
import { createGlobalStyle } from "styled-components"
import { ReactNode } from "react"
import { theme } from "../config"

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
