interface Compound {
  id: string
  symbol: string
  color: string
  concentration: number
  name?: string
  molecularWeight?: number
}

type CompoundInput = Omit<Omit<Compound, "id">, "color">
