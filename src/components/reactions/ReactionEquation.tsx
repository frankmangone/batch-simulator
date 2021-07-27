import styled from "styled-components"
import { Fragment } from "react"

/* Components */
import {
  Division,
  Power,
  Subindex,
  GreekAlpha,
  GreekBeta,
  GreekMu,
} from "../MathExpressions"

/* Types */
import { ICompound } from "../../types/Compound"
import { IReaction } from "../../types/Reaction"

interface IReactionEquationProps {
  reaction: IReaction
  compounds: ICompound[]
  keyCompoundSymbol?: string
}

const ReactionEquation: React.FC<IReactionEquationProps> = (props) => {
  const { reaction, compounds } = props
  const keyCompound = compounds.find((c) => reaction.keyCompound === c.id)
  let reactionEquation

  switch (reaction.kineticModel) {
    case 1:
      reactionEquation = (
        <HiperbolicReactionEquation
          reaction={reaction}
          compounds={compounds}
          keyCompoundSymbol={keyCompound?.symbol || undefined}
        />
      )
      break
    case 2:
      reactionEquation = (
        <AutocatalyticReactionEquation
          reaction={reaction}
          compounds={compounds}
          keyCompoundSymbol={keyCompound?.symbol || undefined}
        />
      )
      break
    default:
      reactionEquation = (
        <SimpleReactionEquation
          reaction={reaction}
          compounds={compounds}
          keyCompoundSymbol={keyCompound?.symbol || undefined}
        />
      )
  }

  return reactionEquation
}

export default ReactionEquation

//

const SimpleReactionEquation: React.FC<IReactionEquationProps> = (props) => {
  const { reaction, compounds, keyCompoundSymbol } = props

  return (
    <EquationWrapper>
      {keyCompoundSymbol && (
        <>
          <Subindex base="r" subindex={keyCompoundSymbol} />
          &nbsp;=&nbsp;
        </>
      )}
      k
      {reaction.reactants.map((reactionCompound) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound
        return (
          <Fragment key={reactionCompound.compoundId}>
            .
            <Power
              base={`[${compound.symbol}]`}
              power={
                <Subindex base={<GreekAlpha />} subindex={compound.symbol} />
              }
            />
          </Fragment>
        )
      })}
    </EquationWrapper>
  )
}

const HiperbolicReactionEquation: React.FC<IReactionEquationProps> = (
  props
) => {
  const { reaction, compounds, keyCompoundSymbol } = props

  return (
    <EquationWrapper>
      {keyCompoundSymbol && (
        <>
          <Subindex base="r" subindex={keyCompoundSymbol} />
          &nbsp;=&nbsp;
        </>
      )}
      <GreekMu />
      {reaction.reactants.map((reactionCompound) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound
        return (
          <Fragment key={reactionCompound.compoundId}>
            .
            <Division
              numerator={`[${compound.symbol}]`}
              denominator={
                <>
                  <Subindex base={"K"} subindex={compound.symbol} />
                  +[{`${compound.symbol}`}]
                </>
              }
            />
          </Fragment>
        )
      })}
    </EquationWrapper>
  )
}

const AutocatalyticReactionEquation: React.FC<IReactionEquationProps> = (
  props
) => {
  const { reaction, compounds, keyCompoundSymbol } = props

  return (
    <EquationWrapper>
      {keyCompoundSymbol && (
        <>
          <Subindex base="r" subindex={keyCompoundSymbol} />
          &nbsp;=&nbsp;
        </>
      )}
      k
      {reaction.reactants.map((reactionCompound) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound
        return (
          <Fragment key={reactionCompound.compoundId}>
            .
            <Power
              base={`[${compound.symbol}]`}
              power={
                <Subindex base={<GreekAlpha />} subindex={compound.symbol} />
              }
            />
          </Fragment>
        )
      })}
      {reaction.products.map((reactionCompound) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound
        return (
          <Fragment key={reactionCompound.compoundId}>
            .
            <Power
              base={`[${compound.symbol}]`}
              power={
                <Subindex base={<GreekBeta />} subindex={compound.symbol} />
              }
            />
          </Fragment>
        )
      })}
    </EquationWrapper>
  )
}

//

const EquationWrapper = styled.div`
  align-items: center;
  align-self: stretch;
  background-color: var(--color-grey-lightest);
  border: 1px solid var(--color-grey-light);
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  color: var(--color-grey-dark);
  display: flex;
  font-size: 1.8rem;
  justify-content: center;
  padding: 1.5rem;
  margin: 1.5rem 0 1rem;

  span {
    font-family: "Comfortaa", symbol;
  }
`
