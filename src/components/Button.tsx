import styled from "styled-components"

interface IButton {
  color?: string
  buttonStyle?: string
}

const Button = styled.button<IButton>`
  align-items: center;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: 1.1rem;
  justify-content: space-between;
  padding: 5px 10px;
  text-decoration: none;

  ${(props) => colorsBase(props.color)}

  &:hover {
    ${(props) => colorsHover(props.color)}
  }

  /* Any additional custom styles */
  ${(props) => props.buttonStyle ?? ""}
`

export default Button

const colorsBase = (color?: string) => {
  switch (color) {
    case "red":
      return `
        background-color: var(--color-triadic-red-dark);
        color: var(--color-grey-lightest);
      `
    case "green":
      return `
        background-color: var(--color-triadic-green-dark);
        color: var(--color-grey-lightest);
      `
    case "grey":
      return `
        background-color: var(--color-grey-dark);
        color: var(--color-grey-lightest);
      `
    default:
      return `
        background-color: var(--color-primary-dark);
        color: var(--color-grey-lightest);
      `
  }
}

const colorsHover = (color?: string) => {
  switch (color) {
    case "red":
      return `
        background-color: var(--color-triadic-red-darker);
      `
    case "green":
      return `
        background-color: var(--color-triadic-green-darker);
      `
    case "grey":
      return `
        background-color: var(--color-grey-darker);
      `
    default:
      return `
        background-color: var(--color-primary-darker);
      `
  }
}
