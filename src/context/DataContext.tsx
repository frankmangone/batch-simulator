import { createContext, useContext, useState } from "react"
import randomstring from "randomstring"

/* Constants */
import { COMPOUND_COLORS_CODES } from "../constants/compoundColors"
import { COMPOUND_SYMBOLS } from "../constants/compoundSymbols"

/* Types */
import { ICompound } from "../types/Compound"
import { IReaction } from "../types/Reaction"
import { IFCWithChildren } from "../types/FCWithChildren"

interface IDefaultValue {
  compounds: ICompound[]
  addCompound: () => void
  editCompound: (index?: number) => void
  updateCompound: (index: number, updatedCompound: ICompound) => void
  removeCompound: (index: number) => void
  editedCompoundId: string | undefined
}

const defaultValue: IDefaultValue = {
  compounds: [],
  addCompound: () => {},
  editCompound: () => {},
  updateCompound: () => {},
  removeCompound: () => {},
  editedCompoundId: undefined,
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
export const DataStore: React.FC<IFCWithChildren> = (props) => {
  const { children } = props
  const [currentColor, setCurrentColor] = useState<number>(0)
  const [compounds, setCompounds] = useState<ICompound[]>([])
  const [reactions, setReactions] = useState<IReaction[]>([])
  const [editedCompoundId, setEditedCompoundId] = useState<string | undefined>(
    undefined
  )

  /**
   * Helper functions
   */
  const nextColor = () => {
    if (currentColor === COMPOUND_COLORS_CODES.length - 1) {
      setCurrentColor(0)
      return
    }
    setCurrentColor(currentColor + 1)
  }

  const availableSymbol = (): string => {
    const foundSymbols = new Array(COMPOUND_SYMBOLS.length).fill(false)

    compounds.forEach((compound) => {
      const index = COMPOUND_SYMBOLS.indexOf(compound.symbol)
      if (index !== -1) foundSymbols[index] = true
    })
    for (let i = 0; i < foundSymbols.length; i++) {
      if (!foundSymbols[i]) {
        return COMPOUND_SYMBOLS[i]
      }
    }
    return ""
  }

  /**
   * Compounds state handling
   */
  const addCompound = (): void => {
    const updatedCompounds = [...compounds]

    updatedCompounds.push({
      id: randomstring.generate(8),
      color: COMPOUND_COLORS_CODES[currentColor],
      concentration: 0,
      symbol: availableSymbol(),
      name: "",
    })
    nextColor()
    setCompounds(updatedCompounds)
  }

  const editCompound = (index?: number) => {
    if (typeof index === "undefined") {
      setEditedCompoundId(undefined)
      return
    }
    const id = compounds[index].id
    setEditedCompoundId(id)
  }

  const updateCompound = (index: number, updatedCompound: ICompound) => {
    const updatedCompounds = [...compounds]
    updatedCompounds[index] = updatedCompound
    setCompounds(updatedCompounds)
  }

  const removeCompound = (index: number): void => {
    setCompounds([
      ...compounds.slice(0, index),
      ...compounds.slice(index + 1, compounds.length),
    ])
  }

  /**
   * Reactions state handling
   */

  const addReaction = (): void => {
    const updatedReactions = [...reactions]

    updatedReactions.push({
      id: randomstring.generate(8),
      reactants: [],
      products: [],
      kineticModel: 0,
      kineticConstants: {},
    })
    setReactions(updatedReactions)
  }

  return (
    <DataContext.Provider
      value={{
        compounds,
        addCompound,
        editCompound,
        updateCompound,
        removeCompound,
        editedCompoundId,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
