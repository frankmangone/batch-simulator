import styled from "styled-components"

/* Constants */
import { COMPOUND_COLORS } from "../../constants/compoundColors"

/* Hooks */
import { useData } from "../../context/DataContext"

/* Types */
import { ICompound } from "../../types/Compound"
import { IReactionCompound } from "../../types/Reaction"

interface IReactionCompoundListProps {
  reactionCompounds: IReactionCompound[]
}

const ReactionCompoundList: React.FC<IReactionCompoundListProps> = (props) => {
  const { reactionCompounds } = props
  const { compounds } = useData()

  return (
    <>
      {reactionCompounds.map((reactionCompound) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound
        return (
          <ReactionCompoundCard
            color={compound.color as keyof typeof COMPOUND_COLORS}
            key={reactionCompound.compoundId}
          >
            <h1>{compound.symbol}</h1>
            <input value={reactionCompound.stoichiometricCoefficient} />
          </ReactionCompoundCard>
        )
      })}
    </>
  )
}

export default ReactionCompoundList

interface IReactionCompoundCardProps {
  color: keyof typeof COMPOUND_COLORS
}

const ReactionCompoundCard = styled.div<IReactionCompoundCardProps>`
  margin: 5px;
  padding: 20px;
  position: relative;

  align-items: center;
  animation-name: slide-in;
  animation-timing-function: ease-in-out;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  background-color: ${(props) => COMPOUND_COLORS[props.color]};
  border-radius: 5px;
  color: var(--color-grey-dark);
  display: flex;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    & {
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
  }

  h1 {
    flex-grow: 1;
    font-size: 1.8rem;
    margin: 0;
  }

  input {
    font-size: 1.1rem;
    width: 0px;
  }
`
