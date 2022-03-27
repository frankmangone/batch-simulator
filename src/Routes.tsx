import { Routes, Route } from "react-router-dom"

/* Hooks */
import useVersionControl from "./hooks/useVersionControl"

/* Pages */
import CompoundsPage from "./pages/CompoundsPage"
import CompoundsPageNew from "./pages/CompoundsPageNew/index"
import EditCompoundPage from "./pages/EditCompound/index"
import SettingsPage from "./pages/SettingsPage"
import ReactionsPage from "./pages/ReactionsPage"
import ResultsPage from "./pages/ResultsPage"

const Router = () => {
  useVersionControl()

  return (
    <Routes>
      <Route path="/" element={<CompoundsPage />} />
      <Route path="/compounds" element={<CompoundsPage />} />
      <Route path="/compounds-new" element={<CompoundsPageNew />} />
      <Route path="/compounds/:id" element={<EditCompoundPage />} />
      <Route path="/reactions" element={<ReactionsPage />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* Redirect /results to / if no data is available */}
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  )
}

export default Router
