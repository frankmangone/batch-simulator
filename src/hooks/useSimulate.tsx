import useSettings from "@hooks/useSettings"
import useCompounds from "@hooks/entities/useCompounds"
import useReactions from "@hooks/entities/useReactions"
import useSimulationResults from "@hooks/useSimulationResults"
import useMathConstants from "@hooks/useMathConstants"

import { parseEquation } from "@lib/tokenParser"
import { getCoefficientForComponent } from "@lib/reactions"
import { TokenTypes } from "@lib/tokens/tokenTypes"

const useSimulate = () => {
  const getConstant = useMathConstants()
  const { compounds } = useCompounds()
  const { reactions } = useReactions()
  const { settings } = useSettings()
  const { saveSimulationResults } = useSimulationResults()

  const parseReactionEquations = (): ParsedReaction[] => {
    /**
     * Parsing a reaction entails:
     *  1) Replacing parameters for their entered values
     *  2) Modifying the token order to RPN
     *  3) Merging reactants and products to compounds, which have a symbol
     *    and a coefficient
     *  4) Add additional information
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

      // 4) Adds additional keys with important information
      parsedReaction.enthalpy = parseFloat(
        reaction.kineticConstants["\\Delta+H_r"]
      )

      parsedReactions.push(parsedReaction)
    })

    return parsedReactions
  }

  const parseParametersAndVariables = (reaction: Reaction): KineticEquation => {
    const kineticEquationCopy = JSON.parse(
      JSON.stringify(reaction.kineticEquation)
    )

    kineticEquationCopy.forEach((token: Token, index: number) => {
      if (token.type === TokenTypes.Parameter) {
        // Replace parameter by numeric value
        const key = (token.value as string).replace(/<|>/g, "")
        // Param. may be reaction-related, or be a thermodynamic constant
        if (reaction.kineticConstants[key]) {
          token.value = parseFloat(reaction.kineticConstants[key])
        } else {
          token.value = getConstant(key as MathConstant)
        }
      } else if (token.type === TokenTypes.Variable) {
        // Strip variable of {} symbols
        token.value = (token.value as string).replace(/{|}/g, "")
      }

      kineticEquationCopy[index] = token
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

  //
  //
  //

  //: SimulationResults => {
  const simulate = () => {
    /**
     * Reaction equations (as tokens) are reordered to RPN notation
     * and some more magic happens. Check the method
     *  */
    const parsedReactions: ParsedReaction[] = parseReactionEquations()

    // Initialize simulation results
    const initialValues: TimePoint = { t: 0, T: settings.initialTemperature }
    compounds.forEach((c) => (initialValues[`[${c.symbol}]`] = c.concentration))

    // Start simulation execution
    const results = executeSimulation(initialValues, parsedReactions, settings)

    saveSimulationResults(results)
  }

  return { simulate }
}

export default useSimulate

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
          explicitEulerStep(
            parsedReactions,
            timeStep,
            settings.isothermic,
            results
          )
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
  isothermic: boolean,
  results: SimulationResults
): void => {
  const oldTimePoint: TimePoint = JSON.parse(
    JSON.stringify(results[results.length - 1])
  )
  // TODO: Conditionally run T equation if not an isothermic system
  const newTimePoint: TimePoint = { t: 0, T: oldTimePoint.T }

  // Reaction rates can be calculated for each reaction once,
  // and reused when calculating compound net reaction rates
  //
  // TODO: Rethink this for other kind of numeric methods
  const reactionRates: number[] = parsedReactions.map((parsedReaction) => {
    return calculateReactionRate(parsedReaction, oldTimePoint)
  })

  Object.entries(oldTimePoint).forEach(([variable, value]) => {
    // variable corresponds to "t" (time), "T" (temperature),
    // or a compound symbol in brackets i.e. "[A]"
    //
    // variables "t" and "T" have to be treated differently than the others
    if (variable === "t") {
      newTimePoint.t = value + timeStep
      return
    }

    if (variable === "T") {
      const temperatureRateOfChange = isothermic
        ? 0
        : calculateTemperatureNetRateOfChange(parsedReactions, reactionRates)

      newTimePoint.T = oldTimePoint.T - temperatureRateOfChange * timeStep
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

const calculateTemperatureNetRateOfChange = (
  parsedReactions: ParsedReaction[],
  reactionRates: number[]
) => {
  let netRate = 0

  // Rates are calculated in relation to the key compound
  parsedReactions.forEach((reaction: ParsedReaction, index: number) => {
    netRate += reactionRates[index] * reaction.enthalpy!
  })

  return netRate
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
    else if (token.type === TokenTypes.Variable) {
      resultStack.push(oldTimePoint[token.value])
    } else {
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
