interface Compound {
  id: string
  symbol: string
  color: string
  concentration: number
  name?: string
  molecularWeight?: number
}

type CompoundInput = Omit<Compound, "id">
type ReducedCompoundInput = Omit<CompoundInput, "color" | "symbol">
