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
    margin: 0;
    margin-top: 4px;
    max-width: 0;
    opacity: 0;
    transition: all 0.15s ease-in-out;
    pointer-events: none;
  }

  path {
    fill: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 400 })};
    transition: fill 0.15s ease-in-out;
  }

  &:hover {
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 800 })};

    & > p {
      max-width: 100px;
      margin-left: 15px;
      opacity: 1;
      pointer-events: all;
    }

    path {
      fill: ${(props) =>
        props.theme.getColor({ name: "baseBlack", shade: 100 })};
    }
  }
`
const SidebarButton: React.FC<SidebarButtonProps> = (props) => {
  const { children, text, onClick } = props

  return (
    <Wrapper onClick={onClick}>
      {children}
      <p>{text}</p>
    </Wrapper>
  )
}

export default SidebarButton
