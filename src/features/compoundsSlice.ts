import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Compound } from "../types/Compound"

type CompoundsState = Compound[]
const initialState: CompoundsState = []

type AddCompoundPayload = Compound
type UpdateCompoundPayload = { id: string; compound: Compound }
type RemoveCompoundPayload = { id: string }

export const compoundsSlice = createSlice({
  name: "compounds",
  initialState,
  reducers: {
    addCompound: (state, action: PayloadAction<AddCompoundPayload>) => {
      return [...state, action.payload]
    },

    updateCompound: (state, action: PayloadAction<UpdateCompoundPayload>) => {
      const index = state.findIndex((c) => c.id === action.payload.id)
      if (index === -1) return state
      state[index] = action.payload.compound
    },

    removeCompound: (state, action: PayloadAction<RemoveCompoundPayload>) => {
      const index = state.findIndex((c) => c.id === action.payload.id)
      if (index === -1) return state
      return [...state.slice(0, index), ...state.slice(index + 1, state.length)]
    },

    removeAllCompounds: () => {
      return []
    },
  },
})

export const {
  addCompound,
  updateCompound,
  removeCompound,
  removeAllCompounds,
} = compoundsSlice.actions

export default compoundsSlice.reducer
