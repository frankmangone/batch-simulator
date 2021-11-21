import useSettings from "./useSettings"
import {
  timeUnitsValue,
  volumeUnitsValue,
  massUnitsValue,
  molarUnitsValue,
  temperatureUnitsValue,
  energyUnitsValue,
} from "../helpers/units"

/**
 * Returns a function that can be called with a math or physical constant [string] as an argument.
 * For the latter, also handles unit conversions based on app settings.
 *
 * It's important to define a standard set of base units. The chosen ones are:
 *  - K
 *  - s
 *  - kg
 *  - mol
 *  - L
 *  - J
 */

const FACTORS: Factors = {
  energy: {
    J: 1,
    kJ: 1 / 1000,
    cal: 0.239006,
    kcal: 0.239006 / 1000,
  },
  mass: {
    kg: 1,
    g: 1 / 1000,
    mg: 1 / 1000000,
    lb: 2.20462,
  },
  molar: {
    mol: 1,
    kmol: 1 / 1000,
    lbmol: 0.00220462,
  },
  time: {
    s: 1,
    min: 1 / 60,
    h: 1 / (60 * 60),
    ms: 1000,
  },
  temperature: {
    K: 1,
    R: 1.8,
    "°C": 1,
    "°F": 1.8,
  },
  volume: {
    L: 1,
    m3: 1 / 1000,
    cm3: 1000,
  },
}

const useMathConstants = () => {
  const { settings } = useSettings()
  const {
    energyUnits: energyUnitsIndex,
    massUnits: massUnitsIndex,
    molarUnits: molarUnitsIndex,
    temperatureUnits: temperatureUnitsIndex,
    timeUnits: timeUnitsIndex,
    volumeUnits: volumeUnitsIndex,
  } = settings

  /**
   * Factor getters from factors object
   */
  const getEnergyFactor = () => {
    const key = energyUnitsValue(energyUnitsIndex)
    return FACTORS.energy[key]
  }
  const getMassFactor = () => {
    const key = massUnitsValue(massUnitsIndex)
    return FACTORS.mass[key]
  }
  const getMolarFactor = () => {
    const key = molarUnitsValue(molarUnitsIndex)
    return FACTORS.molar[key]
  }
  const getTemperatureFactor = () => {
    const key = temperatureUnitsValue(temperatureUnitsIndex)
    return FACTORS.temperature[key]
  }
  const getTimeFactor = () => {
    const key = timeUnitsValue(timeUnitsIndex)
    return FACTORS.time[key]
  }
  const getVolumeFactor = () => {
    const key = volumeUnitsValue(volumeUnitsIndex)
    return FACTORS.volume[key]
  }

  /**
   * R - Gas constant
   * Base units: J / (mol * K)
   ********************************/
  const R = () => {
    const base = 8.314
    return (
      (base * getEnergyFactor()) / getTemperatureFactor() / getMolarFactor()
    )
  }

  /**
   * e - Euler's constant
   * Base units: -
   ********************************/
  const e = () => {
    return 2.7182818
  }

  /*********************************
   * *******************************
   * Mapping of all constants
   * *******************************
   ********************************/
  const CONSTANTS: Record<MathConstant, () => number> = {
    R,
    e,
  }

  return (key: keyof typeof CONSTANTS) => {
    return CONSTANTS[key].call(null)
  }
}

export default useMathConstants
