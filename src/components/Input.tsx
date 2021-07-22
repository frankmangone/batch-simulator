import styled from "styled-components"

interface IInputProps extends React.HTMLProps<HTMLInputElement> {
  errors: boolean
}

const Input = styled.input<IInputProps>`
  ${(props) =>
    props.errors
      ? `
    box-shadow: 0px 0px 4px 1px var(--color-triadic-red-dark),
      inset 0px 0px 0px 1px var(--color-triadic-red-dark) !important;
  `
      : ""}
`

export default Input
