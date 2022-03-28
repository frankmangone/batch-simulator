import { useState } from "react"
import styled from "styled-components"

interface SidebarButtonProps {
  text: string
  onClick: () => void
}

const Wrapper = styled.div`
  border-radius: 3px;
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  margin: 0 10px 10px;

  p {
    color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 100 })};
    font-family: "Comfortaa", sans-serif;
    font-size: ${(props) => props.theme.fontSizes.p};
    font-weight: 600;
    line-height: ${(props) => props.theme.lineHeights.p};
    margin-bottom: 0;
    margin-top: 4px;
    margin-left: 15px;
  }

  &:hover {
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 800 })};
  }
`
const SidebarButton: React.FC<SidebarButtonProps> = (props) => {
  const { children, text, onClick } = props
  const [showText, setShowText] = useState<boolean>()

  const handleMouseEnter = () => setShowText(true)
  const handleMouseLeave = () => setShowText(false)

  return (
    <Wrapper
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showText && <p>{text}</p>}
    </Wrapper>
  )
}

export default SidebarButton
