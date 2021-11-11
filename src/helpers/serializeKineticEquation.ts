/* Helpers */
import { TokenTypes } from "../helpers/tokenization"

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
      equationTokens.push({ type: TokenTypes.Parameter, value: `<k_\\inf>` })
      addArrheniusExponential(equationTokens)

      reaction.reactants.forEach((reactionCompound) => {
        const { symbol } = findCompound(reactionCompound.compoundId) as Compound
        addHyperbolicTerm(equationTokens, symbol)
      })
      return equationTokens

    //

    case KineticModel.autocatalytic:
      equationTokens.push({ type: TokenTypes.Parameter, value: `<k_\\inf>` })
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
      equationTokens.push({ type: TokenTypes.Parameter, value: `<k_\\inf>` })
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
  equationTokens.push({ type: TokenTypes.Operator, value: "*" })
  equationTokens.push({ type: TokenTypes.Parameter, value: "e" })
  equationTokens.push({ type: TokenTypes.Operator, value: "^" })
  equationTokens.push({ type: TokenTypes.LeftParenthesis, value: "(" })
  equationTokens.push({ type: TokenTypes.LeftParenthesis, value: "(" })
  equationTokens.push({ type: TokenTypes.Operator, value: "-" })
  equationTokens.push({ type: TokenTypes.Parameter, value: "<E_A>" })
  equationTokens.push({ type: TokenTypes.RightParenthesis, value: ")" })
  equationTokens.push({ type: TokenTypes.Operator, value: "/" })
  equationTokens.push({ type: TokenTypes.LeftParenthesis, value: "(" })
  equationTokens.push({ type: TokenTypes.Parameter, value: "<R>" })
  equationTokens.push({ type: TokenTypes.Operator, value: "*" })
  equationTokens.push({ type: TokenTypes.Variable, value: "{T}" })
  equationTokens.push({ type: TokenTypes.RightParenthesis, value: ")" })
  equationTokens.push({ type: TokenTypes.RightParenthesis, value: ")" })
}

const addReactantWithExponent = (
  equationTokens: Token[],
  symbol: string
): void => {
  equationTokens.push({ type: TokenTypes.Operator, value: "*" })
  equationTokens.push({ type: TokenTypes.Variable, value: `{[${symbol}]}` })
  equationTokens.push({ type: TokenTypes.Operator, value: "^" })
  equationTokens.push({
    type: TokenTypes.Parameter,
    value: `<\\alpha_${symbol}>`,
  })
}

const addProductWithExponent = (
  equationTokens: Token[],
  symbol: string
): void => {
  equationTokens.push({ type: TokenTypes.Operator, value: "*" })
  equationTokens.push({ type: TokenTypes.Variable, value: `{[${symbol}]}` })
  equationTokens.push({ type: TokenTypes.Operator, value: "^" })
  equationTokens.push({
    type: TokenTypes.Parameter,
    value: `<\\beta_${symbol}>`,
  })
}

const addHyperbolicTerm = (equationTokens: Token[], symbol: string): void => {
  equationTokens.push({ type: TokenTypes.Operator, value: "*" })
  equationTokens.push({ type: TokenTypes.Variable, value: `{[${symbol}]}` })
  equationTokens.push({ type: TokenTypes.Operator, value: "/" })
  equationTokens.push({ type: TokenTypes.LeftParenthesis, value: "(" })
  equationTokens.push({ type: TokenTypes.Parameter, value: `<K_${symbol}>` })
  equationTokens.push({ type: TokenTypes.Operator, value: "+" })
  equationTokens.push({ type: TokenTypes.Variable, value: `{[${symbol}]}` })
  equationTokens.push({ type: TokenTypes.RightParenthesis, value: ")" })
}
