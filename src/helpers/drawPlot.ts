const DISTANCE_FROM_CORNER = 25

/**
 * Main function to be exported an used in /components/Plot.tsx
 * @param canvas
 */

export const drawPlot = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d")
  if (!context) return

  context.strokeStyle = "hsl(213, 20%, 30%)"
  drawVerticalAxis(context)
  drawHorizontalAxis(context)
}

/**
 * Auxiliary functions
 */
const drawVerticalAxis = (context: any) => {
  const height = context.canvas.height
  context.beginPath()
  context.moveTo(DISTANCE_FROM_CORNER, DISTANCE_FROM_CORNER)
  context.lineTo(DISTANCE_FROM_CORNER, height - DISTANCE_FROM_CORNER)
  context.stroke()
}

const drawHorizontalAxis = (context: any) => {
  const height = context.canvas.height
  const width = context.canvas.width
  context.beginPath()
  context.moveTo(DISTANCE_FROM_CORNER, height - DISTANCE_FROM_CORNER)
  context.lineTo(width - DISTANCE_FROM_CORNER, height - DISTANCE_FROM_CORNER)
  context.stroke()
}
