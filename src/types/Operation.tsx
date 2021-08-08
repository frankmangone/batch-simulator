export interface Operation {
  reactionTime: number
  deadTime: number
  timeStep: number
}

export interface OperationErrors {
  reactionTime?: string
  deadTime?: string
  timeStep?: string
}
