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

interface ISidebarLinkProps {
  route: string
  title: string
  icon: JSX.Element
}

const Sidebar: React.FC = () => {
  const { simulate } = useSimulate()
  const { simulationResults } = useData()
  const history = useHistory()

  const onSimulate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    simulate()
    history.push("/results")
  }

  const iconProps = {
    size: 25,
  }

  return (
    <SidebarWrapper>
      {/* <Reactor /> */}
      <nav>
        <SidebarLink
          route="/compounds"
          title="Compounds"
          icon={<BiAtom {...iconProps} />}
        />
        <SidebarLink
          route="/reactions"
          title="Reactions"
          icon={<AiOutlineExperiment {...iconProps} />}
        />
        <SidebarLink
          route="/operation"
          title="Operation"
          icon={<FiSliders {...iconProps} />}
        />
        {simulationResults && (
          <SidebarLink
            route="/results"
            title="Results"
            icon={<BiLineChart {...iconProps} />}
          />
        )}
        <a href="/" onClick={onSimulate}>
          <SidebarLinkWrapper>
            <FiPlay {...iconProps} />
          </SidebarLinkWrapper>
        </a>
      </nav>
    </SidebarWrapper>
  )
}

export default Sidebar

const SidebarLink: React.FC<ISidebarLinkProps> = (props) => {
  const { icon, route, title } = props
  return (
    <Link to={route}>
      <SidebarLinkWrapper>
        {icon}
        {/* <p>{title}</p>
      <FiChevronRight /> */}
      </SidebarLinkWrapper>
    </Link>
  )
}

const SidebarLinkWrapper = styled.div`
  padding: 0.7rem 0.5rem;
  display: flex;
  align-items: center;
`

const SidebarWrapper = styled.div`
  height: 100%;
  flex-shrink: 0;
  margin-right: 20px;

  nav {
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--color-grey-normal);

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
        background-color: rgba(255, 255, 255, 0.3);
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
