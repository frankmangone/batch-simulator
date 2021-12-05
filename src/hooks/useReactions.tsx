import randomstring from "randomstring"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./useStore"
import {
  add,
  reset,
  update,
  remove,
  removeCompound,
} from "../features/reactionsSlice"
import { STORAGE_KEY } from "../features/reactionsSlice"
import { saveToKey } from "../lib/localStorage"
import { TokenTypes } from "../lib/tokens/tokenTypes"
import { KineticModels } from "../lib/reactionTypes"

const useReactions = () => {
  const dispatch = useAppDispatch()
  const reactions = useAppSelector((state) => state.reactions)

  useEffect(() => {
    /* Save to localStorage upon changes to state */
    saveToKey(reactions, STORAGE_KEY)
  }, [reactions])

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
        kineticModel: KineticModels.simple,
        kineticConstants: {
          "k_\\inf": "1e7", // Pre exponential term for Arrhenius
          E_A: "4.5e4", // Arrhenius activation energy
          "\\Delta+H_r": "200", // Arrhenius activation energy
        },
        kineticEquation: [
          { type: TokenTypes.Parameter, value: "<k_\\inf>" },
          { type: TokenTypes.Operator, value: "*" },
          { type: TokenTypes.Parameter, value: "e" },
          { type: TokenTypes.Operator, value: "^" },
          { type: TokenTypes.LeftParenthesis, value: "(" },
          { type: TokenTypes.LeftParenthesis, value: "(" },
          { type: TokenTypes.Operator, value: "-" },
          { type: TokenTypes.Parameter, value: "<E_A>" },
          { type: TokenTypes.RightParenthesis, value: ")" },
          { type: TokenTypes.Operator, value: "/" },
          { type: TokenTypes.LeftParenthesis, value: "(" },
          { type: TokenTypes.Parameter, value: "<R>" },
          { type: TokenTypes.Operator, value: "*" },
          { type: TokenTypes.Variable, value: "{T}" },
          { type: TokenTypes.RightParenthesis, value: ")" },
          { type: TokenTypes.RightParenthesis, value: ")" },
        ],
      }
      dispatch(add(newReaction))
    },

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

export default useReactions
