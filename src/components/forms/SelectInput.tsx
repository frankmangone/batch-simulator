import styled from "styled-components"
import InfoTooltip from "./InfoTooltip"
import Select, { ISelectOption } from "../Select"

interface SelectInputProps {
  value: any
  fieldName: string
  selectOptions: ISelectOption<any>[]
  label: string
  tooltip?: string
  onSelectionChange: (value: any) => void
}

const FieldInput: React.FC<SelectInputProps> = (props) => {
  const { fieldName, label, selectOptions, tooltip, value, onSelectionChange } =
    props
  const currentValue = selectOptions.find((option) => option.value === value)

  return (
    <SelectInputWrapper>
      <LabelWrapper>
        <label htmlFor={fieldName}>{label}</label>
        {tooltip && <InfoTooltip text={tooltip} />}
      </LabelWrapper>
      <Select
        initialValue={currentValue}
        selectOptions={selectOptions}
        onSelectionChange={onSelectionChange}
      />
    </SelectInputWrapper>
  )
}

const SelectInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  padding: 0.5rem;
  position: relative;

  label {
    font-weight: 600;
    color: var(--color-grey-dark);
    margin-right: 1rem;
  }

  &:hover > .error {
    opacity: 1 !important;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default FieldInput
