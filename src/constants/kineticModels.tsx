/* Types */
import {
  IKineticConstants,
  IReaction,
  IReactionCompound,
} from "../types/Reaction"

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

export const KINETIC_MODELS = ["Simple", "Reversible", "Hiperbolic"]

export const generateKineticConstants = (
  model: number,
  reaction: IReaction
): IKineticConstants => {
  switch (model) {
    case 0:
      return generateSimpleModelConstants(reaction)
    case 1:
      return generateReversibleModelConstants(reaction)
    case 2:
      return generateHiperbolicModelConstants(reaction)
    default:
      return generateSimpleModelConstants(reaction)
  }
}

const generateSimpleModelConstants = (reaction: IReaction) => {
  // eslint-disable-next-line
  const { reactionConstant, ...other } = reaction.kineticConstants

  const updatedExponents: IKineticConstants = {}
  reaction.reactants.forEach((compound: IReactionCompound) => {
    const oldConstant = reaction.kineticConstants[compound.compoundId]
    if (oldConstant === undefined) {
      updatedExponents[compound.compoundId] = 1
    } else {
      updatedExponents[compound.compoundId] = oldConstant
    }
  })

  return { reactionConstant, ...updatedExponents }
}

const generateReversibleModelConstants = (reaction: IReaction) => {
  // eslint-disable-next-line
  const { reactionConstant, ...other } = reaction.kineticConstants

  const updatedExponents: IKineticConstants = {}

  reaction.reactants.forEach((compound: IReactionCompound) => {
    const oldConstant = reaction.kineticConstants[compound.compoundId]
    if (oldConstant === undefined) {
      updatedExponents[compound.compoundId] = 1
    } else {
      updatedExponents[compound.compoundId] = oldConstant
    }
  })
  reaction.products.forEach((compound: IReactionCompound) => {
    const oldConstant = reaction.kineticConstants[compound.compoundId]
    if (oldConstant === undefined) {
      updatedExponents[compound.compoundId] = 1
    } else {
      updatedExponents[compound.compoundId] = oldConstant
    }
  })

  return { reactionConstant, ...updatedExponents }
}

const generateHiperbolicModelConstants = generateSimpleModelConstants // It's exactly the same
