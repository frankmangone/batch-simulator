/**
 *  This is a reduced model to represent reactions
 *  It only has the tokenized kineticEquation, and a list
 *  of the components in the reaction, with the respective
 *  coefficient that multiplies the reaction velocity.
 *
 *  i.e.: A + 2B --> D
 *  If the key compound is A, then the coefficients will be:
 *  A = 1
 *  B = 2
 *  D = -1
 *  */
interface ParsedReaction {
  id?: string
  compounds?: CompoundWithCoefficient[]
  kineticEquation?: Token[]
}

interface CompoundWithCoefficient {
  compoundId: string
  symbol: string
  coefficient: number
}
