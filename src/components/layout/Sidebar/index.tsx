import styled from "styled-components"
import {
  CompoundIcon,
  ReactionIcon,
  PhaseIcon,
  SettingsIcon,
  RunIcon,
} from "@components/Icons"
import SidebarButton from "./SidebarButton"
import { useTheme } from "@contexts/Theme"
import { useNavigate } from "react-router-dom"
// import useSimulate from "../../../hooks/useSimulate"
// import useSimulationResults from "../../../hooks/useSimulationResults"

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  const navigate = useNavigate()

  // const onSimulate = (event: React.MouseEvent<HTMLAnchorElement>) => {
  //   event.preventDefault()
  //   simulate()
  //   navigate("/results")
  // }

  const navigateTo = (route: string) => {
    navigate(route)
  }

  return (
    <Wrapper>
      <SidebarButton onClick={() => navigateTo("/compounds")} text="Compounds">
        <CompoundIcon color={color} />
      </SidebarButton>
      <SidebarButton onClick={() => navigateTo("/reactions")} text="Reactions">
        <ReactionIcon color={color} />
      </SidebarButton>
      <SidebarButton onClick={() => null} text="Phases">
        <PhaseIcon color={color} />
      </SidebarButton>
      <SidebarButton onClick={() => navigateTo("/settings")} text="Settings">
        <SettingsIcon color={color} />
      </SidebarButton>
      <SidebarButton onClick={() => null} text="Simulate">
        <RunIcon color={color} />
      </SidebarButton>
    </Wrapper>
  )
}

export default Sidebar
