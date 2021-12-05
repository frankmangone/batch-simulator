import {
  timeUnitsValue,
  temperatureUnitsValue,
  volumeUnitsValue,
  molarUnitsValue,
  energyUnitsValue,
} from "../lib/units"
import useSettings from "./useSettings"

const useUnits = () => {
  const { settings } = useSettings()

  const timeUnits = timeUnitsValue(settings.timeUnits)
  const temperatureUnits = temperatureUnitsValue(settings.temperatureUnits)
  const volumeUnits = volumeUnitsValue(settings.volumeUnits)
  const molarUnits = molarUnitsValue(settings.molarUnits)
  const energyUnits = energyUnitsValue(settings.energyUnits)

  return { timeUnits, temperatureUnits, volumeUnits, molarUnits, energyUnits }
}

export default useUnits
