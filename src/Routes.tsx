import { Routes, Route } from "react-router-dom"

/* Hooks */
import useVersionControl from "./hooks/useVersionControl"

/* Pages */
import CompoundsPageOld from "./pages/CompoundsPageOld"
import CompoundsPage from "./pages/CompoundsPage/index"
import EditCompoundPage from "./pages/EditCompound/index"
import SettingsPage from "./pages/SettingsPage"
import ReactionsPage from "./pages/ReactionsPage/index"
import ReactionsPageOld from "./pages/ReactionsPageOld"
import ResultsPage from "./pages/ResultsPage"

const Router = () => {
  useVersionControl()

  return (
    <Routes>
      <Route path="/" element={<CompoundsPage />} />
      <Route path="/compounds-old" element={<CompoundsPageOld />} />
      <Route path="/compounds" element={<CompoundsPage />} />
      <Route path="/compounds/:id" element={<EditCompoundPage />} />
      <Route path="/reactions" element={<ReactionsPage />} />
      <Route path="/reactions-old" element={<ReactionsPageOld />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* Redirect /results to / if no data is available */}
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  )
}

export default Router
