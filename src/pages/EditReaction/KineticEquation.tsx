import styled from "styled-components"
import Equation from "@components/math/Equation"

interface KineticEquationProps {
  tokens: Token[]
}

const EquationWrapper = styled.div`
  display: flex;
  flex-basis: 100%;
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
