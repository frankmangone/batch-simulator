interface Compound {
  id: string
  symbol: string
  color: string
  concentration: number
  name?: string
  molecularWeight?: number
}

type CompoundInput = Omin<Omit<Compound, "id">, "color">
