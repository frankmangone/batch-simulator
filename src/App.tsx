import { createGlobalStyle } from "styled-components"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

/* Context */
import { DataStore } from "./context/DataContext"

/* Layouts */
import MainLayout from "./layouts/MainLayout"

/* Pages */
import InputsPage from "./pages/InputsPage"
import ModelPage from "./pages/ModelPage"
import ResultsPage from "./pages/ResultsPage"

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    margin-top: 30px;
    background-color: #26282B;
  }
`

const App = () => {
  return (
    <DataStore>
      <Router>
        <GlobalStyles />
        <MainLayout>
          <Switch>
            <Route path="/inputs" component={InputsPage} />
            <Route path="/model" component={ModelPage} />
            <Route path="/results" component={ResultsPage} />
          </Switch>
        </MainLayout>
      </Router>
    </DataStore>
  )
}

export default App
