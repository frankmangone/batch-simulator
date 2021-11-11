import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { loadFromKey } from "../helpers/localStorage"

type SettingsState = Settings
export const STORAGE_KEY = "batch-simulator:settings"
const initialState: SettingsState = loadFromKey(STORAGE_KEY) || {
  // Reaction times
  reactionTime: 30,
  deadTime: 30,
  timeStep: 0.1,

  // Units
  timeUnits: "s",
  volumeUnits: "L",
  molarUnits: "mol",
  massUnits: "kg",
  temperatureUnits: "K",

  // Heat Exchange
  isothermal: true,
  initialTemperature: 25,
}

type SaveFieldAction = PayloadAction<{ field: string; value: string | number }>
type SaveAction = PayloadAction<Settings>

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    save: (state, action: SaveAction) => {
      return action.payload
    },

    saveField: (state, action: SaveFieldAction) => {
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      }
    },
  },
})

export const { save, saveField } = settingsSlice.actions

export default settingsSlice.reducer
