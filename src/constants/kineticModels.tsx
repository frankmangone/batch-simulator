/* Types */
import {
  IKineticConstants,
  IReaction,
  IReactionCompound,
} from "../types/Reaction"
import { ICompound } from "../types/Compound"

/**
 * This is a placeholder for more complex kinetic models,
 * where constants can be added and used in expressions
 *
 * Kinetic constants are representes by:
 *  - A principal constant, with key @reactionConstant
 *  - A compound-specific constant, with key @compoundId
 *
 * More complex models are not considerer, for simplicity of
 * the MVP1
 */

export const KINETIC_MODELS = ["Simple", "Hiperbolic", "Autocatalytic"]

export const generateKineticConstants = (
  model: number,
  reaction: IReaction,
  compounds: ICompound[]
): IKineticConstants => {
  switch (model) {
    case 1:
      return generateHiperbolicModelConstants(reaction, compounds)
    case 2:
      return generateAutocatalyticModelConstants(reaction, compounds)
    default:
      // 0
      return generateSimpleModelConstants(reaction, compounds)
  }
}

const generateSimpleModelConstants = (
  reaction: IReaction,
  compounds: ICompound[]
) => {
  // eslint-disable-next-line
  const { reactionConstant, ...other } = reaction.kineticConstants

  const updatedExponents: IKineticConstants = {}
  reaction.reactants.forEach((reactionCompound: IReactionCompound) => {
    const compound = compounds.find(
      (c) => c.id === reactionCompound.compoundId
    ) as ICompound
    const paramKey = reactantExponent(compound)
    const oldConstant = reaction.kineticConstants[paramKey]

    if (oldConstant === undefined) {
      updatedExponents[paramKey] = 1
    } else {
      updatedExponents[paramKey] = oldConstant
    }
  })

  return { reactionConstant, ...updatedExponents }
}

const generateHiperbolicModelConstants = (
  reaction: IReaction,
  compounds: ICompound[]
) => {
  // eslint-disable-next-line
  const { reactionConstant, ...other } = reaction.kineticConstants

  const updatedExponents: IKineticConstants = {}
  reaction.reactants.forEach((reactionCompound: IReactionCompound) => {
    const compound = compounds.find(
      (c) => c.id === reactionCompound.compoundId
    ) as ICompound
    const paramKey = semiSaturationConstant(compound)
    const oldConstant = reaction.kineticConstants[paramKey]

    if (oldConstant === undefined) {
      updatedExponents[paramKey] = 1
    } else {
      updatedExponents[paramKey] = oldConstant
    }
  })

  return { reactionConstant, ...updatedExponents }
}

const generateAutocatalyticModelConstants = (
  reaction: IReaction,
  compounds: ICompound[]
) => {
  // eslint-disable-next-line
  const { reactionConstant, ...other } = reaction.kineticConstants

  const updatedExponents: IKineticConstants = {}

  reaction.reactants.forEach((reactionCompound: IReactionCompound) => {
    const compound = compounds.find(
      (c) => c.id === reactionCompound.compoundId
    ) as ICompound
    const paramKey = reactantExponent(compound)
    const oldConstant = reaction.kineticConstants[paramKey]

    if (oldConstant === undefined) {
      updatedExponents[paramKey] = 1
    } else {
      updatedExponents[paramKey] = oldConstant
    }
  })
  reaction.products.forEach((reactionCompound: IReactionCompound) => {
    const compound = compounds.find(
      (c) => c.id === reactionCompound.compoundId
    ) as ICompound
    const paramKey = productExponent(compound)
    const oldConstant = reaction.kineticConstants[paramKey]

    if (oldConstant === undefined) {
      updatedExponents[paramKey] = 1
    } else {
      updatedExponents[paramKey] = oldConstant
    }
  })

  return { reactionConstant, ...updatedExponents }
}

// Some placeholder parameters

export const reactantExponent = (compound: ICompound) => {
  return `\\alpha_${compound.symbol}`
}

export const productExponent = (compound: ICompound) => {
  return `\\beta_${compound.symbol}`
}

export const semiSaturationConstant = (compound: ICompound) => {
  return `K_${compound.symbol}`
}
