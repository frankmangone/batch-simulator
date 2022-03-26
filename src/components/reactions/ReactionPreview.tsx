import styled from "styled-components"

/* Components */
import { Fragment } from "react"
import Notice from "../Notice"
import { FiArrowRight, FiPlus } from "react-icons/fi"

/* Hooks */
import useCompounds from "../../hooks/entities/useCompounds"

interface ReactionPreviewProps {
  reaction: Reaction
}

const ReactionPreview: React.FC<ReactionPreviewProps> = (props) => {
  const { reaction } = props
  const { findCompound } = useCompounds()

  return (
    <ReactionPreviewWrapper>
      {reaction.reactants.length === 0 && reaction.products.length === 0 && (
        <Notice>No reaction data</Notice>
      )}

      {reaction.reactants.map((reactionCompound, index) => {
        const compound = findCompound(reactionCompound.compoundId) as Compound

        return (
          <Fragment key={reactionCompound.compoundId}>
            {index !== 0 && <FiPlus size={25} />}
            <CompoundWrapper>
              <p>{reactionCompound.stoichiometricCoefficient}</p>
              <CompoundTile color={compound.color}>
                {compound.symbol}
              </CompoundTile>
            </CompoundWrapper>
          </Fragment>
        )
      })}

      {reaction.reactants.length > 0 && reaction.products.length > 0 && (
        <FiArrowRight size={25} />
      )}

      {reaction.products.map((reactionCompound, index) => {
        const compound = findCompound(reactionCompound.compoundId) as Compound

        return (
          <Fragment key={reactionCompound.compoundId}>
            {index !== 0 && <FiPlus size={25} />}
            <CompoundWrapper>
              <p>{reactionCompound.stoichiometricCoefficient}</p>
              <CompoundTile color={compound.color}>
                {compound.symbol}
              </CompoundTile>
            </CompoundWrapper>
          </Fragment>
        )
      })}
    </ReactionPreviewWrapper>
  )
}

export default ReactionPreview

const ReactionPreviewWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  min-height: 3rem;
`

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
