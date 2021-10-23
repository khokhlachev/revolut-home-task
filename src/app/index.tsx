import { withProviders } from "./providers"
import { Routing } from "@/pages"
import "./index.css"

function App() {
  return (
    <div>
      {/* // global layout can be inserted here */}
      <Routing />
    </div>
  )
}

export default withProviders(App)
