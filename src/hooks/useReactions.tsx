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
import {
  divisionToken,
  exponentiationToken,
  multiplicationToken,
  subtractionToken,
  parameterToken,
  variableToken,
  leftParenthesisToken,
  rightParenthesisToken,
} from "../lib/tokens/tokenTypes"
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
          "\\Delta+H_r": "2", // Arrhenius activation energy
        },
        kineticEquation: [
          parameterToken("<k_\\inf>"),
          multiplicationToken,
          parameterToken("e"),
          exponentiationToken,
          leftParenthesisToken,
          leftParenthesisToken,
          subtractionToken,
          parameterToken("<E_A>"),
          rightParenthesisToken,
          divisionToken,
          leftParenthesisToken,
          parameterToken("<R>"),
          multiplicationToken,
          variableToken("{T}"),
          rightParenthesisToken,
          rightParenthesisToken,
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
