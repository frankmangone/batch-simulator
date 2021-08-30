import type { Point } from "../hooks/useGetData"

const DISTANCE_FROM_CORNER = 30
const AVERAGE_TICK_DISTANCE = 50

/**
 * Main function to be exported an used in /components/Plot.tsx
 * @param canvas
 */

export const drawPlot = (canvas: HTMLCanvasElement, data: Point[]) => {
  const context = canvas.getContext("2d")
  if (!context) return

  drawVerticalAxis(context, data)
  drawHorizontalAxis(context, data)
}

/**
 * Auxiliary draw functions
 */
const drawVerticalAxis = (context: CanvasRenderingContext2D, data: Point[]) => {
  const width = context.canvas.width
  const height = context.canvas.height
  const effectiveHeight = height - DISTANCE_FROM_CORNER * 2
  context.strokeStyle = "hsl(213, 20%, 30%)"
  context.beginPath()
  context.moveTo(DISTANCE_FROM_CORNER, DISTANCE_FROM_CORNER)
  context.lineTo(DISTANCE_FROM_CORNER, height - DISTANCE_FROM_CORNER)
  context.stroke()

  // Ticks
  // One tick *approximately* every AVERAGE_TICK_DISTANCE
  const targetTicks = Math.floor(
    (height - DISTANCE_FROM_CORNER) / AVERAGE_TICK_DISTANCE
  )
  const maxValue = maxFunctionalValue([data]) || 10
  const tickDistance = getTickDistance(maxValue, targetTicks)
  const totalTicks = Math.ceil(maxValue / tickDistance)

  // Once we get the total ticks, it's time to draw them.
  // We use the entire canvas height for the ticks, so that the
  // plot always fits in the designated area.
  for (let i = 1; i <= totalTicks; i++) {
    const yPosition =
      height - DISTANCE_FROM_CORNER - (effectiveHeight * i) / totalTicks

    context.beginPath()
    context.strokeStyle = "hsl(213, 20%, 20%)"
    context.moveTo(10, yPosition)
    context.lineTo(DISTANCE_FROM_CORNER, yPosition)
    context.stroke()

    context.beginPath()
    context.strokeStyle = "hsl(213, 20%, 75%)"
    context.moveTo(DISTANCE_FROM_CORNER, yPosition)
    context.lineTo(width - DISTANCE_FROM_CORNER, yPosition)
    context.stroke()

    context.font = "20px Mulish"
    context.fillStyle = "hsl(213, 20%, 75%)"
    context.textAlign = "right"
    context.fillText(
      formatTickValue(i * tickDistance),
      width - DISTANCE_FROM_CORNER,
      yPosition + 20
    )
  }
}

const drawHorizontalAxis = (
  context: CanvasRenderingContext2D,
  data: Point[]
) => {
  const height = context.canvas.height
  const width = context.canvas.width

  context.strokeStyle = "hsl(213, 20%, 30%)"
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

// Gets tick distance given a max value and a target tick amount
const getTickDistance = (maxValue: number, targetTickAmount: number) => {
  const rawDistance = maxValue / (targetTickAmount + 1)

  if (rawDistance > 1) {
    let multiplier = 1
    while (rawDistance / (multiplier * 10) > 1) {
      multiplier = multiplier * 10
    }
    return Math.floor(rawDistance / multiplier) * multiplier
  }

  let multiplier = 0.1
  while (rawDistance / (multiplier * 0.1) < 1) {
    multiplier = multiplier * 0.1
  }
  return Math.floor(rawDistance / multiplier) * multiplier
}

// Format tick value to 1 decimals and scientific notation if needed
const formatTickValue = (value: number) => {
  if (value >= 100 || value < 0.1) {
    const stringValue = value.toString()
    return `${stringValue[0]}.${stringValue[1]}e${getPowerOfTen(value)}`
  }

  if (value < 100 && value >= 10) return value.toFixed(0)
  if (value < 10 && value >= 1) return value.toFixed(1)
  return value.toFixed(2) // if (value < 1 && value >= 0.1)
}

// Get power of ten for scientific notation
const getPowerOfTen = (value: number) => {
  let power = 0

  if (value > 0) {
    while (value / 10 ** power >= 10) {
      power++
    }
    return power
  }

  while (value * 10 ** power <= 1) {
    power++
  }
  return -power
}
