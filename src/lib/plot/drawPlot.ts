interface Ticks {
  tickDistance: number
  totalTicks: number
  initialValue: number
}

const DISTANCE_FROM_CORNER = 30
const AVERAGE_TICK_DISTANCE = 50

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

/**
 * Auxiliary draw functions
 */
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

const drawHorizontalAxis = ({ context, ticks }: DrawAxisParams) => {
  const height = context.canvas.height
  const width = context.canvas.width

  context.strokeStyle = "hsl(213, 20%, 30%)"
  context.beginPath()
  context.moveTo(DISTANCE_FROM_CORNER * 2, height - DISTANCE_FROM_CORNER)
  context.lineTo(width - DISTANCE_FROM_CORNER, height - DISTANCE_FROM_CORNER)
  context.stroke()
}

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

/**
 * Other auxiliary functions
 */

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

// Gets max functional value to set axis values correctly
const maxFunctionalValue = (data: Point[][]) => {
  const maxValuesForEachVariable: number[] = []

  if (!data || data.length === 0) return 10

  data.forEach((points: Point[]) => {
    maxValuesForEachVariable.push(
      Math.max(...points.map((point: Point) => point.y))
    )
  })

  return Math.max(...maxValuesForEachVariable)
}

// Gets min functional value to set axis values correctly
const minFunctionalValue = (data: Point[][]) => {
  const minValuesForEachVariable: number[] = []

  if (!data || data.length === 0) return 0

  data.forEach((points: Point[]) => {
    minValuesForEachVariable.push(
      Math.min(...points.map((point: Point) => point.y))
    )
  })

  return Math.min(...minValuesForEachVariable)
}

// Gets tick distance given a max value and a target tick amount
const getTickDistance = (range: number, targetTickAmount: number) => {
  const powerOfTen = getPowerOfTen(range)

  if (range / 10 ** powerOfTen < 3) {
    return 10 ** (powerOfTen - 1)
  }
  return 10 ** powerOfTen

  // if (Math.ceil(maxValue / baseTickDistance) < targetTickAmount) {

  // }

  // while ()
  // const rawDistance = maxValue / (targetTickAmount + 1)

  // let multiplier = 1
  // if (rawDistance > 1) {
  //   while (rawDistance / (multiplier * 10) > 1) {
  //     multiplier = multiplier * 10
  //   }
  // } else {
  //   multiplier = 0.1
  //   while (rawDistance / (multiplier * 0.1) < 1) {
  //     multiplier = multiplier * 0.1
  //   }
  // }

  // return Math.floor(rawDistance / multiplier) * multiplier
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

  if (value > 1) {
    while (value / 10 ** power >= 10) {
      power++
    }
    return power
  }

  while (value * 10 ** power <= 0.1) {
    power++
  }
  if (power === 0) return power
  return power * -1
}
