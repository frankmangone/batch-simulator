import { useState, useRef, useEffect, useCallback } from "react"
import mapChildren from "./mapChildren"

interface UseSelectParams {
  children: JSX.Element | JSX.Element[]
  value: number
  onChange: (index: number) => void
}

const useSelect = (params: UseSelectParams) => {
  const { children, value, onChange } = params
  const options = mapChildren(children)

  // Keep a couple of references to correctly handle events
  const containerRef = useRef<HTMLDivElement | null>(null)
  const selectRef = useRef<HTMLDivElement | null>(null)

  // Keep track of the index of the current selected value
  const currentOption = options[value]
  const currentValue =
    currentOption?.collapsedDisplayText ?? currentOption?.displayText

  // Keep track of toggled state (expanded / collapsed)
  const [toggled, setToggled] = useState<boolean>(false)
  const toggleSelect = (): void => setToggled(!toggled)

  const clickOutsideHandler = useCallback(
    (event: MouseEvent): void => {
      // Uses tips from:
      // https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element/3028037#3028037
      if (!selectRef.current?.contains(event.target as Node)) setToggled(false)
    },
    [setToggled]
  )

  // Create a setter for the selected index
  const handleSelectValue = (index: number) => (): void => {
    toggleSelect()
    onChange(index)
  }

  // Adds / removes event listeners as a side effect of the `toggled` state
  useEffect(() => {
    if (toggled) {
      window.addEventListener("click", clickOutsideHandler, true)
      return
    }
    window.removeEventListener("click", clickOutsideHandler, true)
  }, [toggled, clickOutsideHandler])

  return {
    containerRef,
    selectRef,
    options,
    toggled,
    currentValue,
    toggleSelect,
    handleSelectValue,
  }
}

export default useSelect
