import { createContext, useContext, useState } from "react"

/* Types */
import { ICompound } from "../types/Compound"
import { IFCWithChildren } from "../types/FCWithChildren"

interface IDefaultValue {
  compounds: ICompound[]
  setCompounds: React.Dispatch<ICompound[]>
}

const defaultValue: IDefaultValue = {
  compounds: [],
  setCompounds: () => {},
}

// Context Provider component
export const DataContext = createContext(defaultValue)

// Hook to use the context values
export const useData = () => {
  return useContext(DataContext)
}

// Store component to abstract logic from root component
export const DataStore: React.FC<IFCWithChildren> = (props) => {
  const { children } = props
  const [compounds, setCompounds] = useState<ICompound[]>([])

  return (
    <DataContext.Provider value={{ compounds, setCompounds }}>
      {children}
    </DataContext.Provider>
  )
}
