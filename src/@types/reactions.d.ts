interface Reaction {
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

/**
 * To mark whether if a compound is a reactant or a product,
 * the following enum is used
 *  */
declare enum CompoundType {
  Reactant = 0,
  Product,
}

interface ReactionCompound {
  compoundId: string
  stoichiometricCoefficient: number
}

interface KineticConstants {
  [key: string]: number
  "k_\\inf": number
  E_A: number
}

type KineticEquation = Token[]

declare enum KineticModel {
  simple = 0,
  hyperbolic,
  autocatalytic,
}
