import React from "react"
import styled from "styled-components"
import { useTheme } from "@contexts/Theme"

interface CardButtonProps {
  Icon: React.VFC<any>
  onClick: () => void
}

const Button = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  margin-left: 5px;
  transition: background 0.15s linear;

  &:hover {
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 600 })};
  }
`

const CardButton: React.VFC<CardButtonProps> = (props) => {
  const { Icon, onClick } = props
  const { getColor } = useTheme()
  const white = getColor({ name: "baseBlack", shade: 400 })

  return (
    <Button onClick={onClick}>
      <Icon color={white} size={25} style={{ margin: 5 }} />
    </Button>
  )
}

export default CardButton
