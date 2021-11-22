import React from "react"
import styled from "styled-components"
import { FaCheck } from "react-icons/fa"

interface CheckboxWrapperProps {
  toggled: boolean
}

type CheckboxProps = {
  onToggle: () => void
} & CheckboxWrapperProps

const Checkbox: React.VFC<CheckboxProps> = (props) => {
  const { toggled, onToggle } = props

  return (
    <CheckboxWrapper onClick={onToggle} toggled={toggled}>
      {toggled && <FaCheck size={10} />}
    </CheckboxWrapper>
  )
}

const CheckboxWrapper = styled.div<CheckboxWrapperProps>`
  width: 0.8rem;
  height: 0.8rem;
  border: 2px solid var(--color-grey-normal);
  background-color: ${(props) =>
    props.toggled ? "var(--color-grey-normal)" : "var(--color-grey-lightest)"};
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;

  svg {
    fill: var(--color-grey-lightest);
  }
`

export default Checkbox
