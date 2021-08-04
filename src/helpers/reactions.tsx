import { IReaction, IReactionCompound } from '../types/Reaction'

export const reactionHasCompound = (reaction: IReaction, compoundId: string) => {
  if (reaction.reactants.findIndex((c) => c.compoundId === compoundId)) return true
  if (reaction.products.findIndex((c) => c.compoundId === compoundId)) return true
  return false
}

export const getCoefficientForComponent = (reaction: IReaction, compoundId: string) => {
  const baseStoichiometricCoefficient = getStoichiomericCoefficientForKeyCompound(reaction)
  let coefficient: number = 0

  reaction.reactants.forEach((c) => {
    if (c.compoundId === compoundId) {
      coefficient = baseStoichiometricCoefficient / c.stoichiometricCoefficient
    }
  })
  if (coefficient !== 0) return coefficient

  reaction.products.forEach((c) => {
    if (c.compoundId === compoundId) {
      coefficient = -(baseStoichiometricCoefficient / c.stoichiometricCoefficient)
    }
  })
  return coefficient
}

const getStoichiomericCoefficientForKeyCompound = (reaction: IReaction) => {
  const keyCompound = reaction.reactants.find((c) => c.compoundId === reaction.keyCompound as string) as IReactionCompound
  return keyCompound.stoichiometricCoefficient
}
