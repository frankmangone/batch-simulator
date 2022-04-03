import {
  timeUnitsValue,
  temperatureUnitsValue,
  volumeUnitsValue,
  molarUnitsValue,
  massUnitsValue,
  energyUnitsValue,
} from "@lib/units"
import {
  multiplicationToken,
  exponentiationToken,
  parameterToken,
  minusOneToken,
} from "@lib/tokens/tokenTypes"
import useSettings from "./useSettings"

const useUnits = () => {
  const { settings } = useSettings()

  /**
   * Physical variable units
   */
  const timeUnits = timeUnitsValue(settings.timeUnits)
  const temperatureUnits = temperatureUnitsValue(settings.temperatureUnits)
  const volumeUnits = volumeUnitsValue(settings.volumeUnits)
  const molarUnits = molarUnitsValue(settings.molarUnits)
  const massUnits = massUnitsValue(settings.massUnits)
  const energyUnits = energyUnitsValue(settings.energyUnits)

  /**
   * Constant units
   */
  const tokenizedMuUnits = [
    parameterToken(timeUnits),
    exponentiationToken,
    minusOneToken,
  ]

  const tokenizedActivationEnergyUnits = [
    parameterToken(energyUnits),
    multiplicationToken,
    parameterToken(molarUnits),
    exponentiationToken,
    minusOneToken,
    multiplicationToken,
    parameterToken(temperatureUnits),
    exponentiationToken,
    minusOneToken,
  ]

  const tokenizedReactionEnthalpyUnits = [
    parameterToken(energyUnits),
    multiplicationToken,
    parameterToken(molarUnits),
    exponentiationToken,
    minusOneToken,
  ]

  const tokenizedKUnits = (order: number) => {
    const kUnits = [
      parameterToken(timeUnits),
      exponentiationToken,
      minusOneToken,
    ]

    if (order !== 1) {
      kUnits.push(multiplicationToken)
      kUnits.push(parameterToken(volumeUnits))
      kUnits.push(exponentiationToken)
      kUnits.push(parameterToken(`${order - 1}`))
      kUnits.push(multiplicationToken)
      kUnits.push(parameterToken(molarUnits))
      kUnits.push(exponentiationToken)
      kUnits.push(parameterToken(`${-(order - 1)}`))
    }

    return kUnits
  }

  return {
    timeUnits,
    temperatureUnits,
    volumeUnits,
    molarUnits,
    massUnits,
    energyUnits,

    tokenizedMuUnits,
    tokenizedKUnits,
    tokenizedActivationEnergyUnits,
    tokenizedReactionEnthalpyUnits,
  }
}

export default useUnits
