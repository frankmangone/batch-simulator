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
  timeUnits: 0,
  volumeUnits: 0,
  molarUnits: 0,
  massUnits: 0,
  temperatureUnits: 0,
  energyUnits: 0,

  // Heat Exchange
  isothermal: true,
  initialTemperature: 300,
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
