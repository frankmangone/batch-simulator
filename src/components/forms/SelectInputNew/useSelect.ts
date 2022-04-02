import { useState } from "react"
import mapChildren from "./mapChildren"

interface UseSelectParams {
  children: JSX.Element | JSX.Element[]
  value: number
  onChange: (index: number) => void
}

const useSelect = (params: UseSelectParams) => {
  const { children, value, onChange } = params
  const options = mapChildren(children)

  // Keep track of the index of the current selected value
  const currentOption = options[value]
  const currentValue =
    currentOption?.collapsedDisplayText ?? currentOption?.displayText

  // Keep track of toggled state (expanded / collapsed)
  const [toggled, setToggled] = useState<boolean>(false)
  const toggleSelect = (): void => setToggled(!toggled)

  // Create a setter for the selected index
  const handleSelectValue = (index: number) => (): void => {
    toggleSelect()
    onChange(index)
  }

  return { options, toggled, toggleSelect, currentValue, handleSelectValue }
}

export default useSelect
