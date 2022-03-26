import styled from "styled-components"
import { EditIcon, DeleteIcon, RerollIcon } from "../../components/Icons"
import { useTheme } from "../../contexts/Theme"

interface CompoundCardProps {
  compound: Compound
}

interface SymbolProps {
  color: string
}

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 800 })};
  border-radius: 5px;
  box-shadow: 0 0 6px ${(props) => props.theme.getColor("baseBlack")};
  cursor: pointer;
  display: flex;
  flex-basis: 160px;
  flex-direction: column;
  height: 70px;
  margin: 0px 5px 10px;
  overflow: hidden;
  padding: 0px;
  transition: height 0.15s ease-in-out;

  &:hover {
    height: 110px;
  }
`

const Symbol = styled.p<SymbolProps>`
  color: ${(props) => props.color};
  font-family: "Comfortaa", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.h3};
  line-height: ${(props) => props.theme.lineHeights.h3};
  font-weight: 700;
  margin: 16px 16px 0px;
`

const Buttons = styled.div`
  align-self: stretch;
  display: flex;
  height: 30px;
  justify-content: space-between;
  margin: 16px 16px;
`

const CompoundCard: React.FC<CompoundCardProps> = (props) => {
  const { compound } = props
  const { symbol, color } = compound

  const { getColor } = useTheme()
  const white = getColor({ name: "baseBlack", shade: 500 })

  return (
    <Wrapper>
      <Symbol color={color}>{symbol}</Symbol>
      <Buttons>
        <RerollIcon color={white} />
        <EditIcon color={white} />
        <DeleteIcon color={white} />
      </Buttons>
    </Wrapper>
  )
}

export default CompoundCard
