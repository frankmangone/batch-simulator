import { useData } from "../context/DataContext"

/* Helpers */
import { parseEquation } from "../helpers/tokenParser"

/* Types */
import { IReaction } from "../types/Reaction"
import { ISimulationResults } from "../types/SimulationResults"
import { TokenTypes } from "../helpers/tokenization"

const useSimulate = () => {
  // Get data from context
  const { compounds, reactions } = useData()

  //: ISimulationResults => {
  const simulate = () => {
    const parsedReactions = parseReactionEquations(reactions)

    // Initialize simulation results
    const results: ISimulationResults = { t: [0] }
    compounds.forEach((c) => (results[`[${c.symbol}]`] = [c.concentration]))

    // Implement euler forward (explicit) integration
    console.log(parsedReactions)
    console.log(results)
  }

  return { simulate }
}

export default useSimulate

/**
 * Helper functions
 */

const parseReactionEquations = (reactions: IReaction[]): IReaction[] => {
  const reactionsCopy: IReaction[] = JSON.parse(JSON.stringify(reactions))

  reactionsCopy.forEach((reaction, index) => {
    reaction = replaceParametersForValues(reaction)
    reactionsCopy[index].kineticEquation = parseEquation(
      reaction.kineticEquation
    )
  })

  return reactionsCopy
}

const replaceParametersForValues = (reaction: IReaction): IReaction => {
  reaction.kineticEquation.forEach((token, index) => {
    if (token.type === TokenTypes.Parameter) {
      // Replace parameter by numeric value
      const key = (token.value as string).replace(/<|>/g, "")
      const value = reaction.kineticConstants[key]
      token.value = value
    }
  })

  return reaction
}
