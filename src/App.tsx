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
  :root {
    --color-primary-darkest: hsl(213,48%,15%);
    --color-primary-darker: hsl(213,48%,30%);
    --color-primary-dark: hsl(213,48%,50%);
    --color-primary-normal: hsl(213,48%,70%);
    --color-primary-light: hsl(213,48%,85%);
    --color-primary-lighter: hsl(213,48%,95%);

    --color-triadic-green-darker: hsl(93,40%,30%);
    --color-triadic-green-dark: hsl(93,40%,45%);
    --color-triadic-green-normal: hsl(93,40%,70%);
    --color-triadic-green-light: hsl(93,40%,85%);
    --color-triadic-green-lighter: hsl(93,40%,95%);

    --color-grey-dark: hsl(213, 20%, 30%);
    --color-grey-normal: hsl(213, 20%, 45%);
    --color-grey-light: hsl(213, 20%, 70%);
    --color-grey-lighter: hsl(213, 20%, 85%);
    --color-grey-lightest: hsl(213, 20%, 95%);
  }
  
  body {
    margin: 0;
    margin-top: 30px;
    background-color: var(--color-grey-lighter);
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
