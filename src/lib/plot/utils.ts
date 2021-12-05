const MAX_TICK_AMOUNT = 15

// Format tick value to 1 decimals and scientific notation if needed
export const formatTickValue = (value: number) => {
  if (value >= 100 || value < 0.1) {
    const stringValue = value.toString()
    return `${stringValue[0]}.${stringValue[1]}e${getPowerOfTen(value)}`
  }

  if (value < 100 && value >= 10) return value.toFixed(0)
  if (value < 10 && value >= 1) return value.toFixed(1)
  return value.toFixed(2) // if (value < 1 && value >= 0.1)
}

// Get power of ten for scientific notation
export const getPowerOfTen = (value: number) => {
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

// Gets max functional value to set axis values correctly
export const maxFunctionalValue = (data: Point[][]) => {
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
export const minFunctionalValue = (data: Point[][]) => {
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
export const getTickDistance = (range: number, targetTickAmount: number) => {
  const powerOfTen = getPowerOfTen(range)

  if (range / 10 ** powerOfTen < MAX_TICK_AMOUNT / 10) {
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
