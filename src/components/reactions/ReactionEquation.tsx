import styled from "styled-components"

/* Types */
import { ICompound } from "../../types/Compound"
import { IReaction } from "../../types/Reaction"

interface IReactionEquationProps {
  reaction: IReaction
  compounds: ICompound[]
}

const ReactionEquation: React.FC<IReactionEquationProps> = (props) => {
  const { reaction, compounds } = props
  let reactionEquation

  switch (reaction.kineticModel) {
    case 1:
      reactionEquation = (
        <ReversibleReactionEquation reaction={reaction} compounds={compounds} />
      )
      break
    case 2:
      reactionEquation = (
        <HiperbolicReactionEquation reaction={reaction} compounds={compounds} />
      )
      break
    default:
      reactionEquation = (
        <SimpleReactionEquation reaction={reaction} compounds={compounds} />
      )
  }

  return reactionEquation
}

export default ReactionEquation

//

const SimpleReactionEquation: React.FC<IReactionEquationProps> = (props) => {
  const { reaction, compounds } = props

  return (
    <EquationWrapper>
      <p>k</p>
      {reaction.reactants.map((reactionCompound) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound
        return (
          <p key={reactionCompound.compoundId}>
            .[{compound.symbol}]
            <sup>
              <span>&alpha;</span>
              <sub>{compound.symbol}</sub>
            </sup>
          </p>
        )
      })}
    </EquationWrapper>
  )
}

const ReversibleReactionEquation: React.FC<IReactionEquationProps> = (
  props
) => {
  const { reaction, compounds } = props

  return (
    <EquationWrapper>
      <p>k</p>
      {reaction.reactants.map((reactionCompound) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound
        return (
          <p key={reactionCompound.compoundId}>
            .[{compound.symbol}]
            <sup>
              <span>&alpha;</span>
              <sub>{compound.symbol}</sub>
            </sup>
          </p>
        )
      })}

      <p>- k</p>
      {reaction.products.map((reactionCompound) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound
        return (
          <p key={reactionCompound.compoundId}>
            .[{compound.symbol}]
            <sup>
              <span>&beta;</span>
              <sub>{compound.symbol}</sub>
            </sup>
          </p>
        )
      })}
    </EquationWrapper>
  )
}

const HiperbolicReactionEquation: React.FC<IReactionEquationProps> = (
  props
) => {
  const { reaction, compounds } = props

  return <EquationWrapper>2</EquationWrapper>
}

//

const EquationWrapper = styled.div`
  align-items: flex-end;
  align-self: stretch;
  display: flex;
  justify-content: center;
  margin: 1rem 0;

  p {
    color: var(--color-grey-dark);
    font-size: 1.5rem;
    margin: 0;
  }

  span {
    font-family: "Comfortaa", symbol;
  }
`
