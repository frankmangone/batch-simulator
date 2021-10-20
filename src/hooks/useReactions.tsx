import randomstring from "randomstring"
import { useAppDispatch, useAppSelector } from "./useStore"
import {
  add,
  reset,
  update,
  remove,
  removeCompound,
} from "../features/reactionsSlice"

/* Helpers */
import { Token, TokenTypes } from "../helpers/tokenization"

/* Types */
import type { Reaction } from "../types/Reaction"

const useCompounds = () => {
  const dispatch = useAppDispatch()
  const reactions = useAppSelector((state) => state.reactions)

  return {
    reactions,

    resetReactions: (): void => {
      dispatch(reset())
    },

    addReaction: (): void => {
      const newReaction = {
        id: randomstring.generate(8),
        name: "",
        reactants: [],
        products: [],
        kineticModel: 0,
        kineticConstants: {
          k: 1,
        },
        kineticEquation: [new Token(TokenTypes.Parameter, "<k>")],
      }
      dispatch(add(newReaction))
    },

    // findCompound: (id?: string): Compound | undefined => {
    //   return compounds.find((c) => c.id === id)
    // },

    updateReaction: (id: string, updatedReaction: Reaction): void => {
      dispatch(update({ id, reaction: updatedReaction }))
    },

    removeCompoundFromReactions: (compoundId: string): void => {
      dispatch(removeCompound({ id: compoundId }))
    },

    removeReaction: (id: string): void => {
      dispatch(remove({ id }))
    },
  }
}

export default useCompounds
