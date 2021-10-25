import { useAppDispatch, useAppSelector } from "./useStore"
import { save } from "../features/simulationResultsSlice"

/* Types */
import type { SimulationResults } from "../types/SimulationResults"

const useSimulationResults = () => {
  const dispatch = useAppDispatch()
  const simulationResults = useAppSelector((state) => state.simulationResults)

  return {
    simulationResults,

    saveSimulationResults: (newSimulationResults: SimulationResults): void => {
      dispatch(save(newSimulationResults))
    },
  }
}

export default useSimulationResults
