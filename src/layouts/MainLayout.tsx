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
      <MainContent>{children}</MainContent>
    </MainLayoutWrapper>
  )
}

export default MainLayout

const MainLayoutWrapper = styled.div`
  height: 100vh;
  background: var(--color-grey-light);
`

const MainContent = styled.div`
  flex-grow: 1;
  height: 100vh;
  margin-left: 90px;
  padding: 20px;
  position: relative;
`
