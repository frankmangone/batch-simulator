import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import GlobalStyles from "./GlobalStyles"

/* Context */
import { DataStore } from "./context/DataContext"

/* Layouts */
import MainLayout from "./layouts/MainLayout"

/* Components */
import Routes from "./Routes"

const App = () => {
  return (
    <Provider store={store}>
      <DataStore>
        <Router>
          <GlobalStyles />
          <MainLayout>
            <Routes />
          </MainLayout>
        </Router>
      </DataStore>
    </Provider>
  )
}

export default App
