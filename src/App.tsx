import { createGlobalStyle } from "styled-components"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

/* Context */
import { DataStore } from "./context/DataContext"

/* Layouts */
import MainLayout from "./layouts/MainLayout"

/* Pages */
import CompoundsPage from "./pages/CompoundsPage"
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

  a, button {
    cursor: pointer;
  }

  a, button, input {
    transition: all 0.15s ease-in-out;
  }

  input {
    background-color: unset;
    border: none;
    color: var(--color-grey-dark);
    font-size: 1rem;
    outline: none;
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }

    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes slide-out {
    from {
      opacity: 1;
      transform: translateY(0px);
    }
    
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`

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
