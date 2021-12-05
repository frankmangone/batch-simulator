import { DISTANCE_FROM_CORNER, Ticks } from "./drawPlot"

interface DrawAxisParams {
  context: CanvasRenderingContext2D
  ticks: Ticks
}

const drawHorizontalAxis = ({ context, ticks }: DrawAxisParams) => {
  const height = context.canvas.height
  const width = context.canvas.width

  context.strokeStyle = "hsl(213, 20%, 30%)"
  context.beginPath()
  context.moveTo(DISTANCE_FROM_CORNER * 2, height - DISTANCE_FROM_CORNER)
  context.lineTo(width - DISTANCE_FROM_CORNER, height - DISTANCE_FROM_CORNER)
  context.stroke()
}

export default drawHorizontalAxis
