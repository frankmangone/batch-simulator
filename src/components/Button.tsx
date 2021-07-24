import styled from "styled-components"

interface IButton {
  color?: string
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
`

export default Button

const colorsBase = (color?: string) => {
  switch (color) {
    case "green":
      return `
        background-color: var(--color-triadic-green-normal);
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
    case "green":
      return `
        background-color: var(--color-triadic-green-dark);
      `
    default:
      return `
        background-color: var(--color-primary-darker);
      `
  }
}
