import styled from "styled-components"
import Error from "./ErrorNew"
import Input from "./InputNew"
// import InfoTooltip from "./InfoTooltip"

interface FieldInputProps<T> {
  label: string
  fieldName: string
  error?: string
  tooltip?: string
  type?: string
  value: T
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Wrapper = styled.fieldset`
  display: flex;
  flex-direction: column;
  flex-basis: 33.3%;
  border: none;
  padding: 0;
  margin: 0;
`

const InnerWrapper = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
    margin-bottom: 12px;
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
      <InnerWrapper>
        <LabelWrapper>
          <label htmlFor={fieldName}>{label}</label>
          {/* {tooltip && <InfoTooltip text={tooltip} />} */}
        </LabelWrapper>
        <Input
          error={!!error}
          name={fieldName}
          type={type || "text"}
          autoComplete="off"
          onChange={onChange}
          value={String(value)}
        />
        <Error>{error ?? ""}</Error>
      </InnerWrapper>
    </Wrapper>
  )
}

export default TextInput
