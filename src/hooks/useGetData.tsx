import { useData } from "../context/DataContext"

/* Types */
import { TimePoint } from "../types/SimulationResults"

export interface Point {
  x: number
  y: number
}

const useGetData = () => {
  const { simulationResults } = useData()

  /**
   * Maps requested variable data to Victory-readable data
   */
  const variableData = (variable: string): Point[] => {
    return simulationResults?.map((data: TimePoint) => {
      return {
        x: data.t,
        y: data[variable],
      }
    }) as Point[]
  }

  return { variableData }
}

export default useGetData
