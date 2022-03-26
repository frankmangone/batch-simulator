import { BrowserRouter as Router } from "react-router-dom"
import ContextProvider from "./ContextProvider"
import GlobalStyles from "./GlobalStyles"

/* Components */
import Routes from "./Routes"

const App: React.VFC = () => {
  return (
    <ContextProvider>
      <Router>
        <GlobalStyles />
        <Routes />
      </Router>
    </ContextProvider>
  )
}

export default App
