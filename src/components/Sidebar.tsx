import styled from "styled-components"
import { useHistory } from "react-router-dom"

/* Components */
import Button from "./Button"
import { FiMenu, FiSliders, FiPlay } from "react-icons/fi"
import { BiAtom, BiLineChart } from "react-icons/bi"
import { AiOutlineExperiment } from "react-icons/ai"

/* Hooks */
import useSimulate from "../hooks/useSimulate"
import { useData } from "../context/DataContext"
import { useState } from "react"

interface ISidebarLinkProps {
  onClick: () => void
  title: string
  icon: JSX.Element
}

const Sidebar: React.FC = () => {
  const { simulate } = useSimulate()
  const { simulationResults } = useData()
  const history = useHistory()
  const [expanded, setExpanded] = useState<boolean>(false)

  const onSimulate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    simulate()
    history.push("/results")
  }

  const expandMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
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
        <a href="/" onClick={expandMenu}>
          <SidebarLinkWrapper>
            <IconWrapper>
              <FiMenu {...iconProps} />
            </IconWrapper>
          </SidebarLinkWrapper>
        </a>
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
          onClick={() => navigateTo("/operation")}
          title="Operation"
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
`

interface SidebarWrapperProps {
  expanded: boolean
}

const SidebarWrapper = styled.div<SidebarWrapperProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  height: 100%;
  max-width: ${(props) => (props.expanded ? "270px" : "90px")};
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 20px;
  transition: all 0.15s linear;

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
`
