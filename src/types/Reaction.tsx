export interface IReaction {
  id: string

  /**
   * Both reactants and products are arrays of compound ids
   */
  reactants: string[]
  products: string[]

  /**
   * Kinetic model may have a function later, but for now,
   * it can only be selected from one of a handful
   *
   * Kinetic constants are saved as a mapping, where the keys
   * are not known in advance
   */
  kineticModel: number
  kineticConstants: { [key: string]: number }
}
