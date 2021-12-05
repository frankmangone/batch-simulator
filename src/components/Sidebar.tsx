import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { mobileBreakpoint } from "../lib/breakpoints"

/* Components */
import Button from "./Button"
import { FiMenu, FiSliders, FiPlay } from "react-icons/fi"
import { BiAtom, BiLineChart } from "react-icons/bi"
import { AiOutlineExperiment } from "react-icons/ai"

/* Hooks */
import useSimulate from "../hooks/useSimulate"
import useSimulationResults from "../hooks/useSimulationResults"
import { useState } from "react"

interface ISidebarLinkProps {
  onClick: () => void
  title: string
  icon: JSX.Element
}

const Sidebar: React.FC = () => {
  const { simulate } = useSimulate()
  const { simulationResults } = useSimulationResults()
  const history = useHistory()
  const [expanded, setExpanded] = useState<boolean>(false)

  const onSimulate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    simulate()
    history.push("/results")
  }

  const expandMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setExpanded(!expanded)
  }

  const navigateTo = (route: string) => {
    history.push(route)
    setExpanded(false)
  }

  const iconProps = {
    size: 25,
  }

  return (
    <SidebarWrapper expanded={expanded}>
      <nav>
        <button onClick={expandMenu} id="hamburger">
          <SidebarLinkWrapper>
            <IconWrapper>
              <FiMenu {...iconProps} />
            </IconWrapper>
          </SidebarLinkWrapper>
        </button>
        <SidebarLink
          onClick={() => navigateTo("/compounds")}
          title="Compounds"
          icon={<BiAtom {...iconProps} />}
        />
        <SidebarLink
          onClick={() => navigateTo("/reactions")}
          title="Reactions"
          icon={<AiOutlineExperiment {...iconProps} />}
        />
        <SidebarLink
          onClick={() => navigateTo("/settings")}
          title="Settings"
          icon={<FiSliders {...iconProps} />}
        />
        {simulationResults && (
          <SidebarLink
            onClick={() => navigateTo("/results")}
            title="Results"
            icon={<BiLineChart {...iconProps} />}
          />
        )}
        <a href="/" onClick={onSimulate}>
          <SidebarLinkWrapper>
            <IconWrapper>
              <FiPlay {...iconProps} />
            </IconWrapper>
            <p>Simulate</p>
          </SidebarLinkWrapper>
        </a>
      </nav>
    </SidebarWrapper>
  )
}

export default Sidebar

const SidebarLink: React.FC<ISidebarLinkProps> = (props) => {
  const { icon, onClick, title } = props
  return (
    <Button onClick={onClick}>
      <SidebarLinkWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <p>{title}</p>
        {/* <FiChevronRight /> */}
      </SidebarLinkWrapper>
    </Button>
  )
}

const SidebarLinkWrapper = styled.div`
  padding: 0.7rem 0.5rem;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const IconWrapper = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 0.5rem;
  @media only screen and (max-width: ${mobileBreakpoint}px) {
    margin-right: 0;
  }
`

interface SidebarWrapperProps {
  expanded: boolean
}

const SidebarWrapper = styled.div<SidebarWrapperProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  height: 100vh;
  max-width: ${(props) => (props.expanded ? "270px" : "90px")};
  @media screen and (max-width: ${mobileBreakpoint}px) {
    height: 80px;
    width: 100vw;
    max-width: 100vw;
    position: fixed;
  }
  flex-grow: 0;
  flex-shrink: 0;
  transition: all 0.15s linear;
  background-color: var(--color-grey-normal);

  nav {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: ${mobileBreakpoint}px) {
      flex-direction: row;
      margin: 0 1rem;
      align-items: center;
      height: 100%;
    }

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

      @media screen and (max-width: ${mobileBreakpoint}px) {
        margin-bottom: 0;

        p {
          display: none;
        }
      }
    }
  }

  @media screen and (max-width: ${mobileBreakpoint}px) {
    #hamburger {
      display: none;
    }
  }
`
