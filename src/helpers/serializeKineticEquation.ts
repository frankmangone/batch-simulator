/* Helpers */
import { Token, TokenTypes } from "../helpers/tokenization"
import { KineticModel } from "../types/Reaction"
import type { Reaction, ReactionCompound } from "../types/Reaction"

const serializeKineticEquation = (
  reaction: Reaction,
  compounds: Compound[]
): Token[] => {
  const findCompound = (id: string): Compound | undefined => {
    return compounds.find((c) => c.id === id)
  }

  const equationTokens: Token[] = []
  /**
   * TODO: this is just a placeholder for a future serialization system, maybe
   * with direct user input!
   *
   * Returns tokenized equation with standard notation
   */
  switch (reaction.kineticModel) {
    case KineticModel.hyperbolic:
      equationTokens.push(new Token(TokenTypes.Parameter, `<k_\\inf>`))
      addArrheniusExponential(equationTokens)

      reaction.reactants.forEach((reactionCompound) => {
        const { symbol } = findCompound(reactionCompound.compoundId) as Compound
        addHyperbolicTerm(equationTokens, symbol)
      })
      return equationTokens

    //

    case KineticModel.autocatalytic:
      equationTokens.push(new Token(TokenTypes.Parameter, `<k_\\inf>`))
      addArrheniusExponential(equationTokens)

      reaction.reactants.forEach((reactionCompound) => {
        const { symbol } = findCompound(reactionCompound.compoundId) as Compound
        addReactantWithExponent(equationTokens, symbol)
      })
      reaction.products.forEach((reactionCompound) => {
        const { symbol } = findCompound(reactionCompound.compoundId) as Compound
        addProductWithExponent(equationTokens, symbol)
      })
      return equationTokens

    //

    default:
      equationTokens.push(new Token(TokenTypes.Parameter, `<k_\\inf>`))
      addArrheniusExponential(equationTokens)

      reaction.reactants.forEach((reactionCompound: ReactionCompound) => {
        const { symbol } = findCompound(reactionCompound.compoundId) as Compound
        addReactantWithExponent(equationTokens, symbol)
      })
      return equationTokens
  }
}

export default serializeKineticEquation

// Helpers

const addArrheniusExponential = (equationTokens: Token[]): void => {
  equationTokens.push(new Token(TokenTypes.Operator, "*"))
  equationTokens.push(new Token(TokenTypes.Parameter, "e"))
  equationTokens.push(new Token(TokenTypes.Operator, "^"))
  equationTokens.push(new Token(TokenTypes.LeftParenthesis, "("))
  equationTokens.push(new Token(TokenTypes.LeftParenthesis, "("))
  equationTokens.push(new Token(TokenTypes.Operator, "-"))
  equationTokens.push(new Token(TokenTypes.Parameter, "<E_A>"))
  equationTokens.push(new Token(TokenTypes.RightParenthesis, ")"))
  equationTokens.push(new Token(TokenTypes.Operator, "/"))
  equationTokens.push(new Token(TokenTypes.LeftParenthesis, "("))
  equationTokens.push(new Token(TokenTypes.Parameter, "<R>"))
  equationTokens.push(new Token(TokenTypes.Operator, "*"))
  equationTokens.push(new Token(TokenTypes.Variable, "{T}"))
  equationTokens.push(new Token(TokenTypes.RightParenthesis, ")"))
  equationTokens.push(new Token(TokenTypes.RightParenthesis, ")"))
}

const addReactantWithExponent = (
  equationTokens: Token[],
  symbol: string
): void => {
  equationTokens.push(new Token(TokenTypes.Operator, "*"))
  equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
  equationTokens.push(new Token(TokenTypes.Operator, "^"))
  equationTokens.push(new Token(TokenTypes.Parameter, `<\\alpha_${symbol}>`))
}

const addProductWithExponent = (
  equationTokens: Token[],
  symbol: string
): void => {
  equationTokens.push(new Token(TokenTypes.Operator, "*"))
  equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
  equationTokens.push(new Token(TokenTypes.Operator, "^"))
  equationTokens.push(new Token(TokenTypes.Parameter, `<\\beta_${symbol}>`))
}

const addHyperbolicTerm = (equationTokens: Token[], symbol: string): void => {
  equationTokens.push(new Token(TokenTypes.Operator, "*"))
  equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
  equationTokens.push(new Token(TokenTypes.Operator, "/"))
  equationTokens.push(new Token(TokenTypes.LeftParenthesis, "("))
  equationTokens.push(new Token(TokenTypes.Parameter, `<K_${symbol}>`))
  equationTokens.push(new Token(TokenTypes.Operator, "+"))
  equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
  equationTokens.push(new Token(TokenTypes.RightParenthesis, ")"))
}
