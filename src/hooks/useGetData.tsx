import { useData } from "../context/DataContext"

/* Types */
import { SimulationResults, TimePoint } from "../types/SimulationResults"

const useGetData = () => {
  const { simulationResults } = useData()

  /**
   * Maps requested variable data to Victory-readable data
   * TODO: Do for multiple variables at a time
   */
  const variableData = (variable: string): SimulationResults | undefined => {
    return simulationResults?.map((data: TimePoint) => {
      return {
        t: data.t,
        [variable]: data[variable],
      }
    })
  }

  return { variableData }
}

export default useGetData
