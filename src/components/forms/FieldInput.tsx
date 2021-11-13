import styled from "styled-components"

/* Components */
import Error from "./Error"
import Input from "./Input"
import InfoTooltip from "./InfoTooltip"

/* Constants */
import { COMPOUND_COLORS } from "../../constants/compoundColors"
interface IFieldInputProps {
  big?: boolean
  color?: string
  error?: string
  fieldName: string
  label: string
  type?: string
  tooltip?: string
  value: any
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FieldInput: React.FC<IFieldInputProps> = (props) => {
  const {
    big,
    color,
    error,
    fieldName,
    label,
    type,
    tooltip,
    value,
    onBlur,
    onChange,
  } = props

  const voidFunction = () => {}

  return (
    <FieldInputWrapper color={color} big={big}>
      <LabelWrapper>
        <label htmlFor={fieldName}>{label}</label>
        {tooltip && <InfoTooltip text={tooltip} />}
      </LabelWrapper>
      <Input
        errors={!!error}
        name={fieldName}
        type={type || "text"}
        autoComplete="off"
        onBlur={onBlur || voidFunction}
        onChange={onChange}
        value={value}
      />
      {error && <Error big={big}>{error}</Error>}
    </FieldInputWrapper>
  )
}

interface IFieldInputWrapperProps {
  color?: string
  big?: boolean
}

const FieldInputWrapper = styled.div<IFieldInputWrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  position: relative;

  ${(props) =>
    props.color
      ? `
    background-color: ${
      COMPOUND_COLORS[props.color as keyof typeof COMPOUND_COLORS]
    };
    border-radius: 5px;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  `
      : ""}
  ${(props) =>
    props.big
      ? `
    align-items: flex-start;
    margin-bottom: 1.5rem;
    padding: 1rem;
  `
      : ""}

  label {
    ${(props) => (props.big ? "font-size: 1.5rem;" : "")}
    font-weight: 600;
    color: var(--color-grey-dark);
  }

  input {
    ${(props) =>
      props.big
        ? `    
    font-size: 3rem;
    margin-left: 1rem;
    width: 0;
    `
        : "font-size: 1rem;"}
    width: 300px;
    align-self: stretch;
  }

  &:hover > .error {
    opacity: 1 !important;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-basis: 50%;
`

export default FieldInput
