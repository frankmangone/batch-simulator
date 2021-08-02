import { useData } from "../context/DataContext"

/* Types */
import { IReaction } from "../types/Reaction"
import { ISimulationResults } from "../types/SimulationResults"
import { TokenTypes } from "../helpers/tokenization"

const useSimulate = () => {
  // Get data from context
  const { compounds, reactions } = useData()

  //: ISimulationResults => {
  const simulate = () => {
    // First, duplicate reactions
    const reactionsCopy = replaceParametersForValues(reactions)
    console.log(reactionsCopy)
  }

  return { simulate }
}

export default useSimulate

/**
 * Helper functions
 */

const replaceParametersForValues = (reactions: IReaction[]): IReaction[] => {
  const reactionsCopy: IReaction[] = JSON.parse(JSON.stringify(reactions))

  reactionsCopy.forEach((reaction, index) => {
    reactionsCopy[index] = replaceParametersForValuesInSingleReaction(reaction)
  })

  return reactionsCopy
}

const replaceParametersForValuesInSingleReaction = (
  reaction: IReaction
): IReaction => {
  reaction.kineticEquation.forEach((token, index) => {
    if (token.type === TokenTypes.Parameter) {
      // Replace parameter by numeric value
      const key = (token.value as string).replace(/<|>/g, "")
      console.log(key)
      const value = reaction.kineticConstants[key]
      token.value = value
    }
  })

  return reaction
}
