import React from "react"
import styled from "styled-components"

/* Components */
import Sidebar from "../components/Sidebar"
interface IProps {
  children: JSX.Element | JSX.Element[]
}

const MainLayout: React.FC<IProps> = (props) => {
  const { children } = props

  return (
    <MainLayoutWrapper>
      <Sidebar />
      <MainContentWrapper id="scroll-target">
        <MainContent>{children}</MainContent>
      </MainContentWrapper>
    </MainLayoutWrapper>
  )
}

export default MainLayout

const MainLayoutWrapper = styled.div`
  height: 100vh;
`

const MainContentWrapper = styled.div`
  background: var(--color-grey-light);
  flex-grow: 1;
  height: 100vh;
  margin-left: 90px;
  position: relative;
  overflow-y: scroll;
`
const MainContent = styled.div`
  margin: 20px;
`
