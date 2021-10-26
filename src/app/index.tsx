import { withProviders } from "./providers"
import { Routing } from "@/pages"
import "./index.css"

export function App() {
  return (
    <div>
      {/* // global layout can be inserted here */}
      <Routing />
    </div>
  )
}

export default withProviders(App)
