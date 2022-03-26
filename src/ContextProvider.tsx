import { Provider } from "react-redux"
import { ThemeProvider } from "./contexts/Theme"
import store from "./store"

const ContextProvider: React.FC = (props) => {
  const { children } = props

  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  )
}

export default ContextProvider
