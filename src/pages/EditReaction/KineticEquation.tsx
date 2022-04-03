import styled from "styled-components"
import Equation from "@components/math/Equation"

interface KineticEquationProps {
  tokens: Token[]
}

const EquationWrapper = styled.div`
  align-items: center;
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 200 })};
  display: flex;
  flex-basis: 100%;
  font-family: "Comfortaa", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.h3};
  line-height: ${(props) => props.theme.lineHeights.h3};
  justify-content: center;
  margin: 40px 0;
`

const KineticEquation: React.VFC<KineticEquationProps> = (props) => {
  const { tokens } = props

  return (
    <EquationWrapper>
      <Equation tokenizedEquation={tokens} />
    </EquationWrapper>
  )
}

export default KineticEquation
