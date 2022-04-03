import useSimulationResults from "@hooks/useSimulationResults"

const useGetData = () => {
  const { simulationResults } = useSimulationResults()

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
