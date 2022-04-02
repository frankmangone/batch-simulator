import { useState, useRef, useEffect, useCallback } from "react"
import mapChildren from "./mapChildren"

interface UseSelectParams {
  children: JSX.Element | JSX.Element[]
  value: number
  onChange: (index: number) => void
}

export enum SelectPosition {
  top,
  bottom,
}

const THROTTLE = 300

const checkPosition = (element: HTMLDivElement | null): SelectPosition => {
  const offsetTop = element?.getBoundingClientRect().top ?? 0
  const threshold = window.innerHeight / 2

  if (offsetTop > threshold) return SelectPosition.top
  return SelectPosition.bottom
}

const useSelect = (params: UseSelectParams) => {
  const { children, value, onChange } = params
  const options = mapChildren(children)

  // Keep a couple of references to correctly handle events
  const containerRef = useRef<HTMLDivElement | null>(null)
  const selectRef = useRef<HTMLDivElement | null>(null)
  const throttleIntervalRef = useRef<number>(Date.now())

  // Keep track of the index of the current selected value
  const currentOption = options[value]
  const currentValue =
    currentOption?.collapsedDisplayText ?? currentOption?.displayText

  // Keep track of select body position based on it's offset top
  const [position, setPosition] = useState<SelectPosition>(
    SelectPosition.bottom
  )

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

  // Callback for position checking
  const positionCheckHandler = useCallback(() => {
    const now = Date.now()
    if (now - throttleIntervalRef.current < THROTTLE) return
    throttleIntervalRef.current = now

    const newPosition = checkPosition(selectRef.current)
    if (position === newPosition) return
    setPosition(newPosition)
  }, [selectRef, position])

  // Create a setter for the selected index
  const handleSelectValue = (index: number) => (): void => {
    toggleSelect()
    onChange(index)
  }

  // Decides initial position of dropdown
  useEffect(() => {
    if (!selectRef.current) return
    setPosition(checkPosition(selectRef?.current))
  }, [selectRef])

  // Adds a throttled scroll handler for position checking
  useEffect(() => {
    window.addEventListener("scroll", positionCheckHandler)
    return () => window.removeEventListener("scroll", positionCheckHandler)
  }, [positionCheckHandler])

  // Adds / removes click event listeners as a side effect of the `toggled` state
  useEffect(() => {
    if (toggled) {
      window.addEventListener("click", clickOutsideHandler)
    } else {
      window.removeEventListener("click", clickOutsideHandler)
    }

    return () => window.removeEventListener("click", clickOutsideHandler)
  }, [toggled, clickOutsideHandler])

  return {
    containerRef,
    selectRef,
    options,
    position,
    toggled,
    currentValue,
    toggleSelect,
    handleSelectValue,
  }
}

export default useSelect
