import randomstring from "randomstring"
import { useAppDispatch, useAppSelector } from "./useStore"
import {
  addReaction,
  // updateReaction,
  // removeReaction,
  // removeAllReactions,
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
      dispatch(addReaction(newReaction))
    },

    // findCompound: (id?: string): Compound | undefined => {
    //   return compounds.find((c) => c.id === id)
    // },

    // updateCompound: (id: string, updatedCompound: Compound): void => {
    //   dispatch(updateCompound({ id, compound: updatedCompound }))
    // },

    // removeCompound: (id: string): void => {
    //   // TODO: Dispatch update reactions!!
    //   dispatch(removeCompound({ id }))
    // },

    // removeAllCompounds: (): void => {
    //   // TODO: Dispatch update reactions!!
    //   dispatch(removeAllCompounds())
    // },
  }
}

export default useCompounds