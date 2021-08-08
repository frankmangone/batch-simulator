import { BrowserRouter as Router } from "react-router-dom"
import GlobalStyles from "./GlobalStyles"

/* Context */
import { DataStore } from "./context/DataContext"

/* Layouts */
import MainLayout from "./layouts/MainLayout"

/* Components */
import Routes from "./Routes"

const App = () => {
  return (
    <DataStore>
      <Router>
        <GlobalStyles />
        <MainLayout>
          <Routes />
        </MainLayout>
      </Router>
    </DataStore>
  )
}

export default App
