import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Compound } from "../types/Compound"

type CompoundsState = Compound[]

const initialState: CompoundsState = []

export const compoundsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addCompound: (state, action: PayloadAction<Compound>) => {
      return [...state, action.payload]
    },
  },
})

export const { addCompound } = compoundsSlice.actions

export default compoundsSlice.reducer
