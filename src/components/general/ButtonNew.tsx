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
      shadow,
      hoverBackground,
      text = getColor({ name: "baseBlack", shade: 700 })

    switch (color) {
      case "cancel":
        background = getColor("cancel")
        shadow = getColor({ name: "cancel", opacity: 80 })
        hoverBackground = getColor({ name: "cancel", shade: 800 })
        break
      case "success":
        background = getColor("success")
        shadow = getColor({ name: "success", opacity: 80 })
        hoverBackground = getColor({ name: "success", shade: 800 })
        break
      case "white":
        background = getColor({ name: "baseBlack", shade: 200 })
        hoverBackground = getColor({ name: "baseBlack", shade: 100 })
        shadow = getColor({ name: "baseBlack", shade: 100, opacity: 60 })
        text = getColor({ name: "baseBlack", shade: 700 })
        break
      default:
        background = getColor({ name: "baseBlack", shade: 700 })
        hoverBackground = getColor({ name: "baseBlack", shade: 800 })
        shadow = getColor({ name: "baseBlack", shade: 800, opacity: 80 })
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
        box-shadow: 0 0 8px ${shadow};
      }
    `
  }}
`

export default Button
