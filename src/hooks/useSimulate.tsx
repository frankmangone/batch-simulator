import useSettings from "../hooks/useSettings"
import useCompounds from "../hooks/useCompounds"
import useReactions from "../hooks/useReactions"
import useSimulationResults from "../hooks/useSimulationResults"

/* Helpers */
import { parseEquation } from "../helpers/tokenParser"
import { getCoefficientForComponent } from "../helpers/reactions"

/* Types */
import { Settings } from "../types/Settings"
import { Compound } from "../types/Compound"
import { Reaction, ReactionCompound, KineticEquation } from "../types/Reaction"
import {
  ParsedReaction,
  CompoundWithCoefficient,
} from "../types/ParsedReaction"
import { TimePoint, SimulationResults } from "../types/SimulationResults"
import { Token, TokenTypes } from "../helpers/tokenization"

const useSimulate = () => {
  const { compounds } = useCompounds()
  const { reactions } = useReactions()
  const { settings } = useSettings()
  const { saveSimulationResults } = useSimulationResults()

  //: SimulationResults => {
  const simulate = () => {
    /**
     * Reaction equations (as tokens) are reordered to RPN notation
     * and some more magic happens. Check the method
     *  */
    const parsedReactions: ParsedReaction[] = parseReactionEquations(
      reactions,
      compounds
    )

    // Initialize simulation results
    const initialValues: TimePoint = { t: 0 }
    compounds.forEach((c) => (initialValues[`[${c.symbol}]`] = c.concentration))

    // Start simulation execution
    const results = executeSimulation(initialValues, parsedReactions, settings)

    saveSimulationResults(results)
  }

  return { simulate }
}

export default useSimulate

/**
 * Helper functions
 */

const parseReactionEquations = (
  reactions: Reaction[],
  compounds: Compound[]
): ParsedReaction[] => {
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

    // 1) Replace parameters for values & strip variables of {} symbols
    parsedReaction.kineticEquation = parseParametersAndVariables(reaction)

    // 2) Modify token order to RPN
    parsedReaction.kineticEquation = parseEquation(
      parsedReaction.kineticEquation
    )

    // 3) Merge reactants and products
    parsedReaction.compounds = mergeCompounds(reaction, compounds)

    parsedReactions.push(parsedReaction)
  })

  return parsedReactions
}

const parseParametersAndVariables = (reaction: Reaction): KineticEquation => {
  const kineticEquationCopy = JSON.parse(
    JSON.stringify(reaction.kineticEquation)
  )

  kineticEquationCopy.forEach((token: Token) => {
    if (token.type === TokenTypes.Parameter) {
      // Replace parameter by numeric value
      const key = (token.value as string).replace(/<|>/g, "")
      const value = reaction.kineticConstants[key]
      token.value = value
    } else if (token.type === TokenTypes.Variable) {
      // Strip variable of {} symbols
      token.value = (token.value as string).replace(/{|}/g, "")
    }
  })

  return kineticEquationCopy
}

const mergeCompounds = (
  reaction: Reaction,
  compounds: Compound[]
): CompoundWithCoefficient[] => {
  const parsedCompounds: CompoundWithCoefficient[] = []

  reaction.reactants.forEach((reactionCompound: ReactionCompound) => {
    const compound: CompoundWithCoefficient = Object.assign(
      {},
      {
        compoundId: reactionCompound.compoundId,
        symbol: `[${
          compounds.find((c) => c.id === reactionCompound.compoundId)?.symbol
        }]`,
        coefficient: getCoefficientForComponent(
          reaction,
          reactionCompound.compoundId
        ),
      }
    )
    parsedCompounds.push(compound)
  })

  reaction.products.forEach((reactionCompound: ReactionCompound) => {
    const compound: CompoundWithCoefficient = Object.assign(
      {},
      {
        compoundId: reactionCompound.compoundId,
        symbol: `[${
          compounds.find((c) => c.id === reactionCompound.compoundId)?.symbol
        }]`,
        coefficient: getCoefficientForComponent(
          reaction,
          reactionCompound.compoundId
        ),
      }
    )
    parsedCompounds.push(compound)
  })

  return parsedCompounds
}

/****************************************************************
 *    SIMULATE METHOD                                           *
 *    ---                                                       *
 ****************************************************************/

