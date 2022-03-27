import styled from "styled-components"
import Error from "./Error"
import Input from "./Input"
// import InfoTooltip from "./InfoTooltip"

interface FieldInputProps<T> {
  label: string
  fieldName: string
  error?: string
  tooltip?: string
  type?: string
  value: T
  // onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Wrapper = styled.fieldset`
  display: flex;
  flex-direction: column;
`

const LabelWrapper = styled.div`
  display: flex;
`

const TextInput = <T extends unknown>(props: FieldInputProps<T>) => {
  const {
    error,
    label,
    fieldName,
    // tooltip,
    type,
    value,
    onChange,
  } = props

  return (
    <Wrapper>
      <LabelWrapper>
        <label htmlFor={fieldName}>{label}</label>
        {/* {tooltip && <InfoTooltip text={tooltip} />} */}
      </LabelWrapper>
      <Input
        errors={!!error}
        name={fieldName}
        type={type || "text"}
        autoComplete="off"
        onChange={onChange}
        value={String(value)}
      />
      {error && <Error>{error}</Error>}
    </Wrapper>
  )
}

export default TextInput
