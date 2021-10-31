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
import { saveToKey } from "../helpers/localStorage"

/* Constants */
import { STORAGE_KEY } from "../features/reactionsSlice"

/* Helpers */
import { Token, TokenTypes } from "../helpers/tokenization"

/* Types */
import type { Reaction } from "../types/Reaction"

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
        kineticModel: 0,
        kineticConstants: {
          "k_\\inf": 1000000, // Pre exponential term for Arrhenius
          E_A: 30000, // Arrhenius activation energy
        },
        kineticEquation: [
          new Token(TokenTypes.Parameter, "<k_\\inf>"),
          new Token(TokenTypes.Operator, "*"),
          new Token(TokenTypes.Parameter, "e"),
          new Token(TokenTypes.Operator, "^"),
          new Token(TokenTypes.LeftParenthesis, "("),
          new Token(TokenTypes.LeftParenthesis, "("),
          new Token(TokenTypes.Parameter, "<E_A>"),
          new Token(TokenTypes.RightParenthesis, ")"),
          new Token(TokenTypes.Operator, "/"),
          new Token(TokenTypes.LeftParenthesis, "("),
          new Token(TokenTypes.Parameter, "<R>"),
          new Token(TokenTypes.Operator, "*"),
          new Token(TokenTypes.Variable, "{T}"),
          new Token(TokenTypes.RightParenthesis, ")"),
          new Token(TokenTypes.RightParenthesis, ")"),
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
