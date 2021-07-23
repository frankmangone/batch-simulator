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
          <Link to="/compounds">
            <p>Compounds</p>
            <FiChevronRight />
          </Link>
          <Link to="/reactions">
            <p>Reactions</p>
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
      background-color: var(--color-grey-light);
      border-radius: 5px;
      color: var(--color-grey-lightest);
      display: flex;
      font-size: 1.2rem;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 5px 10px;
      text-decoration: none;

      &:hover {
        background-color: var(--color-grey-dark);
      }

      p {
        margin: 0;
      }
    }
  }
`

const MainContent = styled.div`
  background: var(--color-grey-light);
  border-radius: 5px;
  flex-basis: 600px;
  padding: 20px;
  position: relative;
  overflow: hidden;
`
