import styled from "styled-components"
import { Link } from "react-router-dom"

/* Components */
import { FiChevronRight } from "react-icons/fi"
import Reactor from "../components/Reactor"

interface IProps {
  children: JSX.Element | JSX.Element[]
}

const MainLayout: React.FC<IProps> = (props) => {
  const { children } = props
  return (
    <MainLayoutWrapper>
      <SideContent>
        <Reactor />
        <nav>
          <Link to="/inputs">
            <p>Inputs</p>
            <FiChevronRight />
          </Link>
          <Link to="/model">
            <p>Model</p>
            <FiChevronRight />
          </Link>
          <Link to="/results">
            <p>Results</p>
            <FiChevronRight />
          </Link>
        </nav>
      </SideContent>
      <MainContent>{children}</MainContent>
    </MainLayoutWrapper>
  )
}

export default MainLayout

const MainLayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 20px;
  margin-right: 20px;
`

const SideContent = styled.div`
  flex-basis: 180px;
  margin-right: 20px;

  nav {
    display: flex;
    flex-direction: column;

    a {
      align-items: center;
      background: linear-gradient(145deg, #2e3135 24.15%, #26282b 73.55%);
      border: 1px solid #292c30;
      border-radius: 10px;
      box-shadow: -6px -6px 8px #2e3135, 6px 6px 8px #151618;
      color: #a8adb0;
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      padding: 5px 10px;
      text-decoration: none;

      p {
        margin: 0;
      }
    }
  }
`

const MainContent = styled.div`
  background: linear-gradient(145deg, #34383e 24.15%, #26282b 73.55%);
  border: 1px solid #292c30;
  border-radius: 10px;
  box-shadow: -6px -6px 8px #2e3135, 6px 6px 8px #151618;
  flex-basis: 600px;
  padding: 20px;
`
