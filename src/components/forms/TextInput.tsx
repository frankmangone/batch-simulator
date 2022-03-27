import styled from "styled-components"
import Error from "./Error"
import Input from "./InputNew"
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
  flex-basis: 33%;
  border: none;
`

const LabelWrapper = styled.div`
  display: flex;

  label {
    color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 100 })};
    font-family: "Mulish", sans-serif;
    font-size: ${(props) => props.theme.fontSizes.p};
    font-weight: 600;
    line-height: ${(props) => props.theme.lineHeights.p};
    margin-bottom: 8px;
  }
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
