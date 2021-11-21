import { useEffect } from "react"
import useLocalStorageState from "./useLocalStorageState"
import useCompounds from "./useCompounds"
import useSettings from "./useSettings"

const CURRENT_VERSION = "1.0.0"

const useVersionControl = () => {
  const [version, setVersion] = useLocalStorageState("currentVersion")
  const { removeAllCompounds } = useCompounds()
  const { resetSettings } = useSettings()

  useEffect(() => {
    if (version === CURRENT_VERSION) return

    setVersion(CURRENT_VERSION)
    removeAllCompounds()
    resetSettings()
    // eslint-disable-next-line
  }, [])
}

export default useVersionControl
