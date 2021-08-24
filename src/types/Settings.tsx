export interface Settings {
  reactionTime: number
  deadTime: number
  timeStep: number
  //
  timeUnits: string
  volumeUnits: string
  molarUnits: string
  massUnits: string
}

export interface SettingsErrors {
  reactionTime?: string
  deadTime?: string
  timeStep?: string
  //
  timeUnits?: string
  volumeUnits?: string
  molarUnits?: string
  massUnits?: string
}
