import styled from "styled-components"

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean
}

const Input = styled.input<InputProps>`
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border: 1px solid
    ${(props) =>
      props.error
        ? props.theme.getColor("cancel")
        : props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border-radius: 5px;
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 200 })};
  flex-grow: 1;
  font-family: "Mulish", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.p};
  font-weight: 600;
  line-height: ${(props) => props.theme.lineHeights.p};
  outline: none;
  padding: 10px;

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
`

export default Input
