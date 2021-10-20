import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Reaction } from "../types/Reaction"

type ReactionsState = Reaction[]
const initialState: ReactionsState = []

type AddReactionPayload = Reaction
type UpdateReactionPayload = { id: string; reaction: Reaction }
type RemoveReactionPayload = { id: string }

export const reactionsSlice = createSlice({
  name: "reactions",
  initialState,
  reducers: {
    addReaction: (state, action: PayloadAction<AddReactionPayload>) => {
      return [...state, action.payload]
    },

    // updateCompound: (state, action: PayloadAction<UpdateCompoundPayload>) => {
    //   const index = state.findIndex((c) => c.id === action.payload.id)
    //   if (index === -1) return state
    //   state[index] = action.payload.compound
    // },

    removeReaction: (state, action: PayloadAction<RemoveReactionPayload>) => {
      const index = state.findIndex((r) => r.id === action.payload.id)
      if (index === -1) return state
      return [...state.slice(0, index), ...state.slice(index + 1, state.length)]
    },

    // removeAllCompounds: () => {
    //   return []
    // },
  },
})

export const {
  addReaction,
  // updateCompound,
  removeReaction,
  // removeAllCompounds,
} = reactionsSlice.actions

export default reactionsSlice.reducer
