type SimulationResults = TimePoint[]

interface TimePoint {
  [key: string]: number
  t: number
}

interface Point {
  x: number
  y: number
}
