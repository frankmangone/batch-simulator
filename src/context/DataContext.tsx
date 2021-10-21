import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react"

/* Hooks */
import useLocalStorageState from "../hooks/useLocalStorageState"

/* Types */
import { Settings } from "../types/Settings"
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
  /* Settings */
  settings: Settings
  updateSettings: (updatedSettings: Settings) => void

  /* Simulation results */
  simulationResults: SimulationResults | undefined
  setSimulationResults: (simulationResults: SimulationResults) => void
}

const defaultSettingsValue: Settings = {
  reactionTime: 30,
  deadTime: 30,
  timeStep: 0.1,
  //
  timeUnits: "s",
  volumeUnits: "L",
  molarUnits: "mol",
  massUnits: "kg",
}

const defaultValue: IDefaultValue = {
  /* Settings */
  settings: defaultSettingsValue,
  updateSettings: () => {},

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

  // const [currentColor, setCurrentColor] = useState<number>(0)
  const [settings, setSettings] = useLocalStorageState<Settings>(
    "settings",
    defaultSettingsValue
  ) as [Settings, Dispatch<SetStateAction<Settings>>]

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
  const updateSettings = (updatedSettings: Settings): void => {
    setSettings(updatedSettings)
  }

  return (
    <DataContext.Provider
      value={{
        /* Settings */
        settings,
        updateSettings,

        /* Simulation results */
        simulationResults,
        setSimulationResults,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
