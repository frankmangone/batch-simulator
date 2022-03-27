import styled from "styled-components"

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  errors?: boolean
}

const Input = styled.input<InputProps>`
  background-color: var(--color-grey-lightest);
  border: 1px solid var(--color-grey-normal);
  border-radius: 5px;
  flex-grow: 1;
  font-family: "Mulish", sans-serif;
  min-width: 0;
  width: 0;
  outline: none;
  padding: 10px;
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 100 })};

  &:autofill {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    /* box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15); */
  }

  /**
   * Remove arrows from number inputs
   */

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  ${(props) =>
    props.errors
      ? `
        border-color: ${props.theme.getColor("cancel")};
      `
      : ""}
`

export default Input
