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
  nested?: boolean // For text inputs inside cards
  value: T
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface NestedProp {
  nested: boolean
}

const Wrapper = styled.fieldset<NestedProp>`
  display: flex;
  flex-direction: column;
  ${(props) => (props.nested ? "align-self: stretch;" : "flex-basis: 33.3%;")};
  border: none;
  padding: 0;
  margin: 0;
`

const InnerWrapper = styled.div<NestedProp>`
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

const TextInput = <T extends unknown>(props: FieldInputProps<T>) => {
  const {
    error,
    label,
    fieldName,
    // tooltip,
    type,
    nested = false,
    value,
    onChange,
  } = props

  return (
    <Wrapper nested={nested}>
      <InnerWrapper nested={nested}>
        <LabelWrapper nested={nested}>
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
