import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { loadFromKey } from "@lib/localStorage"

type ReactionsState = Reaction[]
export const STORAGE_KEY = "batch-simulator:reactions"
const initialState: ReactionsState = loadFromKey(STORAGE_KEY) || []

type AddPayload = Reaction
type UpdatePayload = { id: string; reaction: Reaction }
type RemovePayload = { id: string }
type RemoveCompoundPayload = { id: string }

export const reactionsSlice = createSlice({
  name: "reactions",
  initialState,
  reducers: {
    reset: () => {
      return []
    },

    add: (state, action: PayloadAction<AddPayload>) => {
      return [...state, action.payload]
    },

    update: (state, action: PayloadAction<UpdatePayload>) => {
      const index = state.findIndex((r) => r.id === action.payload.id)
      if (index === -1) return state
      state[index] = action.payload.reaction
    },

    remove: (state, action: PayloadAction<RemovePayload>) => {
      const index = state.findIndex((r) => r.id === action.payload.id)
      if (index === -1) return state
      return [...state.slice(0, index), ...state.slice(index + 1, state.length)]
    },

    removeCompound: (state, action: PayloadAction<RemoveCompoundPayload>) => {
      /**
       * Remove from reactions that have this compound
       */
      const compoundId = action.payload.id
      state.forEach((reaction: Reaction) => {
        reaction.reactants = reaction.reactants.filter(
          (reactionCompound: ReactionCompound) =>
            reactionCompound.compoundId !== compoundId
        )

        reaction.products = reaction.products.filter(
          (reactionCompound: ReactionCompound) =>
            reactionCompound.compoundId !== compoundId
        )

        if (reaction.keyCompound === compoundId) {
          reaction.keyCompound = undefined
        }
      })

      return state
    },
  },
})

export const { reset, add, update, remove, removeCompound } =
  reactionsSlice.actions

export default reactionsSlice.reducer
