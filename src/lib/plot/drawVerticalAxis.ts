import { DISTANCE_FROM_CORNER, Ticks } from "./drawPlot"
import { formatTickValue } from "./utils"

interface DrawAxisParams {
  context: CanvasRenderingContext2D
  ticks: Ticks
}

const drawVerticalAxis = ({ context, ticks }: DrawAxisParams) => {
  const width = context.canvas.width
  const height = context.canvas.height
  const effectiveHeight = height - DISTANCE_FROM_CORNER * 2

  const { totalTicks, tickDistance, initialValue } = ticks

  // Once we get the total ticks, it's time to draw them.
  // We use the entire canvas height for the ticks, so that the
  // plot always fits in the designated area.
  for (let i = 1; i <= totalTicks; i++) {
    const yPosition =
      height - DISTANCE_FROM_CORNER - (effectiveHeight * i) / totalTicks

    // Ticks
    context.beginPath()
    context.strokeStyle = "hsl(213, 20%, 20%)"
    context.moveTo(10 + DISTANCE_FROM_CORNER, yPosition)
    context.lineTo(DISTANCE_FROM_CORNER * 2, yPosition)
    context.stroke()

    // Plot lines in the back
    context.beginPath()
    context.strokeStyle = "hsl(213, 20%, 70%)"
    context.moveTo(DISTANCE_FROM_CORNER * 2, yPosition)
    context.lineTo(width - DISTANCE_FROM_CORNER, yPosition)
    context.stroke()

    // Text
    context.font = "16px Mulish"
    context.fillStyle = "hsl(213, 20%, 20%)"
    context.textAlign = "right"
    context.fillText(
      formatTickValue(i * tickDistance + initialValue),
      DISTANCE_FROM_CORNER * 2 - 5,
      yPosition + 18
    )
  }

  // Draw actual axis line
  context.strokeStyle = "hsl(213, 20%, 20%)"
  context.beginPath()
  context.moveTo(DISTANCE_FROM_CORNER * 2, DISTANCE_FROM_CORNER)
  context.lineTo(DISTANCE_FROM_CORNER * 2, height - DISTANCE_FROM_CORNER)
  context.stroke()
}

export default drawVerticalAxis
