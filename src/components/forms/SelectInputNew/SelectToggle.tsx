import styled from "styled-components"

interface SelectToggleProps {
  error: boolean
}

const SelectToggle = styled.div<SelectToggleProps>`
  align-items: center;
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border: 1px solid
    ${(props) =>
      props.error
        ? props.theme.getColor("cancel")
        : props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border-radius: 5px;
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 200 })};
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  font-family: "Mulish", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.p};
  font-weight: 600;
  line-height: ${(props) => props.theme.lineHeights.p};
  outline: none;
  padding: 10px;

  p {
    margin: 0;
    flex: 1;
  }

  path {
    fill: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 200 })};
  }
`

export default SelectToggle
