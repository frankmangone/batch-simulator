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

import { KineticModels } from "@lib/reactionTypes"
import { KineticParameters } from "@lib/enum/kinetic-constants.enum"

export const KINETIC_MODELS = ["Simple", "Hiperbolic", "Autocatalytic"]

export const generateKineticConstants = (
  reaction: Omit<Reaction, "id">,
  compounds: Compound[]
): KineticConstants => {
  const model = reaction.kineticModel
  switch (model) {
    case KineticModels.hyperbolic:
      return generateHiperbolicModelConstants(reaction, compounds)
    case KineticModels.autocatalytic:
      return generateAutocatalyticModelConstants(reaction, compounds)
    default:
      // simple
      return generateSimpleModelConstants(reaction, compounds)
  }
}

const generateSimpleModelConstants = (
  reaction: Omit<Reaction, "id">,
  compounds: Compound[]
) => {
  const updatedExponents: KineticConstants = {
    [KineticParameters.K_INF]:
      reaction.kineticConstants[KineticParameters.K_INF],
    [KineticParameters.E_A]: reaction.kineticConstants[KineticParameters.E_A],
    [KineticParameters.DELTA_H]:
      reaction.kineticConstants[KineticParameters.DELTA_H],
  }

  reaction.reactants.forEach((reactionCompound: ReactionCompound) => {
    const compound = compounds.find(
      (c) => c.id === reactionCompound.compoundId
    ) as Compound
    const paramKey = reactantExponent(compound)
    const oldConstant = reaction.kineticConstants[paramKey]

    if (oldConstant === undefined) {
      updatedExponents[paramKey] = "1"
    } else {
      updatedExponents[paramKey] = oldConstant
    }
  })

  return { ...updatedExponents }
}

const generateHiperbolicModelConstants = (
  reaction: Omit<Reaction, "id">,
  compounds: Compound[]
) => {
  const updatedExponents: KineticConstants = {
    [KineticParameters.K_INF]:
      reaction.kineticConstants[KineticParameters.K_INF],
    [KineticParameters.E_A]: reaction.kineticConstants[KineticParameters.E_A],
    [KineticParameters.DELTA_H]:
      reaction.kineticConstants[KineticParameters.DELTA_H],
  }

  reaction.reactants.forEach((reactionCompound: ReactionCompound) => {
    const compound = compounds.find(
      (c) => c.id === reactionCompound.compoundId
    ) as Compound
    const paramKey = semiSaturationConstant(compound)
    const oldConstant = reaction.kineticConstants[paramKey]

    if (oldConstant === undefined) {
      updatedExponents[paramKey] = "1"
    } else {
      updatedExponents[paramKey] = oldConstant
    }
  })

  return { ...updatedExponents }
}

const generateAutocatalyticModelConstants = (
  reaction: Omit<Reaction, "id">,
  compounds: Compound[]
) => {
  const updatedExponents: KineticConstants = {
    [KineticParameters.K_INF]:
      reaction.kineticConstants[KineticParameters.K_INF],
    [KineticParameters.E_A]: reaction.kineticConstants[KineticParameters.E_A],
    [KineticParameters.DELTA_H]:
      reaction.kineticConstants[KineticParameters.DELTA_H],
  }

  reaction.reactants.forEach((reactionCompound: ReactionCompound) => {
    const compound = compounds.find(
      (c) => c.id === reactionCompound.compoundId
    ) as Compound
    const paramKey = reactantExponent(compound)
    const oldConstant = reaction.kineticConstants[paramKey]

    if (oldConstant === undefined) {
      updatedExponents[paramKey] = "1"
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
      updatedExponents[paramKey] = "1"
    } else {
      updatedExponents[paramKey] = oldConstant
    }
  })

  return { ...updatedExponents }
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
