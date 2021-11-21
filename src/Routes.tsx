import { Switch, Redirect, Route } from "react-router-dom"

/* Hooks */
import useSimulationResults from "./hooks/useSimulationResults"
import useVersionControl from "./hooks/useVersionControl"

/* Pages */
import CompoundsPage from "./pages/CompoundsPage"
import SettingsPage from "./pages/SettingsPage"
import ReactionsPage from "./pages/ReactionsPage"
import ResultsPage from "./pages/ResultsPage"

const Routes = () => {
  const { simulationResults } = useSimulationResults()

  useVersionControl()

  return (
    <Switch>
      <Route path="/" exact component={CompoundsPage} />
      <Route path="/compounds" component={CompoundsPage} />
      <Route path="/reactions" component={ReactionsPage} />
      <Route path="/settings" component={SettingsPage} />

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
        {simulationResults?.length ? (
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
