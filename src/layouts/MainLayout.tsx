import styled from "styled-components"
import { Link, useHistory } from "react-router-dom"

/* Components */
import { FiChevronRight, FiSliders, FiPlay } from "react-icons/fi"
import { BiAtom, BiLineChart } from "react-icons/bi"
import { AiOutlineExperiment } from "react-icons/ai"
import Reactor from "../components/Reactor"

/* Hooks */
import useSimulate from "../hooks/useSimulate"
import { useData } from "../context/DataContext"
import React from "react"

interface IProps {
  children: JSX.Element | JSX.Element[]
}

const MainLayout: React.FC<IProps> = (props) => {
  const { children } = props
  const { simulate } = useSimulate()
  const { simulationResults } = useData()
  const history = useHistory()

  const onSimulate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    simulate()
    history.push("/results")
  }

  return (
    <MainLayoutWrapper>
      <SideContent>
        <Reactor />
        <nav>
          <SidebarLink route="/compounds" title="Compounds" icon={<BiAtom />} />
          <SidebarLink
            route="/reactions"
            title="Reactions"
            icon={<AiOutlineExperiment />}
          />
          <SidebarLink
            route="/operation"
            title="Operation"
            icon={<FiSliders />}
          />
          {simulationResults && (
            <SidebarLink
              route="/results"
              title="Results"
              icon={<BiLineChart />}
            />
          )}
          <a href="/" onClick={onSimulate}>
            <FiPlay /> Simulate
          </a>
        </nav>
      </SideContent>
      <MainContent>{children}</MainContent>
    </MainLayoutWrapper>
  )
}

export default MainLayout

interface ISidebarLinkProps {
  route: string
  title: string
  icon: JSX.Element
}

const SidebarLink: React.FC<ISidebarLinkProps> = (props) => {
  const { icon, route, title } = props
  return (
    <Link to={route}>
      {icon}
      <p>{title}</p>
      <FiChevronRight />
    </Link>
  )
}

const MainLayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 20px;
  margin-right: 20px;

  @media (max-width: 800px) {
    flex-direction: column;
    margin: 0;
  }
`

const SideContent = styled.div`
  flex-basis: 180px;
  flex-shrink: 0;
  margin-right: 20px;

  nav {
    display: flex;
    flex-direction: column;

    a,
    button {
      align-items: center;
      background-color: var(--color-grey-normal);
      border: none;
      border-radius: 5px;
      color: var(--color-grey-lightest);
      display: flex;
      font-size: 1.2rem;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 5px 10px;
      text-decoration: none;

      &:hover {
        background-color: var(--color-grey-light);
      }

      p {
        margin: 0;
      }
    }
  }

  @media (max-width: 800px) {
    background-color: var(--color-grey-normal);
    flex-basis: unset;
    margin-bottom: 20px;
    margin-right: 0;

    nav {
      flex-direction: row;
      height: 3rem;

      a,
      button {
        align-items: center;
        align-self: stretch;
        background-color: unset;
        border-radius: unset;
        display: flex;
        margin-bottom: 0;

        p {
          line-height: normal;
        }

        svg {
          display: none;
        }
      }
    }
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
