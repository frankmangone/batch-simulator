import styled from "styled-components"
import Subindex from "@components/math/Subindex"
import Equation from "@components/math/Equation"
import useCompounds from "@hooks/entities/useCompounds"

interface KineticEquationProps {
  tokens: Token[]
  keyCompound?: string
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
  margin: 50px 0 30px;
`

const KineticEquation: React.VFC<KineticEquationProps> = (props) => {
  const { tokens, keyCompound } = props
  const { findCompound } = useCompounds()

  const compound = findCompound(keyCompound)
  const keyCompoundSymbol: string | undefined = compound?.symbol ?? undefined

  return (
    <EquationWrapper>
      {keyCompoundSymbol && (
        <>
          <Subindex base="r" subindex={keyCompoundSymbol} />
          &nbsp;=&nbsp;
        </>
      )}
      <Equation tokenizedEquation={tokens} />
    </EquationWrapper>
  )
}

export default KineticEquation
