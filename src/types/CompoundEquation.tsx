import { Token } from '../helpers/tokenization'

interface IReactionEquation {
  equationTokens: Token[]
  coefficient: number
}

export type ICompoundEquation = IReactionEquation[]