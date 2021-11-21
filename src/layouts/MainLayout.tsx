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
  @media screen and (max-width: 750px) {
    margin-left: 0;
    padding-top: 80px;
    height: calc(100vh - 80px);
  }
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
`
const MainContent = styled.div`
  margin: 20px;
  min-height: calc(100% - 40px);
`
