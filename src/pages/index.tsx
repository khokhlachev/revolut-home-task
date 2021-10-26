import { lazy } from "react"
import { Route, Switch, Redirect } from "react-router-dom"

const ExchangePage = lazy(() => import("./exchange"))

export const Routing = () => {
  return (
    <Switch>
      <Route exact path="/exchange" component={ExchangePage} />
      <Redirect to="/exchange" />
    </Switch>
  )
}
