import { useState } from "react"
import styled from "styled-components"
import Show from "../../Show"
import SelectToggle from "./SelectToggle"
import SelectBody from "./SelectBody"
import mapChildren from "./mapChildren"
// import InfoTooltip from "./InfoTooltip"

interface NestedProp {
  nested: boolean
}

const Wrapper = styled.div<NestedProp>`
  display: flex;
  flex-direction: column;
  ${(props) => (props.nested ? "align-self: stretch;" : "flex-basis: 33.3%;")};
  border: none;
  padding: 0;
  margin: 0;
`

const InnerWrapper = styled.div<NestedProp>`
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: ${(props) => (props.nested ? "row" : "column")};
  align-items: stretch;
`

const LabelWrapper = styled.div<NestedProp>`
  display: flex;
  ${(props) => props.nested && "align-items: center;"}

  label {
    color: ${(props) =>
      props.nested
        ? props.theme.getColor({ name: "baseBlack", shade: 400 })
        : props.theme.getColor({ name: "baseBlack", shade: 100 })};
    font-family: "Mulish", sans-serif;
    font-size: ${(props) => props.theme.fontSizes.p};
    font-weight: 600;
    line-height: ${(props) => props.theme.lineHeights.p};
    ${(props) =>
      props.nested ? "margin-right: 12px;" : "margin-bottom: 12px;"}
  }
`

const SelectInput = <T extends unknown>(props: FieldInputProps<T>) => {
  const {
    // error,
    label,
    fieldName,
    // tooltip,
    // type,
    nested = false,
    // value,
    // onChange,
    children,
  } = props

  const options = mapChildren(children)

  // Keep track of the index of the current selected value
  const [selectedIndex, setSelectedIndex] = useState<number>(0) // eslint-disable-line
  const currentOption = options[selectedIndex]
  const currentValue =
    currentOption.collapsedDisplayText ?? currentOption.displayText

  // Keep track of toggled state (expanded / collapsed)
  const [toggled, setToggled] = useState<boolean>(false)
  const toggleSelect = (): void => setToggled(!toggled)

  // Create a setter for the selected index
  const handleSelectValue = (index: number) => (): void => {
    toggleSelect()
    setSelectedIndex(index)
  }

  return (
    <Wrapper nested={nested}>
      <InnerWrapper nested={nested}>
        <LabelWrapper nested={nested}>
          <label htmlFor={fieldName}>{label}</label>
          {/* {tooltip && <InfoTooltip text={tooltip} />} */}
        </LabelWrapper>
        <SelectToggle onClick={toggleSelect}>{currentValue}</SelectToggle>
        <Show when={toggled}>
          <SelectBody>
            {options.map((option, index) => (
              <button key={index} onClick={handleSelectValue(index)}>
                {option.displayText}
              </button>
            ))}
          </SelectBody>
        </Show>
      </InnerWrapper>
    </Wrapper>
  )
}

export default SelectInput
