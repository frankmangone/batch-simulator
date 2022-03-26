import { BrowserRouter as Router } from "react-router-dom"
import ContextProvider from "./ContextProvider"
import GlobalStyles from "./GlobalStyles"

/* Layouts */
import MainLayout from "./layouts/MainLayout"

/* Components */
import Routes from "./Routes"

const App: React.VFC = () => {
  return (
    <ContextProvider>
      <Router>
        <GlobalStyles />
        <MainLayout>
          <Routes />
        </MainLayout>
      </Router>
    </ContextProvider>
  )
}

export default App
