import styled from "styled-components"

/* Components */
import ReactionParamInputCard from "./ReactionParamInputCard"
import { GreekMu } from "../MathExpressions"

/* Hooks */
import { useData } from "../../context/DataContext"

/* Types */
import { ICompound } from "../../types/Compound"
import { IReaction } from "../../types/Reaction"

interface IReactionKineticParametersProps {
  compounds: ICompound[]
  reaction: IReaction
  updateKineticConstant: (key: string, value: number) => void
}

const ReactionKineticParameters: React.FC<IReactionKineticParametersProps> = (
  props
) => {
  const { reaction, updateKineticConstant } = props
  const { findCompound } = useData()
  const { reactionConstant, ...compoundParams } = reaction.kineticConstants

  return (
    <KineticParamsWrapper>
      <ReactionParamInputCard
        paramSymbol={reaction.kineticModel === 1 ? <GreekMu /> : "k"}
        value={reactionConstant}
        updateValue={(value: number) => {
          updateKineticConstant("reactionConstant", value)
        }}
      />

      {reaction.reactants.map((reactionCompound) => {
        const compound = findCompound(reactionCompound.compoundId) as ICompound

        return (
          <ReactionParamInputCard
            key={compound.id}
            paramSymbol={
              <>
                <span>&alpha;</span>
                <sub>{compound.symbol}</sub>
              </>
            }
            value={compoundParams[compound.id]}
            updateValue={(value: number) => {
              updateKineticConstant(compound.id, value)
            }}
          />
        )
      })}

      {/* For autocatalytic reactions, and for now... */}
      {reaction.kineticModel === 2 &&
        reaction.products.map((reactionCompound) => {
          const compound = findCompound(
            reactionCompound.compoundId
          ) as ICompound

          return (
            <ReactionParamInputCard
              key={compound.id}
              paramSymbol={
                <>
                  <span>&beta;</span>
                  <sub>{compound.symbol}</sub>
                </>
              }
              value={compoundParams[compound.id]}
              updateValue={(value: number) => {
                updateKineticConstant(compound.id, value)
              }}
            />
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
  justify-content: flex-start;
  margin-top: 0.5rem;
  padding: 0.5rem;

  input {
    margin-left: 0;
  }
`
