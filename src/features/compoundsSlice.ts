import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { loadFromKey } from "../helpers/localStorage"

type CompoundsState = Compound[]
export const STORAGE_KEY = "batch-simulator:compounds"
const initialState: CompoundsState = loadFromKey(STORAGE_KEY) || []

type AddPayload = Compound
type UpdatePayload = { id: string; compound: Compound }
type RemovePayload = { id: string }

export const compoundsSlice = createSlice({
  name: "compounds",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<AddPayload>) => {
      return [...state, action.payload]
    },

    update: (state, action: PayloadAction<UpdatePayload>) => {
      const index = state.findIndex((c) => c.id === action.payload.id)
      if (index === -1) return state
      state[index] = action.payload.compound
    },

    remove: (state, action: PayloadAction<RemovePayload>) => {
      const index = state.findIndex((c) => c.id === action.payload.id)
      if (index === -1) return state
      return [...state.slice(0, index), ...state.slice(index + 1, state.length)]
    },

    reset: () => {
      return []
    },
  },
})

export const { add, update, remove, reset } = compoundsSlice.actions

export default compoundsSlice.reducer
