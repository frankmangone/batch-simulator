export type SimulationResults = TimePoint[]

export interface TimePoint {
  [key: string]: number
  t: number
}
