import styled from "styled-components"
import randomstring from "randomstring"

/* Components */
import { FiChevronDown } from "react-icons/fi"

// Hooks
import { useEffect, useState, useRef, useCallback } from "react"

interface ISelectProps<T> {
  alignment?: string
  defaultDisplayValue?: string
  hoverIcon?: JSX.Element
  initialValue?: ISelectOption<T>
  selectOptions: ISelectOption<T>[]
  onSelectionChange: (value?: T) => void
}

export interface ISelectOption<T> {
  value?: T
  displayText?: string
  collapsedDisplayText?: string
  hoverBackgroundColor?: string
}

/* Reusable custom select component */
const Select = <T extends string | number>(props: ISelectProps<T>) => {
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
    initialValue?.value || undefined
  )

  // Use ref for id value
  const id = useRef<string>(randomstring.generate(8))

  /*
   * Save a ref select component, for event add and remove listeners
   * when clicking outside
   */
  const selectRef = useRef<HTMLElement | null>(null)
  // const dropdownRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Save initialValue provided as prop to currentValue, if present
    if (initialValue) setCurrentValue(initialValue.value)

    // Save ref to rendered Select component
    selectRef.current = document.getElementById(id.current)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /*
   * Set ref to dropdown when visible
   */
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
    // TODO: Better typing
    // Uses tips from:
    // https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element/3028037#3028037

    if (!selectRef.current?.contains(event.target)) {
      toggleSelecting()
      // Change state manually because clickOutsideHandler can't have toggleSelecting as a dependency
      setSelecting(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /*
   * Toggles select options, while adding listeners for closing when clicking outside
   * of the dropdown
   */
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

  /*
   * Handles value selection
   * Definition is pretty self-explanatory
   */
  const selectValue = (value?: T): void => {
    toggleSelecting()
    setCurrentValue(value)
    onSelectionChange(value)
  }

  /*
   * Current selected value data
   */
  const currentValueOption: ISelectOption<T> | undefined = selectOptions.find(
    (option) => option.value === currentValue
  )

  return (
    <SelectWrapper id={id.current}>
      <SelectValue selecting={selecting} onClick={toggleSelecting}>
        <p>{currentValueOption?.collapsedDisplayText || defaultDisplayValue}</p>
        <FiChevronDown size={10} />
      </SelectValue>
      {selecting && (
        <SelectOptions alignment={alignment || "left"}>
          {defaultDisplayValue && (
            <SelectOption onClick={() => selectValue(undefined)}>
              <p>{defaultDisplayValue}</p>
            </SelectOption>
          )}
          {selectOptions.map(({ value, displayText, hoverBackgroundColor }) => (
            <SelectOption
              key={value}
              onClick={() => {
                selectValue(value)
              }}
              hoverBackgroundColor={hoverBackgroundColor}
            >
              <p>{displayText}</p>
              <span>{hoverIcon}</span>
            </SelectOption>
          ))}
        </SelectOptions>
      )}
    </SelectWrapper>
  )
}

export default Select

interface ISelecting {
  selecting: boolean
}

const SelectWrapper = styled.div`
  position: relative;
  flex: 1;
`

const SelectValue = styled.div<ISelecting>`
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
  overflow-y: scroll;
  padding: 0.5rem;
  transition: all 0.05s linear;
  width: auto;
  z-index: 20;
`

interface ISelectOptionProps {
  hoverBackgroundColor?: string
}

const SelectOption = styled.button<ISelectOptionProps>`
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  text-align: left;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &:hover {
    background-color: ${(props) =>
      props.hoverBackgroundColor || "var(--color-grey-lighter)"};

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
