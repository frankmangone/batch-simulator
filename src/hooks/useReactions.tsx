import randomstring from "randomstring"
import { useAppDispatch, useAppSelector } from "./useStore"
import useCompounds from "./useCompounds"
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
import type { Compound } from "../types/Compound"
import type { Reaction, ReactionCompound } from "../types/Reaction"

const useReactions = () => {
  const dispatch = useAppDispatch()
  const reactions = useAppSelector((state) => state.reactions)
  const { findCompound } = useCompounds()

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

    updateReaction: (id: string, updatedReaction: Reaction): void => {
      dispatch(update({ id, reaction: updatedReaction }))
    },

    removeCompoundFromReactions: (compoundId: string): void => {
      dispatch(removeCompound({ id: compoundId }))
    },

    removeReaction: (id: string): void => {
      dispatch(remove({ id }))
    },

    serializeKineticEquation: (reaction: Reaction, index: number): Token[] => {
      const equationTokens: Token[] = []
      /**
       * TODO: this is just a placeholder for a future serialization system, maybe
       * with direct user input!
       */
      /* Returns infix notation */
      switch (reaction.kineticModel) {
        case 1:
          equationTokens.push(new Token(TokenTypes.Parameter, `<\\mu>`))

          reaction.reactants.forEach((reactionCompound) => {
            const { symbol } = findCompound(
              reactionCompound.compoundId
            ) as Compound
            equationTokens.push(new Token(TokenTypes.Operator, "*"))
            equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
            equationTokens.push(new Token(TokenTypes.Operator, "/"))
            equationTokens.push(new Token(TokenTypes.LeftParenthesis, "("))
            equationTokens.push(
              new Token(TokenTypes.Parameter, `<K_${symbol}>`)
            )
            equationTokens.push(new Token(TokenTypes.Operator, "+"))
            equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
            equationTokens.push(new Token(TokenTypes.RightParenthesis, ")"))
          })
          return equationTokens
        //
        case 2:
          equationTokens.push(new Token(TokenTypes.Parameter, `<k>`))

          reaction.reactants.forEach((reactionCompound) => {
            const { symbol } = findCompound(
              reactionCompound.compoundId
            ) as Compound
            equationTokens.push(new Token(TokenTypes.Operator, "*"))
            equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
            equationTokens.push(new Token(TokenTypes.Operator, "^"))
            equationTokens.push(
              new Token(TokenTypes.Parameter, `<\\alpha_${symbol}>`)
            )
          })
          reaction.products.forEach((reactionCompound) => {
            const { symbol } = findCompound(
              reactionCompound.compoundId
            ) as Compound
            equationTokens.push(new Token(TokenTypes.Operator, "*"))
            equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
            equationTokens.push(new Token(TokenTypes.Operator, "^"))
            equationTokens.push(
              new Token(TokenTypes.Parameter, `<\\beta_${symbol}>`)
            )
          })
          return equationTokens
        //
        default:
          equationTokens.push(new Token(TokenTypes.Parameter, `<k>`))

          reaction.reactants.forEach((reactionCompound: ReactionCompound) => {
            const { symbol } = findCompound(
              reactionCompound.compoundId
            ) as Compound
            equationTokens.push(new Token(TokenTypes.Operator, "*"))
            equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
            equationTokens.push(new Token(TokenTypes.Operator, "^"))
            equationTokens.push(
              new Token(TokenTypes.Parameter, `<\\alpha_${symbol}>`)
            )
          })
          return equationTokens
      }
    },
  }
}

export default useReactions
