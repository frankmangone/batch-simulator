import { Token } from "../helpers/tokenization"

export interface Reaction {
  id: string

  reactants: IReactionCompound[]
  products: IReactionCompound[]

  /**
   * Kinetic model may have a function later, but for now,
   * it can only be selected from one of a handful
   *
   * Kinetic constants are saved as a mapping, where the keys
   * are not known in advance
   */
  kineticModel: number
  kineticConstants: IKineticConstants
  kineticEquation: Token[] // A tokenized version of the kinetic model
  keyCompound?: string // It's a compound (reactant) id
}

export interface IReactionCompound {
  compoundId: string
  stoichiometricCoefficient: number
}

export interface IKineticConstants {
  [key: string]: number
}
