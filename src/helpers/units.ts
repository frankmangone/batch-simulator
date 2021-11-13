export const temperatureUnits = ["K", "R", "°C", "°F"]
export const timeUnits = ["ms", "s", "min", "h"]
export const massUnits = ["mg", "g", "kg", "lb"]
export const molarUnits = ["mol", "kmol", "lbmol"]
export const volumeUnits = ["L", "m^3", "cm^3"]

/**
 * Value getters
 * @param index
 * @returns Units value as string
 */
export const timeUnitsValue = (index: number) => {
  return timeUnits[index]
}

export const volumeUnitsValue = (index: number) => {
  return volumeUnits[index]
}

export const massUnitsValue = (index: number) => {
  return massUnits[index]
}

export const molarUnitsValue = (index: number) => {
  return molarUnits[index]
}

export const temperatureUnitsValue = (index: number) => {
  return temperatureUnits[index]
}

/**
 * Options mapping for selects
 */
const mapUnitOptions = (arr: string[]) => {
  return arr.map((unit, index) => ({
    value: index,
    displayText: unit,
    collapsedDisplayText: unit,
  }))
}

export const timeUnitsOptions = mapUnitOptions(timeUnits)
export const massUnitsOptions = mapUnitOptions(massUnits)
export const molarUnitsOptions = mapUnitOptions(molarUnits)
export const volumeUnitsOptions = mapUnitOptions(volumeUnits)
export const temperatureUnitsOptions = mapUnitOptions(temperatureUnits)
