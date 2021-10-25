import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import GlobalStyles from "./GlobalStyles"

/* Layouts */
import MainLayout from "./layouts/MainLayout"

/* Components */
import Routes from "./Routes"

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyles />
        <MainLayout>
          <Routes />
        </MainLayout>
      </Router>
    </Provider>
  )
}

export default App
