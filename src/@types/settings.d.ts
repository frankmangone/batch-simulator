interface Settings {
  // Reaction times
  reactionTime: number
  deadTime: number
  timeStep: number

  // Units
  timeUnits: number
  volumeUnits: number
  molarUnits: number
  massUnits: number
  temperatureUnits: number
  energyUnits: number

  // Heat Exchange
  isothermal: boolean
  initialTemperature: number
}

interface SettingsErrors {
  // Reaction times
  reactionTime?: string
  deadTime?: string
  timeStep?: string

  // Units
  timeUnits?: string
  volumeUnits?: string
  molarUnits?: string
  massUnits?: string
  temperatureUnits?: string
  energyUnits?: string

  // Heat Exchange
  isothermal?: string
  initialTemperature?: string
}
