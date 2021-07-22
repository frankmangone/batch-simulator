import { createContext, useContext, useState } from "react"

/* Constants */
import { COMPOUND_COLORS_CODES } from "../constants/compoundColors"
import { COMPOUND_SYMBOLS } from "../constants/compoundSymbols"

/* Types */
import { ICompound } from "../types/Compound"
import { IFCWithChildren } from "../types/FCWithChildren"

interface IDefaultValue {
  compounds: ICompound[]
  addCompound: () => void
  updateCompound: (index: number, updatedCompound: ICompound) => void
  removeCompound: (index: number) => void
}

const defaultValue: IDefaultValue = {
  compounds: [],
  addCompound: () => {},
  updateCompound: () => {},
  removeCompound: () => {},
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
    const oldCompounds = [...compounds]

    oldCompounds.push({
      color: COMPOUND_COLORS_CODES[currentColor],
      concentration: 0,
      symbol: availableSymbol(),
    })
    nextColor()
    setCompounds(oldCompounds)
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

  return (
    <DataContext.Provider
      value={{ compounds, addCompound, updateCompound, removeCompound }}
    >
      {children}
    </DataContext.Provider>
  )
}
