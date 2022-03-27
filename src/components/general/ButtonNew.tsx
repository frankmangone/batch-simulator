import styled, { CSSProperties } from "styled-components"

interface ButtonProps {
  style?: CSSProperties
  color?: string
}

const Button = styled.button<ButtonProps>`
  align-items: center;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.h5};
  line-height: ${(props) => props.theme.lineHeights.h5};
  padding: 5px 20px;
  text-decoration: none;

  ${(props) => {
    const { color, theme } = props
    const { getColor } = theme
    let background,
      hoverBackground,
      text = getColor({ name: "baseBlack", shade: 700 })

    switch (color) {
      case "cancel":
        background = getColor("cancel")
        hoverBackground = getColor({ name: "cancel", shade: 800 })
        break
      case "success":
        background = getColor("success")
        hoverBackground = getColor({ name: "success", shade: 800 })
        break
      default:
        background = getColor({ name: "baseBlack", shade: 700 })
        hoverBackground = getColor({ name: "baseBlack", shade: 800 })
        text = getColor({ name: "baseBlack", shade: 100 })
    }

    return `
      background-color: ${background};
      color: ${text};
      
      & > svg {
        fill-color: ${text};
      }

      &:hover {
        background-color: ${hoverBackground};
      }
    `
  }}
`

export default Button
