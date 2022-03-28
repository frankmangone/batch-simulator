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
      <CompoundWrapper>
        <p>{stoichiometricCoefficient}</p>
        <CompoundTile color={color}>{symbol}</CompoundTile>
      </CompoundWrapper>
    </>
  )
}

export default Compound

const CompoundWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  margin: 0 0.5rem;

  p {
    color: var(--color-grey-dark);
    font-size: 1.6rem;
    margin: 0 0 0.2rem 0;
  }
`

interface CompoundColorBulletProps {
  color: string
}

const CompoundTile = styled.div<CompoundColorBulletProps>`
  background-color: ${(props) => props.color};
  border-radius: 5px;
  border: 1px solid var(--color-grey-normal);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
  color: var(--color-grey-dark);
  font-size: 1.6rem;
  margin: 0 0.5rem;
  padding: 0.5rem 0.9rem;
`
