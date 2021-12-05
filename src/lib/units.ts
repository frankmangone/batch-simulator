export const temperatureUnits: TemperatureUnits = ["K", "R", "°C", "°F"]
export const timeUnits: TimeUnits = ["ms", "s", "min", "h"]
export const massUnits: MassUnits = ["mg", "g", "kg", "lb"]
export const molarUnits: MolarUnits = ["mol", "kmol", "lbmol"]
export const volumeUnits: VolumeUnits = ["L", "m3", "cm3"]
export const energyUnits: EnergyUnits = ["cal", "kcal", "J", "kJ"]

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

export const energyUnitsValue = (index: number) => {
  return energyUnits[index]
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
export const energyUnitsOptions = mapUnitOptions(energyUnits)
