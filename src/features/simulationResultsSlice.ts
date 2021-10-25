import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { SimulationResults } from "../types/SimulationResults"

type SimulationResultsState = SimulationResults
const initialState: SimulationResultsState = []

type SaveAction = PayloadAction<SimulationResultsState>

export const simulationResultsSlice = createSlice({
  name: "simulationResults",
  initialState,
  reducers: {
    save: (state, action: SaveAction) => {
      state = action.payload
    },
  },
})

export const { save } = simulationResultsSlice.actions

export default simulationResultsSlice.reducer
