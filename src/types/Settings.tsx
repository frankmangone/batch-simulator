export interface Settings {
  reactionTime: number
  deadTime: number
  timeStep: number
}

export interface SettingsErrors {
  reactionTime?: string
  deadTime?: string
  timeStep?: string
}
