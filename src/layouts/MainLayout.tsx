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
  display: flex;
  height: 100vh;

  @media (max-width: 800px) {
    flex-direction: column;
    margin: 0;
  }
`

const MainContent = styled.div`
  background: var(--color-grey-light);
  border-radius: 5px;
  flex-grow: 1;
  min-height: 600px;
  padding: 20px;
  position: relative;

  @media (max-width: 800px) {
    margin-left: 20px;
    margin-right: 20px;
  }
`
