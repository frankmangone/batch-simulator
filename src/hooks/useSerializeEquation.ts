import {
  divisionToken,
  exponentiationToken,
  multiplicationToken,
  subtractionToken,
  parameterToken,
  variableToken,
  leftParenthesisToken,
  rightParenthesisToken,
  additionToken,
} from "@lib/tokens/tokenTypes"
import { KineticModels } from "@lib/reactionTypes"
import useCompounds from "@hooks/entities/useCompounds"

const useSerializeEquation = () => {
  const { findCompound } = useCompounds()

  const serializeKineticEquation = (
    reaction: Omit<Reaction, "id">
  ): Token[] => {
    const equationTokens: Token[] = []
    /**
     * TODO: this is just a placeholder for a future serialization system, maybe
     * TODO: with direct user input!
     *
     * Returns tokenized equation with standard notation
     */
    switch (reaction.kineticModel) {
      case KineticModels.hyperbolic:
        equationTokens.push(parameterToken(`<k_\\inf>`))
        addArrheniusExponential(equationTokens)

        reaction.reactants.forEach((reactionCompound) => {
          const { symbol } = findCompound(
            reactionCompound.compoundId
          ) as Compound
          addHyperbolicTerm(equationTokens, symbol)
        })
        return equationTokens

      //

      case KineticModels.autocatalytic:
        equationTokens.push(parameterToken(`<k_\\inf>`))
        addArrheniusExponential(equationTokens)

        reaction.reactants.forEach((reactionCompound) => {
          const { symbol } = findCompound(
            reactionCompound.compoundId
          ) as Compound
          addReactantWithExponent(equationTokens, symbol)
        })
        reaction.products.forEach((reactionCompound) => {
          const { symbol } = findCompound(
            reactionCompound.compoundId
          ) as Compound
          addProductWithExponent(equationTokens, symbol)
        })
        return equationTokens

      //

      default:
        equationTokens.push(parameterToken(`<k_\\inf>`))
        addArrheniusExponential(equationTokens)

        reaction.reactants.forEach((reactionCompound: ReactionCompound) => {
          const { symbol } = findCompound(
            reactionCompound.compoundId
          ) as Compound
          addReactantWithExponent(equationTokens, symbol)
        })
        return equationTokens
    }
  }

  return serializeKineticEquation
}

export default useSerializeEquation

// Helpers

const addArrheniusExponential = (equationTokens: Token[]): void => {
  equationTokens.push(multiplicationToken)
  equationTokens.push(parameterToken("e"))
  equationTokens.push(exponentiationToken)
  equationTokens.push(leftParenthesisToken)
  equationTokens.push(leftParenthesisToken)
  equationTokens.push(subtractionToken)
  equationTokens.push(parameterToken("<E_A>"))
  equationTokens.push(rightParenthesisToken)
  equationTokens.push(divisionToken)
  equationTokens.push(leftParenthesisToken)
  equationTokens.push(parameterToken("<R>"))
  equationTokens.push(multiplicationToken)
  equationTokens.push(variableToken("{T}"))
  equationTokens.push(rightParenthesisToken)
  equationTokens.push(rightParenthesisToken)
}

const addReactantWithExponent = (
  equationTokens: Token[],
  symbol: string
): void => {
  equationTokens.push(multiplicationToken)
  equationTokens.push(variableToken(`{[${symbol}]}`))
  equationTokens.push(exponentiationToken)
  equationTokens.push(parameterToken(`<\\alpha_${symbol}>`))
}

const addProductWithExponent = (
  equationTokens: Token[],
  symbol: string
): void => {
  equationTokens.push(multiplicationToken)
  equationTokens.push(variableToken(`{[${symbol}]}`))
  equationTokens.push(exponentiationToken)
  equationTokens.push(parameterToken(`<\\beta_${symbol}>`))
}

const addHyperbolicTerm = (equationTokens: Token[], symbol: string): void => {
  equationTokens.push(multiplicationToken)
  equationTokens.push(variableToken(`{[${symbol}]}`))
  equationTokens.push(divisionToken)
  equationTokens.push(leftParenthesisToken)
  equationTokens.push(parameterToken(`<K_${symbol}>`))
  equationTokens.push(additionToken)
  equationTokens.push(variableToken(`{[${symbol}]}`))
  equationTokens.push(rightParenthesisToken)
}
