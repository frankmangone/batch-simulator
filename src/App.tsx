import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import GlobalStyles from './GlobalStyles'

/* Context */
import { DataStore } from "./context/DataContext"

/* Layouts */
import MainLayout from "./layouts/MainLayout"

/* Pages */
import CompoundsPage from "./pages/CompoundsPage"
import ModelPage from "./pages/ModelPage"
import ResultsPage from "./pages/ResultsPage"

const App = () => {
  return (
    <DataStore>
      <Router>
        <GlobalStyles />
        <MainLayout>
          <Switch>
            <Route path="/compounds" component={CompoundsPage} />
            <Route path="/model" component={ModelPage} />
            <Route path="/results" component={ResultsPage} />
          </Switch>
        </MainLayout>
      </Router>
    </DataStore>
  )
}

export default App
