/* Types */
import {
  KineticConstants,
  Reaction,
  ReactionCompound,
} from "../types/Reaction"
import { Compound } from "../types/Compound"

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
  reaction: Reaction,
  compounds: Compound[]
): KineticConstants => {
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
  reaction: Reaction,
  compounds: Compound[]
) => {
  const updatedExponents: KineticConstants = {}
  reaction.reactants.forEach((reactionCompound: ReactionCompound) => {
    const compound = compounds.find(
      (c) => c.id === reactionCompound.compoundId
    ) as Compound
    const paramKey = reactantExponent(compound)
    const oldConstant = reaction.kineticConstants[paramKey]

    if (oldConstant === undefined) {
      updatedExponents[paramKey] = 1
    } else {
      updatedExponents[paramKey] = oldConstant
    }
  })

  return { k: 1, ...updatedExponents }
}

const generateHiperbolicModelConstants = (
  reaction: Reaction,
  compounds: Compound[]
) => {
  const updatedExponents: KineticConstants = {}
  reaction.reactants.forEach((reactionCompound: ReactionCompound) => {
    const compound = compounds.find(
      (c) => c.id === reactionCompound.compoundId
    ) as Compound
    const paramKey = semiSaturationConstant(compound)
    const oldConstant = reaction.kineticConstants[paramKey]

    if (oldConstant === undefined) {
      updatedExponents[paramKey] = 1
    } else {
      updatedExponents[paramKey] = oldConstant
    }
  })

  return { "\\mu": 1, ...updatedExponents }
}

const generateAutocatalyticModelConstants = (
  reaction: Reaction,
  compounds: Compound[]
) => {
  const updatedExponents: KineticConstants = {}

  reaction.reactants.forEach((reactionCompound: ReactionCompound) => {
    const compound = compounds.find(
      (c) => c.id === reactionCompound.compoundId
    ) as Compound
    const paramKey = reactantExponent(compound)
    const oldConstant = reaction.kineticConstants[paramKey]

    if (oldConstant === undefined) {
      updatedExponents[paramKey] = 1
    } else {
      updatedExponents[paramKey] = oldConstant
    }
  })
  reaction.products.forEach((reactionCompound: ReactionCompound) => {
    const compound = compounds.find(
      (c) => c.id === reactionCompound.compoundId
    ) as Compound
    const paramKey = productExponent(compound)
    const oldConstant = reaction.kineticConstants[paramKey]

    if (oldConstant === undefined) {
      updatedExponents[paramKey] = 1
    } else {
      updatedExponents[paramKey] = oldConstant
    }
  })

  return { k: 1, ...updatedExponents }
}

// Some placeholder parameters

export const reactantExponent = (compound: Compound) => {
  return `\\alpha_${compound.symbol}`
}

export const productExponent = (compound: Compound) => {
  return `\\beta_${compound.symbol}`
}

export const semiSaturationConstant = (compound: Compound) => {
  return `K_${compound.symbol}`
}
