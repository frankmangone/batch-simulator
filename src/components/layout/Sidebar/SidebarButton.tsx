import styled from "styled-components"

const SidebarButton = styled.div`
  border-radius: 3px;
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
  display: flex;
  justify-content: center;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  margin: 0 10px 10px;

  &:hover {
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 800 })};
  }
`

export default SidebarButton
