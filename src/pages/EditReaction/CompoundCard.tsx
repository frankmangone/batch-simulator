import styled from "styled-components"
import CardButton from "./CardButton"
import { DeleteIcon } from "../../components/Icons"
import { useMemo } from "react"
import useCompounds from "../../hooks/entities/useCompounds"

interface CompoundCardProps {
  compound: ReactionCompound
}

interface SymbolProps {
  color: string
}

const Symbol = styled.p<SymbolProps>`
  align-self: flex-start;
  color: ${(props) => props.color};
  font-family: "Comfortaa", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.h3};
  line-height: ${(props) => props.theme.lineHeights.h3};
  font-weight: 700;
  margin: 22px 16px 0px;
  transition: all 0.15s ease-in-out;
`

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border-radius: 5px;
  box-shadow: 0 0 6px
    ${(props) => props.theme.getColor({ name: "baseBlack", shade: 800 })};
  cursor: pointer;
  display: flex;
  flex-basis: 180px;
  flex-shrink: 0;
  flex-direction: column;
  height: 100px;
  margin: 0px 5px 10px;
  padding: 0px;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 800 })};
  }
`

const CompoundCard: React.VFC<CompoundCardProps> = (props) => {
  const { compound: reactionCompound } = props
  const { compoundId, stoichiometricCoefficient } = reactionCompound

  const { findCompound } = useCompounds()
  const compound = useMemo(() => findCompound(compoundId), []) // eslint-disable-line
  const { symbol, color } = (compound as Compound) ?? {}

  return (
    <Wrapper>
      <CardButton Icon={DeleteIcon} onClick={() => null} />
      <Symbol color={color}>{symbol}</Symbol>
      {stoichiometricCoefficient}
    </Wrapper>
  )
}

export default CompoundCard
