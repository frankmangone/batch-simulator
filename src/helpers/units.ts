export const temperatureUnits = ["K", "R", "°C", "°F"]
export const timeUnits = ["ms", "s", "min", "h"]
export const massUnits = ["mg", "g", "kg", "lb"]
export const molarUnits = ["mol", "kmol", "lbmol"]
export const volumeUnits = ["L", "m^3", "cm^3"]

export const timeUnitsValue = (index: number) => {
  return timeUnits[index]
}

export const volumeUnitsValue = (index: number) => {
  return volumeUnits[index]
}

export const timeUnitsOptions = timeUnits.map((unit, index) => ({
  value: index,
  displayText: unit,
  collapsedDisplayText: unit,
}))

export const volumeUnitsOptions = volumeUnits.map((unit, index) => ({
  value: index,
  displayText: unit,
  collapsedDisplayText: unit,
}))
