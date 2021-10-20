import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Compound } from "../types/Compound"

type CompoundsState = Compound[]
const initialState: CompoundsState = []

type AddCompoundPayload = Compound
type UpdateCompoundPayload = { id: string; compound: Compound }

export const compoundsSlice = createSlice({
  name: "counter",
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
  },
})

export const { addCompound, updateCompound } = compoundsSlice.actions

export default compoundsSlice.reducer
