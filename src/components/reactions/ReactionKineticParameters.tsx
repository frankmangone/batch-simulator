import styled from "styled-components"

/* Components */
import ReactionParamInputCard from "./ReactionParamInputCard"

/* Types */
import { ICompound } from "../../types/Compound"
import { IReaction } from "../../types/Reaction"

interface IReactionKineticParametersProps {
  reaction: IReaction
  compounds: ICompound[]
}

const ReactionKineticParameters: React.FC<IReactionKineticParametersProps> = (
  props
) => {
  const { compounds, reaction } = props
  const { reactionConstant, ...compoundParams } = reaction.kineticConstants

  console.log()
  return (
    <KineticParamsWrapper>
      <ReactionParamInputCard>
        <h1>k</h1>
        <input value={reactionConstant} />
      </ReactionParamInputCard>

      {reaction.reactants.map((reactionCompound) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound

        return (
          <ReactionParamInputCard>
            <h1>
              <span>&alpha;</span>
              <sub>{compound.symbol}</sub>
            </h1>
            <input value={compoundParams[compound.id]} />
          </ReactionParamInputCard>
        )
      })}

      {/* For reversible reactions, and for now */}
      {reaction.kineticModel === 1 &&
        reaction.products.map((reactionCompound) => {
          const compound = compounds.find(
            (c) => c.id === reactionCompound.compoundId
          ) as ICompound

          return (
            <ReactionParamInputCard>
              <h1>
                <span>&alpha;</span>
                <sub>{compound.symbol}</sub>
              </h1>
              <input value={compoundParams[compound.id]} />
            </ReactionParamInputCard>
          )
        })}
    </KineticParamsWrapper>
  )
}

export default ReactionKineticParameters

const KineticParamsWrapper = styled.div`
  align-self: stretch;
  background-color: var(--color-grey-lightest);
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  padding: 0.5rem;

  input {
    margin-left: 0;
  }
`
