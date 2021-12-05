import {
  getTickDistance,
  minFunctionalValue,
  maxFunctionalValue,
} from "./utils"
import { AVERAGE_TICK_DISTANCE, DISTANCE_FROM_CORNER, Ticks } from "./drawPlot"

interface GetTicksYAxisParams {
  height: number
  data: Point[][]
}

// Gets total ticks and tick distance for y axis
const getTicksYAxis = (params: GetTicksYAxisParams): Ticks => {
  const { data, height } = params

  const targetTicks =
    Math.floor((height - DISTANCE_FROM_CORNER) / AVERAGE_TICK_DISTANCE) || 10

  const maxValue = maxFunctionalValue(data)
  const minValue = minFunctionalValue(data)
  const range = maxValue - minValue

  const tickDistance = getTickDistance(range, targetTicks)
  const totalTicks = Math.ceil(range / tickDistance)
  const initialValue = Math.floor(minValue / tickDistance) * tickDistance

  return { tickDistance, totalTicks, initialValue }
}

export default getTicksYAxis
