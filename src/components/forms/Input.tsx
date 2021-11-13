import styled from "styled-components"

interface IInputProps extends React.HTMLProps<HTMLInputElement> {
  errors?: boolean
}

const Input = styled.input<IInputProps>`
  ${(props) =>
    props.errors
      ? `
        border-color: var(--color-triadic-red-darker) !important
      `
      : ""}
`

export default Input
