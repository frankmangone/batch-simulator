import React, { useEffect, useState, useRef, useCallback } from "react"
import styled from "styled-components"
import randomstring from "randomstring"
import { FiChevronDown } from "react-icons/fi"

interface SelectProps<T> {
  alignment?: string
  defaultDisplayValue?: string
  hoverIcon?: JSX.Element
  initialValue?: SelectOptionProps<T>
  selectOptions: SelectOptionProps<T>[]
  onSelectionChange: (value?: T) => void
}

/**
 * Select
 *
 * Reusable custom select component
 * */
const Select = <T extends unknown>(props: SelectProps<T>) => {
  const {
    alignment,
    defaultDisplayValue,
    hoverIcon,
    initialValue,
    onSelectionChange,
    selectOptions,
  } = props

  // Set state variables
  const [selecting, setSelecting] = useState<boolean>(false)
  const [currentValue, setCurrentValue] = useState<T | undefined>(
    initialValue?.value ?? undefined
  )

  // Use ref for id value
  const id = useRef<string>(randomstring.generate(8))

  // Keep a ref to select component, for event add and remove listeners
  // when clicking outside
  const selectRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Save ref to rendered Select component
    selectRef.current = document.getElementById(id.current)
  }, [])

  // Set ref to dropdown when visible
  useEffect(() => {
    if (selecting) selectRef.current = document.getElementById(id.current)
    else selectRef.current = null
  }, [selecting])

  /*
   * A useCallback hook here is needed so that the exact same function is passed
   * to both addEventListener and removeEventListener
   *
   * https://dev.to/marcostreng/how-to-really-remove-eventlisteners-in-react-3och
   */
  const clickOutsideHandler = useCallback((event: any): void => {
    // Uses tips from:
    // https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element/3028037#3028037
    if (!selectRef.current?.contains(event.target)) {
      toggleSelecting()
      setSelecting(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Toggles select options, while adding listeners for closing when clicking outside
  // of the dropdown
  const toggleSelecting = (): void => {
    // Event listeners handling
    if (!selecting) {
      window.addEventListener("click", clickOutsideHandler, true)
    } else {
      window.removeEventListener("click", clickOutsideHandler, true)
    }

    // Toggle state variable
    setSelecting(!selecting)
  }

  // Handles value selection
  // Definition is pretty self-explanatory
  const selectValue = (value?: T): void => {
    toggleSelecting()
    setCurrentValue(value)
    onSelectionChange(value)
  }

  // Current selected value data
  const currentValueOption: SelectOptionProps<T> | undefined =
    selectOptions.find((option) => option.value === currentValue)

  return (
    <SelectWrapper id={id.current}>
      <SelectValue selecting={selecting} onClick={toggleSelecting}>
        <p>{currentValueOption?.collapsedDisplayText || defaultDisplayValue}</p>
        <FiChevronDown size={10} />
      </SelectValue>
      {selecting && (
        <SelectOptions alignment={alignment || "left"}>
          {defaultDisplayValue && (
            <Option onClick={() => selectValue(undefined)}>
              <p>{defaultDisplayValue}</p>
            </Option>
          )}
          {selectOptions.map(({ value, displayText }, index) => (
            <Option
              key={index}
              onClick={() => {
                selectValue(value)
              }}
            >
              <p>{displayText}</p>
              <span>{hoverIcon}</span>
            </Option>
          ))}
        </SelectOptions>
      )}
    </SelectWrapper>
  )
}

export default Select

interface Selecting {
  selecting: boolean
}

const SelectWrapper = styled.div`
  position: relative;
  flex: 1;
`

const SelectValue = styled.div<Selecting>`
  align-items: center;
  background-color: var(--color-grey-lightest);
  border: 1px solid var(--color-grey-normal);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  font-size: 1.1rem;
  outline: none;
  padding: 5px 10px;
  transition: all 0.15s linear;
  ${(props) =>
    props.selecting
      ? `box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15),
    0px 0px 2px var(--color-grey-normal);`
      : ""}

  & > p {
    margin: 0;
    flex-grow: 1;
  }

  & > svg {
    margin-left: 0.5rem;
  }
`

interface ISelectOptions {
  alignment: string
}

const SelectOptions = styled.div<ISelectOptions>`
  position: absolute;
  top: 100%;

  align-items: stretch;
  ${(props) => (props.alignment === "left" ? "left: 0;" : "")}
  ${(props) => (props.alignment === "right" ? "right: 0;" : "")}
  background-color: var(--color-grey-lightest);
  border: none;
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15),
    0px 0px 2px var(--color-grey-normal);
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
  transition: all 0.05s linear;
  width: calc(100% - 1rem);
  z-index: 20;
`

const Option = styled.button`
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  text-align: left;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &:hover {
    background-color: var(--color-grey-lighter);

    & > span {
      opacity: 1;
    }
  }

  & > p {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    margin: 0;
    flex-grow: 1;
  }

  & > span {
    display: inline-flex;
    align-items: center;
    opacity: 0;
    transition: opacity 0.15s linear;
  }
`
