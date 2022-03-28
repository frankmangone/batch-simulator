import styled from "styled-components"
import {
  CompoundIcon,
  ReactionIcon,
  PhaseIcon,
  SettingsIcon,
  RunIcon,
} from "../../Icons"
import SidebarButton from "./SidebarButton"
import { useTheme } from "../../../contexts/Theme"
// import { useNavigate } from "react-router-dom"
// import useSimulate from "../../../hooks/useSimulate"
// import useSimulationResults from "../../../hooks/useSimulationResults"
// import { useState } from "react"

const Wrapper = styled.nav`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 80px;
  padding-top: 20px;
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
`

const Sidebar: React.FC = () => {
  const { getColor } = useTheme()
  const color = getColor({ name: "baseBlack", shade: 200 })

  // const { simulate } = useSimulate()
  // const { simulationResults } = useSimulationResults()
  // const navigate = useNavigate()
  // const [expanded, setExpanded] = useState<boolean>(false)

  // const onSimulate = (event: React.MouseEvent<HTMLAnchorElement>) => {
  //   event.preventDefault()
  //   simulate()
  //   navigate("/results")
  // }

  // const expandMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()
  //   setExpanded(!expanded)
  // }

  // const navigateTo = (route: string) => {
  //   navigate(route)
  //   setExpanded(false)
  // }

  return (
    <Wrapper>
      <SidebarButton>
        <CompoundIcon color={color} />
      </SidebarButton>
      <SidebarButton>
        <ReactionIcon color={color} />
      </SidebarButton>
      <SidebarButton>
        <PhaseIcon color={color} />
      </SidebarButton>
      <SidebarButton>
        <SettingsIcon color={color} />
      </SidebarButton>
      <SidebarButton>
        <RunIcon color={color} />
      </SidebarButton>
    </Wrapper>
  )
}

export default Sidebar
