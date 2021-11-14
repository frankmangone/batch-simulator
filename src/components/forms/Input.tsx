import styled from "styled-components"

interface IInputProps extends React.HTMLProps<HTMLInputElement> {
  errors?: boolean
  transparent?: boolean
}

const Input = styled.input<IInputProps>`
  background-color: var(--color-grey-lightest);
  border: 1px solid var(--color-grey-normal);
  border-radius: 5px;
  flex-grow: 1;
  font-family: "Mulish", sans-serif;
  min-width: 0;
  width: 0;
  outline: none;
  padding: 0.5rem 1rem;
  color: var(--color-grey-dark);

  &:autofill {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
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

  /** Overrides */
  ${(props) =>
    props.transparent
      ? `
      background-color: rgba(255,255,255,0.2);
      border-color: hsla(213, 20%, 15%, 0.5);
      color: var(--color-grey-darker);

      &:focus {
        border-color: var(--color-grey-darker);
        background-color: rgba(255,255,255,0.5);
      }
      `
      : ""}
  ${(props) =>
    props.errors
      ? `
        border-color: var(--color-triadic-red-darker) !important
      `
      : ""}
`

export default Input
