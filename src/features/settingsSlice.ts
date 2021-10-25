import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Settings } from "../types/Settings"

type SettingsState = Settings
const initialState: SettingsState = {
  reactionTime: 30,
  deadTime: 30,
  timeStep: 0.1,
  //
  timeUnits: "s",
  volumeUnits: "L",
  molarUnits: "mol",
  massUnits: "kg",
}

// type AddPayload = Compound
type SaveFieldAction = PayloadAction<{ field: string; value: string | number }>
type SaveAction = PayloadAction<Settings>

export const compoundsSlice = createSlice({
  name: "compounds",
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

export const { save, saveField } = compoundsSlice.actions

export default compoundsSlice.reducer
