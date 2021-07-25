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
) => {
  const isNewModel = checkNewModel(reaction, model)
  switch (model) {
    case 0:
      return generateSimpleModelConstants(reaction, isNewModel)
    case 1:
      return generateReversibleModelConstants(reaction, isNewModel)
    case 2:
      return generateHiperbolicModelConstants(reaction, isNewModel)
  }
}

const generateSimpleModelConstants = (
  reaction: IReaction,
  newModel: boolean
) => {
  if (newModel) {
    const kineticConstants: IKineticConstants = { reactionConstant: 1 }
    reaction.reactants.forEach((compound: IReactionCompound) => {
      kineticConstants[compound.compoundId] = 1
    })
    return kineticConstants
  } else {
    // eslint-disable-next-line
    const { reactionConstant, ...other } = reaction.kineticConstants

    const updatedExponents: IKineticConstants = {}
    reaction.reactants.forEach((compound: IReactionCompound) => {
      const oldConstant = reaction.kineticConstants[compound.compoundId]
      if (oldConstant === undefined) {
        updatedExponents[compound.compoundId] = oldConstant
      }
    })

    return { reactionConstant, ...updatedExponents }
  }
}

const generateReversibleModelConstants = (
  reaction: IReaction,
  newModel: boolean
) => {
  if (newModel) {
    const kineticConstants: IKineticConstants = { reactionConstant: 1 }
    reaction.reactants.forEach((compound: IReactionCompound) => {
      kineticConstants[compound.compoundId] = 1
    })
    reaction.products.forEach((compound: IReactionCompound) => {
      kineticConstants[compound.compoundId] = 1
    })
    return kineticConstants
  } else {
    // eslint-disable-next-line
    const { reactionConstant, ...other } = reaction.kineticConstants

    const updatedExponents: IKineticConstants = {}
    reaction.reactants.forEach((compound: IReactionCompound) => {
      const oldConstant = reaction.kineticConstants[compound.compoundId]
      if (oldConstant === undefined) {
        updatedExponents[compound.compoundId] = oldConstant
      }
    })
    reaction.products.forEach((compound: IReactionCompound) => {
      const oldConstant = reaction.kineticConstants[compound.compoundId]
      if (oldConstant === undefined) {
        updatedExponents[compound.compoundId] = oldConstant
      }
    })

    return { reactionConstant, ...updatedExponents }
  }
}

const generateHiperbolicModelConstants = (
  reaction: IReaction,
  newModel: boolean
) => {
  if (newModel) {
    const kineticConstants: IKineticConstants = { reactionConstant: 1 }
    reaction.reactants.forEach((compound: IReactionCompound) => {
      kineticConstants[compound.compoundId] = 1
    })
    return kineticConstants
  } else {
    // eslint-disable-next-line
    const { reactionConstant, ...other } = reaction.kineticConstants

    const updatedExponents: IKineticConstants = {}
    reaction.reactants.forEach((compound: IReactionCompound) => {
      const oldConstant = reaction.kineticConstants[compound.compoundId]
      if (oldConstant === undefined) {
        updatedExponents[compound.compoundId] = oldConstant
      }
    })

    return { reactionConstant, ...updatedExponents }
  }
}

/**
 *
 *
 */

const checkNewModel = (reaction: IReaction, model: number): boolean => {
  return reaction.kineticModel !== model
}
