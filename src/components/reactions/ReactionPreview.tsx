import styled from "styled-components"

/* Components */
import Notice from "../Notice"
import { FiArrowRight, FiPlus } from "react-icons/fi"

/* Constants */
import { COMPOUND_COLORS } from "../../constants/compoundColors"

/* Hooks */
import { useData } from "../../context/DataContext"

/* Types */
import { ICompound } from "../../types/Compound"
import { IReaction } from "../../types/Reaction"

interface IReactionPreviewProps {
  reaction: IReaction
}

const ReactionPreview: React.FC<IReactionPreviewProps> = (props) => {
  const { reaction } = props
  const { compounds } = useData()

  return (
    <ReactionPreviewWrapper>
      {reaction.reactants.length === 0 && reaction.products.length === 0 && (
        <Notice>No reaction data</Notice>
      )}

      {reaction.reactants.map((reactionCompound, index) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound

        return (
          <>
            {index !== 0 && <FiPlus />}
            <CompoundWrapper>
              <p>{reactionCompound.stoichiometricCoefficient}</p>
              <CompoundTile
                color={compound.color as keyof typeof COMPOUND_COLORS}
              >
                {compound.symbol}
              </CompoundTile>
            </CompoundWrapper>
          </>
        )
      })}

      {reaction.reactants.length > 0 && reaction.products.length > 0 && (
        <FiArrowRight />
      )}

      {reaction.products.map((reactionCompound, index) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound

        return (
          <>
            {index !== 0 && <FiPlus />}
            <CompoundWrapper>
              <p>{reactionCompound.stoichiometricCoefficient}</p>
              <CompoundTile
                color={compound.color as keyof typeof COMPOUND_COLORS}
              >
                {compound.symbol}
              </CompoundTile>
            </CompoundWrapper>
          </>
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
`

const CompoundWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  margin: 0 0.5rem;

  p {
    color: var(--color-grey-dark);
    font-size: 1.4rem;
    margin: 0 0 0.2rem 0;
  }
`

interface ICompoundColorBulletProps {
  color: keyof typeof COMPOUND_COLORS
}

const CompoundTile = styled.div<ICompoundColorBulletProps>`
  background-color: ${(props) => COMPOUND_COLORS[props.color]};
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  color: var(--color-grey-dark);
  font-size: 1.6rem;
  margin: 0 0.5rem;
  padding: 0.5rem 0.9rem;
`
