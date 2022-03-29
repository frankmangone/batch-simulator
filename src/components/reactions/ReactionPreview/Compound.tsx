import styled from "styled-components"
import { AddIcon } from "../../Icons"
import useCompounds from "../../../hooks/entities/useCompounds"

interface CompoundProps {
  index: number
  reactionCompound: ReactionCompound
}

const Compound: React.VFC<CompoundProps> = (props) => {
  const { index, reactionCompound } = props
  const { compoundId, stoichiometricCoefficient } = reactionCompound
  const { findCompound } = useCompounds()

  const compound = findCompound(compoundId) as Compound
  const { color, symbol } = compound

  return (
    <>
      {index !== 0 && <AddIcon color="#FFF" size={25} />}
      <Wrapper>
        <Coefficient>{stoichiometricCoefficient}</Coefficient>
        <Symbol color={color}>{symbol}</Symbol>
      </Wrapper>
    </>
  )
}

export default Compound

const Wrapper = styled.div`
  align-items: flex-end;
  display: flex;
  margin: 0 0.5rem;
`

interface SymbolProps {
  color: string
}

const Symbol = styled.p<SymbolProps>`
  color: ${(props) => props.color};
  font-family: "Comfortaa", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: 600;
  line-height: ${(props) => props.theme.lineHeights.h2};
  margin: 0;
`

const Coefficient = styled.p`
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 100 })};
  font-family: "Comfortaa", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.h3};
  font-weight: 600;
  line-height: ${(props) => props.theme.lineHeights.h3};
  margin: 0;
  margin-right: 10px;
`
