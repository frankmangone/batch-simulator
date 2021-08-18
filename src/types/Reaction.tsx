import { Token } from "../helpers/tokenization"

export interface Reaction {
  id: string

  name?: string

  reactants: ReactionCompound[]
  products: ReactionCompound[]

  /**
   * Kinetic model may have a function later, but for now,
   * it can only be selected from one of a handful
   *
   * Kinetic constants are saved as a mapping, where the keys
   * are not known in advance
   */
  kineticModel: number
  kineticConstants: KineticConstants
  kineticEquation: KineticEquation // A tokenized version of the kinetic model
  keyCompound?: string // It's a compound (reactant) id
}

export interface ReactionCompound {
  compoundId: string
  stoichiometricCoefficient: number
}

export interface KineticConstants {
  [key: string]: number
}

export type KineticEquation = Token[]
