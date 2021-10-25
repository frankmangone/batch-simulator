import { createContext, useContext, useState } from "react"

/* Types */
import { SimulationResults } from "../types/SimulationResults"
import { FCWithChildren } from "../types/FCWithChildren"

/**
 * To mark whether if a compound is a reactant or a product,
 * the following enum is used
 *  */
export enum CompoundType {
  Reactant = 0,
  Product,
}

interface IDefaultValue {
  /* Simulation results */
  simulationResults: SimulationResults | undefined
  setSimulationResults: (simulationResults: SimulationResults) => void
}

const defaultValue: IDefaultValue = {
  /* Simulation results */
  simulationResults: undefined,
  setSimulationResults: () => {},
}

// Context Provider component
export const DataContext = createContext(defaultValue)

// Hook to use the context values
export const useData = () => {
  return useContext(DataContext)
}

/**
 * Store component to abstract logic from root component
 */
export const DataStore: React.FC<FCWithChildren> = (props) => {
  const { children } = props

  const [simulationResults, setSimulationResults] = useState<
    SimulationResults | undefined
  >(undefined)

  /**
   * Helper functions
   */

  // const nextColor = () => {
  //   if (currentColor === COMPOUND_COLORS_CODES.length - 1) {
  //     setCurrentColor(0)
  //     return
  //   }
  //   setCurrentColor(currentColor + 1)
  // }

  // const availableSymbol = (): string => {
  //   const foundSymbols = new Array(COMPOUND_SYMBOLS.length).fill(false)

  //   compounds.forEach((compound) => {
  //     const index = COMPOUND_SYMBOLS.indexOf(compound.symbol)
  //     if (index !== -1) foundSymbols[index] = true
  //   })
  //   for (let i = 0; i < foundSymbols.length; i++) {
  //     if (!foundSymbols[i]) {
  //       return COMPOUND_SYMBOLS[i]
  //     }
  //   }
  //   return ""
  // }

  // const removeCompound = (index: number): void => {
  //   const compoundId = compounds[index].id

  //   /**
  //    * Remove from reactions that have this compound
  //    */
  //   const updatedReactions = JSON.parse(JSON.stringify(reactions))
  //   updatedReactions.forEach((reaction: Reaction) => {
  //     reaction.reactants = reaction.reactants.filter(
  //       (reactionCompound: ReactionCompound) =>
  //         reactionCompound.compoundId !== compoundId
  //     )

  //     reaction.products = reaction.products.filter(
  //       (reactionCompound: ReactionCompound) =>
  //         reactionCompound.compoundId !== compoundId
  //     )

  //     if (reaction.keyCompound === compoundId) {
  //       reaction.keyCompound = undefined
  //     }
  //   })

  //   setReactions(updatedReactions)

  //   /**
  //    * Remove from compounds array
  //    */
  //   setCompounds([
  //     ...compounds.slice(0, index),
  //     ...compounds.slice(index + 1, compounds.length),
  //   ])
  // }

  /**
   * Settings state handling
   */

  return (
    <DataContext.Provider
      value={{
        /* Simulation results */
        simulationResults,
        setSimulationResults,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
