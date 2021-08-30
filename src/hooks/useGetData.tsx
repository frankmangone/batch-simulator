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

  /**
   * Gets max functional value to set axis values correctly
   */
  const maxFunctionalValue = (data: Point[][]) => {
    const maxValuesForEachVariable: number[] = []

    data.forEach((points: Point[]) => {
      maxValuesForEachVariable.push(
        Math.max(...points.map((point: Point) => point.y))
      )
    })

    return Math.max(...maxValuesForEachVariable)
  }

  return { variableData, maxFunctionalValue }
}

export default useGetData
