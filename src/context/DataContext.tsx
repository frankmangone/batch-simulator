import { createContext, useContext, useState } from "react"

/* Types */
import { ICompound } from "../types/Compound"
import { IFCWithChildren } from "../types/FCWithChildren"

interface IDefaultValue {
  compounds: ICompound[]
  addCompound: (compound: ICompound) => void
  removeCompound: (index: number) => void
}

const defaultValue: IDefaultValue = {
  compounds: [],
  addCompound: () => {},
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
  const [compounds, setCompounds] = useState<ICompound[]>([])

  /**
   * TODO: This logic is fairly standard... Maybe create a reusable
   * hook to reuse it?
   */
  const addCompound = (compound: ICompound): void => {
    const oldCompounds = [...compounds]
    oldCompounds.push(compound)
    setCompounds(oldCompounds)
  }

  const removeCompound = (index: number): void => {
    setCompounds([
      ...compounds.slice(0, index),
      ...compounds.slice(index + 1, compounds.length),
    ])
  }

  return (
    <DataContext.Provider value={{ compounds, addCompound, removeCompound }}>
      {children}
    </DataContext.Provider>
  )
}
