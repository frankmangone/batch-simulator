import { DISTANCE_FROM_CORNER, Ticks } from "./drawPlot"

interface DrawPlotCurveParams {
  context: CanvasRenderingContext2D
  data: Point[][]
  colors: string[]
  yAxisTicks: Ticks
}

const drawPlotCurve = (params: DrawPlotCurveParams) => {
  const { colors, context, data, yAxisTicks } = params
  const { initialValue, tickDistance, totalTicks } = yAxisTicks

  const maxTimeValue = data.length !== 0 ? data[0][data[0].length - 1]?.x : 10

  const minYAxisValue = Math.floor(initialValue / tickDistance) * tickDistance
  const maxYAxisValue = minYAxisValue + tickDistance * totalTicks
  const range = maxYAxisValue - minYAxisValue

  const plotAreaWidth = context.canvas.width - DISTANCE_FROM_CORNER * 3
  const plotAreaHeight = context.canvas.height - DISTANCE_FROM_CORNER * 2

  for (let j = 0; j < data.length; j++) {
    context.beginPath()
    const plotPath = new Path2D()
    const points = data[j]
    const color = colors[j]
    for (let i = 1; i < points.length; i++) {
      plotPath.moveTo(
        DISTANCE_FROM_CORNER * 2 +
          (plotAreaWidth * points[i - 1].x) / maxTimeValue,
        DISTANCE_FROM_CORNER +
          (plotAreaHeight * (maxYAxisValue - points[i - 1].y)) / range
      )
      plotPath.lineTo(
        DISTANCE_FROM_CORNER * 2 + (plotAreaWidth * points[i].x) / maxTimeValue,
        DISTANCE_FROM_CORNER +
          (plotAreaHeight * (maxYAxisValue - points[i].y)) / range
      )
    }
    context.lineWidth = 2
    context.strokeStyle = color
    context.stroke(plotPath)
  }
}

export default drawPlotCurve
