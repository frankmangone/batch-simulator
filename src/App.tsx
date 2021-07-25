import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom"
import GlobalStyles from "./GlobalStyles"

/* Context */
import { DataStore } from "./context/DataContext"

/* Layouts */
import MainLayout from "./layouts/MainLayout"

/* Pages */
import CompoundsPage from "./pages/CompoundsPage"
import ReactionsPage from "./pages/ReactionsPage"
import ResultsPage from "./pages/ResultsPage"

const App = () => {
  return (
    <DataStore>
      <Router>
        <GlobalStyles />
        <MainLayout>
          <Switch>
            <Route path="/" exact component={CompoundsPage} />
            <Route path="/compounds" component={CompoundsPage} />
            <Route path="/reactions" component={ReactionsPage} />
            <Route path="/results" component={ResultsPage} />
            {/* Redirect for deployed URL */}
            <Route path="/batch-simulator">
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            </Route>
          </Switch>
        </MainLayout>
      </Router>
    </DataStore>
  )
}

export default App
