import { useAppDispatch, useAppSelector } from "./useStore"
import { save, saveField } from "../features/settingsSlice"

/* Types */
import type { Settings } from "../types/Settings"

const useSettings = () => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)

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
