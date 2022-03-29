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
  kineticModel: KineticModel
  kineticConstants: KineticConstants
  kineticEquation: KineticEquation // A tokenized version of the kinetic model
  keyCompound?: string // It's a compound (reactant) id
}

/**
 * To mark whether if a compound is a reactant or a product,
 * the following enum is used
 *  */
type CompoundType = 0 | 1

interface ReactionCompound {
  compoundId: string
  stoichiometricCoefficient: number
}

interface KineticConstants {
  [key: string]: string
  "k_\\inf": string
  E_A: string
}

type KineticEquation = Token[]
type KineticModel = 0 | 1 | 2

type ReactionInput = Omit<Reaction, "id"> & Required<Pick<Reaction, "name">>
