import styled from "styled-components"
import Show from "@components/Show"
import { CollapseIcon, ExpandIcon } from "@components/Icons"
import SelectToggle from "./SelectToggle"
import SelectBody from "./SelectBody"
import useSelect from "./useSelect"
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

/**
 * Select input
 *
 * An alternative to the OS-handled <select> tag.
 * `value` corresponds to the index of the currently selected option.
 *
 * @param {FieldInputProps} props
 */
const SelectInput: React.VFC<FieldInputProps> = (props) => {
  const {
    // error,
    label,
    fieldName,
    // tooltip,
    // type,
    placeholder,
    nested = false,
    value,
    onChange,
    children,
  } = props

  const {
    containerRef,
    selectRef,
    options,
    position,
    toggled,
    toggleSelect,
    currentValue,
    handleSelectValue,
  } = useSelect({
    children,
    value,
    onChange,
  })

  return (
    <Wrapper nested={nested} ref={containerRef}>
      <InnerWrapper nested={nested}>
        <LabelWrapper nested={nested}>
          <label htmlFor={fieldName}>{label}</label>
          {/* {tooltip && <InfoTooltip text={tooltip} />} */}
        </LabelWrapper>
        <SelectToggle onClick={toggleSelect} ref={selectRef}>
          <p>{currentValue === undefined ? placeholder : currentValue}</p>
          <Show when={toggled} fallback={<ExpandIcon size={20} />}>
            <CollapseIcon size={20} />
          </Show>
        </SelectToggle>
        <Show when={toggled}>
          <SelectBody position={position}>
            <Show when={placeholder}>
              <button onClick={handleSelectValue(undefined)}>
                {placeholder}
              </button>
            </Show>
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
