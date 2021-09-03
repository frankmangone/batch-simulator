import styled from "styled-components"
import { FiX } from "react-icons/fi"

interface SidebarOptionsProps {
  optionsVisible: boolean
  toggleOptionsVisible: () => void
}

const SidebarOptions = (props: SidebarOptionsProps) => {
  const { optionsVisible, toggleOptionsVisible } = props

  return (
    <SidebarOptionsWrapper visible={optionsVisible}>
      <CloseButton onClick={toggleOptionsVisible}>
        <FiX size={20} />
      </CloseButton>
    </SidebarOptionsWrapper>
  )
}

export default SidebarOptions

interface SidebarWrapperProps {
  visible: boolean
}

const SidebarOptionsWrapper = styled.div<SidebarWrapperProps>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  transform: ${(props) =>
    props.visible ? "translateX(0px)" : "translateX(300px)"};
  background-color: var(--color-grey-lighter);
  transition: all 0.15s ease-in-out;
  box-shadow: ${(props) =>
    props.visible ? "0 0 20px -5px var(--color-grey-normal)" : "unset"};
  /* ${(props) =>
    props.visible ? "0 0 15px -2px var(--color-grey-normal)" : ""} */
`

const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
