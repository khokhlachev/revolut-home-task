import compose from "compose-function"
import { withRouter } from "./withRouter"
import { withXStyled } from "./withXStyled"

export const withProviders = compose(withRouter, withXStyled)
