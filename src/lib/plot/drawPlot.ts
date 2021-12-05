import drawVerticalAxis from "./drawVerticalAxis"
import drawHorizontalAxis from "./drawHorizontalAxis"
import drawPlotCurve from "./drawPlotCurve"
import getTicksYAxis from "./getTicksYAxis"

export interface Ticks {
  tickDistance: number
  totalTicks: number
  initialValue: number
}

export const DISTANCE_FROM_CORNER = 30
export const AVERAGE_TICK_DISTANCE = 50

/**
 * Main function to be exported an used in /components/Plot.tsx
 * @param canvas
 */

interface DrawPlotParams {
  canvas: HTMLCanvasElement
  data: Point[][]
  colors: string[]
}

export const drawPlot = ({ canvas, data, colors }: DrawPlotParams) => {
  const context = canvas.getContext("2d")
  if (!context) return

  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  context.lineWidth = 1

  const yAxisTicks = getTicksYAxis({ height: context.canvas.height, data })

  drawVerticalAxis({ context, ticks: yAxisTicks })
  drawHorizontalAxis({ context, ticks: yAxisTicks }) // TODO: Change for x axis ticks
  drawPlotCurve({
    context,
    data,
    colors,
    yAxisTicks,
  })
}
