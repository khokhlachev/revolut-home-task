import { Suspense, ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"
import { x } from "@xstyled/styled-components"

export const withRouter = (component: () => ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>{component()}</Suspense>
    </BrowserRouter>
  )

const Fallback = () => <x.div>Loading...</x.div>
