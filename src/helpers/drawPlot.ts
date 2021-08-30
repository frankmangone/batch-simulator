import type { Point } from "../hooks/useGetData"

const DISTANCE_FROM_CORNER = 25

/**
 * Main function to be exported an used in /components/Plot.tsx
 * @param canvas
 */

export const drawPlot = (canvas: HTMLCanvasElement, data: Point[]) => {
  console.log(data)
  const context = canvas.getContext("2d")
  if (!context) return

  context.strokeStyle = "hsl(213, 20%, 30%)"
  drawVerticalAxis(context, data)
  drawHorizontalAxis(context, data)
}

/**
 * Auxiliary draw functions
 */
const drawVerticalAxis = (context: any, data: Point[]) => {
  const height = context.canvas.height
  context.beginPath()
  context.moveTo(DISTANCE_FROM_CORNER, DISTANCE_FROM_CORNER)
  context.lineTo(DISTANCE_FROM_CORNER, height - DISTANCE_FROM_CORNER)
  context.stroke()

  // Ticks
  const max = maxFunctionalValue([data]) || 10
  console.log(max)
}

const drawHorizontalAxis = (context: any, data: Point[]) => {
  const height = context.canvas.height
  const width = context.canvas.width
  context.beginPath()
  context.moveTo(DISTANCE_FROM_CORNER, height - DISTANCE_FROM_CORNER)
  context.lineTo(width - DISTANCE_FROM_CORNER, height - DISTANCE_FROM_CORNER)
  context.stroke()
}

/**
 * Other auxiliary functions
 */

// Gets max functional value to set axis values correctly
const maxFunctionalValue = (data: Point[][]) => {
  const maxValuesForEachVariable: number[] = []

  data.forEach((points: Point[]) => {
    maxValuesForEachVariable.push(
      Math.max(...points.map((point: Point) => point.y))
    )
  })

  return Math.max(...maxValuesForEachVariable)
}
