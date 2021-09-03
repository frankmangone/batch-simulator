import styled from "styled-components"

interface SidebarOptionsProps {
  optionsVisible: boolean
  toggleOptionsVisible: () => void
}

const SidebarOptions = (props: SidebarOptionsProps) => {
  const { optionsVisible, toggleOptionsVisible } = props

  return <SidebarOptionsWrapper>TEST</SidebarOptionsWrapper>
}

export default SidebarOptions

const SidebarOptionsWrapper = styled.div`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: var(--color-grey-lighter);
`
