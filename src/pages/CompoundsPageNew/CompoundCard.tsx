import styled from "styled-components"

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
  flex-basis: 100px;
  flex-direction: column;
  height: 70px;
  margin: 0px 5px 10px;
  overflow: hidden;
  padding: 0px 30px;
  transition: height 0.15s ease-in-out;

  &:hover {
    height: 100px;
  }
`

const Symbol = styled.p<SymbolProps>`
  color: ${(props) => props.color};
  font-family: "Comfortaa", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.h3};
  line-height: ${(props) => props.theme.lineHeights.h3};
  font-weight: 700;
  margin: 0;
  margin-top: 16px;
`

const Buttons = styled.div`
  margin-top: 16px;
  height: 30px;
`

const CompoundCard: React.FC<CompoundCardProps> = (props) => {
  const { compound } = props
  const { symbol, color } = compound

  return (
    <Wrapper>
      <Symbol color={color}>{symbol}</Symbol>
      <Buttons>asdasdasd</Buttons>
    </Wrapper>
  )
}

export default CompoundCard
