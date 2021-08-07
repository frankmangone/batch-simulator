import { useData } from "../context/DataContext"

/* Helpers */
import { parseEquation } from "../helpers/tokenParser"
import { getCoefficientForComponent } from '../helpers/reactions'

/* Types */
import { ICompoundEquation } from '../types/CompoundEquation'
import { Operation } from '../types/Operation'
import { Reaction, ReactionCompound, KineticEquation } from "../types/Reaction"
import { ParsedReaction, CompoundWithCoefficient } from '../types/ParsedReaction'
import { ISimulationResults } from "../types/SimulationResults"
import { Token, TokenTypes } from "../helpers/tokenization"

const useSimulate = () => {
  // Get data from context
  const { compounds, reactions, operation } = useData()

  //: ISimulationResults => {
  const simulate = () => {
    /**
     * Reaction equations (as tokens) are reordered to RPN notation
     * and some more magic happens. Check the method
     *  */ 
    const parsedReactions: ParsedReaction[] = parseReactionEquations(reactions)

    // Initialize simulation results
    const initialValues: ISimulationResults = { t: [0] }
    compounds.forEach((c) => (initialValues[`[${c.symbol}]`] = [c.concentration]))

    // Start simulation execution
    executeSimulation(initialValues, parsedReactions, operation)
  }

  return { simulate }
}

export default useSimulate

/**
 * Helper functions
 */

const parseReactionEquations = (reactions: Reaction[]): ParsedReaction[] => {
  /**
   * Parsing a reaction entails:
   *  1) Replacing parameters for their entered values
   *  2) Modifying the token order to RPN
   *  3) Merging reactants and products to compounds, which have a symbol
   *    and a coefficient
   * 
   *  The reactions are stored in a new object of type ParsedReaction
   */
  const parsedReactions: ParsedReaction[] = []

  reactions.forEach((reaction, index) => {
    const parsedReaction: ParsedReaction = {}

    // 1) Replace parameters for values
    parsedReaction.kineticEquation = replaceParametersForValues(reaction)

    // 2) Modify token order to RPN
    parsedReaction.kineticEquation = parseEquation(
      parsedReaction.kineticEquation
    )

    // 3) Merge reactants and products
    parsedReaction.compounds = mergeCompounds(reaction)

    parsedReactions.push(parsedReaction)
  })

  return parsedReactions
}

const replaceParametersForValues = (reaction: Reaction): KineticEquation => {
  const kineticEquationCopy = JSON.parse(JSON.stringify(reaction.kineticEquation))

  kineticEquationCopy.forEach((token: Token) => {
    if (token.type === TokenTypes.Parameter) {
      // Replace parameter by numeric value
      const key = (token.value as string).replace(/<|>/g, "")
      const value = reaction.kineticConstants[key]
      token.value = value
    }
  })

  return kineticEquationCopy
}

const mergeCompounds = (reaction: Reaction): CompoundWithCoefficient[] => {
  const compounds: CompoundWithCoefficient[] = []

  reaction.reactants.forEach((reactionCompound: ReactionCompound) => {
    const compound: CompoundWithCoefficient = Object.assign({}, {
      compoundId: reactionCompound.compoundId,
      coefficient: getCoefficientForComponent(reaction, reactionCompound.compoundId)
    })
    compounds.push(compound)
  })

  reaction.products.forEach((reactionCompound: ReactionCompound) => {
    const compound: CompoundWithCoefficient = Object.assign({}, {
      compoundId: reactionCompound.compoundId,
      coefficient: getCoefficientForComponent(reaction, reactionCompound.compoundId)
    })
    compounds.push(compound)
  })
  
  return compounds
}

/****************************************************************
 *    SIMULATE METHOD                                           *
 *    ---                                                       *
 ****************************************************************/

const executeSimulation = (
  resultsInitialValues: ISimulationResults,
  parsedReactions: ParsedReaction[],
  operation: Operation
) => {
  console.log(parsedReactions)
}