const executeSimulation = (
  resultsInitialValues: TimePoint,
  parsedReactions: ParsedReaction[],
  settings: Settings
) => {
  const results: SimulationResults = [resultsInitialValues]

  // Define an iterator for time evolution
  const createSimulationIterator = (endTime = 10, timeStep = 0.1) => {
    const rangeIterator = {
      next: function () {
        let result
        const currentTime = results[results.length - 1].t

        if (currentTime < endTime) {
          result = { done: false }
          explicitEulerStep(parsedReactions, timeStep, results)
          return result
        }
        return { done: true }
      },
    }

    return rangeIterator
  }

  const iterator = createSimulationIterator(
    settings.reactionTime,
    settings.timeStep
  )

  let result = iterator.next()
  while (!result.done) {
    result = iterator.next()
  }

  return results
}

/**
 * Mutates the results object, pushing the new calculations as TimePoints
 */
const explicitEulerStep = (
  parsedReactions: ParsedReaction[],
  timeStep: number,
  results: SimulationResults
): void => {
  const oldTimePoint: TimePoint = JSON.parse(
    JSON.stringify(results[results.length - 1])
  )
  const newTimePoint: TimePoint = { t: 0 }

  // Reaction rates can be calculated for each reaction once,
  // and reused when calculating compound net reaction rates
  const reactionRates: number[] = parsedReactions.map((parsedReaction) => {
    return calculateReactionRate(parsedReaction, oldTimePoint)
  })

  Object.entries(oldTimePoint).forEach(([variable, value]) => {
    // variable corresponds to "t" or a compound symbol in brackets i.e. "[A]"
    //
    // variable "t" has to be treated differently than the others
    if (variable === "t") {
      newTimePoint.t = value + timeStep
      return
    }

    // For other variables, calculate functional value (net rate of change) associated
    // with the ODE.
    // It's a summatory of kinetic velocities
    //
    // In other words: d[VAR]/dt = rateOfChange
    const rateOfChange = calculateNetRateOfChange(
      parsedReactions,
      reactionRates,
      variable
    )

    // In explicit euler, this reaction rate is used with the time step to calculate the next
    // functional value. This should be generalized (TODO:)
    //
    // Also, values should be zero or higher!
    newTimePoint[variable] = nonNegative(
      oldTimePoint[variable] + rateOfChange * timeStep
    )
  })

  // Finally, push new TimePoint
  results.push(newTimePoint)
}

const calculateNetRateOfChange = (
  parsedReactions: ParsedReaction[],
  reactionRates: number[],
  variable: string
) => {
  let reactionRate = 0

  parsedReactions.forEach((reaction: ParsedReaction, index: number) => {
    const compound = reaction.compounds?.find(
      (c) => c.symbol === variable
    ) as CompoundWithCoefficient
    // If a compound is found, it means the reaction is involved in the
    // material balance of the species
    if (compound) {
      reactionRate += reactionRates[index] * compound.coefficient
    }
  })

  return reactionRate
}

const calculateReactionRate = (
  reaction: ParsedReaction,
  oldTimePoint: TimePoint
) => {
  /**
   * WARNING: By this point, it is assumed that the provided RPN equation is valid.
   * This has to be ensured with validation prior to execution, or it can lead to failures.
   */

  let resultStack: number[] = []

  reaction.kineticEquation?.forEach((token: Token) => {
    // Tokens are already ordered in RPN at this point, so
    // what we need to do is push values into the stack,
    // and then perform binary operations
    if (token.type === TokenTypes.Parameter)
      resultStack.push(token.value as number)
    else if (token.type === TokenTypes.Variable)
      resultStack.push(oldTimePoint[token.value])
    else {
      // Can only be a binary operator. Parenthesis have been removed in RPN.
      // Because it is a binary operator, it will always involve the last two
      // elements added to the stack, so we first have to pop them
      const b = resultStack.pop() as number
      const a = resultStack.pop() as number

      switch (token.value) {
        case "+":
          resultStack.push(a + b)
          break
        case "-":
          resultStack.push(a - b)
          break
        case "*":
          resultStack.push(a * b)
          break
        case "/":
          resultStack.push(a / b)
          break
        case "^":
          resultStack.push(a ** b)
          break
      }
    }
  })

  // After execution, we should be left with only one element in the stack, which
  // is the computation result
  return resultStack[0]
}

const nonNegative = (value: number) => {
  if (value < 0) return 0
  return value
}
