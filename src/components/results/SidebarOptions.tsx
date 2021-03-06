import styled from "styled-components"
import { FiX } from "react-icons/fi"
import { mobileBreakpoint } from "../../lib/breakpoints"
import VariableCheckboxes from "./VariableCheckboxes"
import type { Dispatch, SetStateAction } from "react"

interface SidebarOptionsProps {
  optionsVisible: boolean
  toggleOptionsVisible: () => void
  selectedVariables: number[]
  setSelectedVariables: Dispatch<SetStateAction<number[]>>
  temperatureSelected: boolean
  setTemperatureSelected: Dispatch<SetStateAction<boolean>>
}

const SidebarOptions = (props: SidebarOptionsProps) => {
  const {
    optionsVisible,
    toggleOptionsVisible,
    selectedVariables,
    setSelectedVariables,
    temperatureSelected,
    setTemperatureSelected,
  } = props

  return (
    <SidebarOptionsWrapper visible={optionsVisible}>
      <CloseButton onClick={toggleOptionsVisible}>
        <FiX size={20} color="#FFF" />
      </CloseButton>
      <h3>Variables</h3>
      <VariableCheckboxes
        {...{
          selectedVariables,
          setSelectedVariables,
          temperatureSelected,
          setTemperatureSelected,
        }}
      />
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
  width: calc(250px - 2rem);
  padding: 1rem;
  padding-top: 2rem;
  transform: ${(props) =>
    props.visible ? "translateX(0px)" : "translateX(300px)"};
  background-color: var(--color-grey-dark);
  transition: all 0.15s ease-in-out;
  box-shadow: ${(props) =>
    props.visible ? "0 0 20px -5px var(--color-grey-dark)" : "unset"};

  @media screen and (max-width: ${mobileBreakpoint}px) {
    top: 80px;
  }

  h3 {
    color: var(--color-grey-lightest);
  }
`

const CloseButton = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
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
