import {
  timeUnitsValue,
  temperatureUnitsValue,
  volumeUnitsValue,
  molarUnitsValue,
  energyUnitsValue,
} from "../lib/units"
import useSettings from "./useSettings"
import { TokenTypes } from "../lib/tokens/tokenTypes"

const useUnits = () => {
  const { settings } = useSettings()

  /**
   * Physical variable units
   */
  const timeUnits = timeUnitsValue(settings.timeUnits)
  const temperatureUnits = temperatureUnitsValue(settings.temperatureUnits)
  const volumeUnits = volumeUnitsValue(settings.volumeUnits)
  const molarUnits = molarUnitsValue(settings.molarUnits)
  const energyUnits = energyUnitsValue(settings.energyUnits)

  /**
   * Constant units
   */
  const tokenizedMuUnits = [
    {
      type: TokenTypes.Parameter,
      value: `${timeUnits}`,
    },
    { type: TokenTypes.Operator, value: "^" },
    { type: TokenTypes.Parameter, value: `-1` },
  ]

  const tokenizedActivationEnergyUnits = [
    {
      type: TokenTypes.Parameter,
      value: `${energyUnits}`,
    },
    {
      type: TokenTypes.Operator,
      value: "*",
    },
    {
      type: TokenTypes.Parameter,
      value: `${molarUnits}`,
    },
    {
      type: TokenTypes.Operator,
      value: "^",
    },
    {
      type: TokenTypes.Parameter,
      value: "-1",
    },
    {
      type: TokenTypes.Operator,
      value: "*",
    },
    {
      type: TokenTypes.Parameter,
      value: `${temperatureUnits}`,
    },
    {
      type: TokenTypes.Operator,
      value: "^",
    },
    {
      type: TokenTypes.Parameter,
      value: "-1",
    },
  ]

  const tokenizedReactionEnthalpyUnits = [
    {
      type: TokenTypes.Parameter,
      value: `${energyUnits}`,
    },
    {
      type: TokenTypes.Operator,
      value: "*",
    },
    {
      type: TokenTypes.Parameter,
      value: `${molarUnits}`,
    },
    {
      type: TokenTypes.Operator,
      value: "^",
    },
    {
      type: TokenTypes.Parameter,
      value: "-1",
    },
  ]

  const tokenizedKUnits = (order: number) => {
    const kUnits = [
      {
        type: TokenTypes.Parameter,
        value: `${timeUnits}`,
      },
      { type: TokenTypes.Operator, value: "^" },
      { type: TokenTypes.Parameter, value: `-1` },
    ]

    if (order !== 1) {
      kUnits.push({ type: TokenTypes.Operator, value: "*" })
      kUnits.push({
        type: TokenTypes.Parameter,
        value: `${volumeUnits}`,
      })
      kUnits.push({ type: TokenTypes.Operator, value: "^" })
      kUnits.push({
        type: TokenTypes.Parameter,
        value: `${order - 1}`,
      })
      kUnits.push({ type: TokenTypes.Operator, value: "*" })
      kUnits.push({
        type: TokenTypes.Parameter,
        value: `${molarUnits}`,
      })
      kUnits.push({ type: TokenTypes.Operator, value: "^" })
      kUnits.push({
        type: TokenTypes.Parameter,
        value: `${-(order - 1)}`,
      })
    }

    return kUnits
  }

  return {
    timeUnits,
    temperatureUnits,
    volumeUnits,
    molarUnits,
    energyUnits,

    tokenizedMuUnits,
    tokenizedKUnits,
    tokenizedActivationEnergyUnits,
    tokenizedReactionEnthalpyUnits,
  }
}

export default useUnits
