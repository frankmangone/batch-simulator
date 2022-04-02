import styled from "styled-components"
import { SelectPosition } from "./useSelect"

interface SelectBodyProps {
  position: SelectPosition
}

const SelectBody = styled.div<SelectBodyProps>`
  position: absolute;
  left: 10px;
  ${(props) =>
    props.position === SelectPosition.top
      ? `
        bottom: 55px;
      `
      : `
        bottom: 0;
        transform: translateY(100%);
    `}
  width: calc(100% - 32px);
  margin-top: -5px;
  margin-bottom: -5px;

  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border: 1px solid
    ${(props) => props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border-radius: 5px;
  box-shadow: 0 0 6px
    ${(props) => props.theme.getColor({ name: "baseBlack", shade: 900 })};
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 200 })};
  display: flex;
  flex-direction: column;
  outline: none;
  padding: 10px;
  z-index: 5;

  button {
    background-color: transparent;
    border: none;
    border-radius: 5px;
    color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 200 })};
    cursor: pointer;
    margin-bottom: 4px;
    padding: 6px 10px;
    font-family: "Mulish", sans-serif;
    font-size: ${(props) => props.theme.fontSizes.p};
    font-weight: 600;
    line-height: ${(props) => props.theme.lineHeights.p};
    text-align: left;

    &:hover {
      background-color: ${(props) =>
        props.theme.getColor({ name: "baseBlack", shade: 600 })};
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`

export default SelectBody
