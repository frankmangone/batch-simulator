import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./useStore"
import { save, saveField } from "../features/settingsSlice"
import { saveToKey } from "../helpers/localStorage"

/* Constants */
import { STORAGE_KEY } from "../features/settingsSlice"

const useSettings = () => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)

  useEffect(() => {
    /* Save to localStorage upon changes to state */
    saveToKey(settings, STORAGE_KEY)
  }, [settings])

  return {
    settings,

    saveSettings: (newSettings: Settings): void => {
      dispatch(save(newSettings))
    },

    saveField: (field: string, value: string | number): void => {
      dispatch(saveField({ field, value }))
    },
  }
}

export default useSettings
