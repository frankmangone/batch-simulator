import { Switch, Redirect, Route } from "react-router-dom"

/* Hooks */
import { useData } from "./context/DataContext"

/* Pages */
import CompoundsPage from "./pages/CompoundsPage"
import OperationPage from "./pages/OperationPage"
import ReactionsPage from "./pages/ReactionsPage"
import ResultsPage from "./pages/ResultsPage"

const Routes = () => {
  const { simulationResults } = useData()

  return (
    <Switch>
      <Route path="/" exact component={CompoundsPage} />
      <Route path="/compounds" component={CompoundsPage} />
      <Route path="/reactions" component={ReactionsPage} />
      <Route path="/operation" component={OperationPage} />

      {/* Redirect for deployed URL */}
      <Route path="/batch-simulator">
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      </Route>

      {/* Redirect /results to / if no data is available */}
      <Route path="/results" component={ResultsPage}>
        {simulationResults ? (
          <ResultsPage />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )}
      </Route>
    </Switch>
  )
}

export default Routes
