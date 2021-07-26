import styled from "styled-components"

/* Components */
import ReactionParamInputCard from "./ReactionParamInputCard"
import { Subindex, GreekMu } from "../MathExpressions"

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
  const { compounds, reaction, updateKineticConstant } = props
  const { reactionConstant, inverseReactionConstant, ...compoundParams } =
    reaction.kineticConstants

  return (
    <KineticParamsWrapper>
      <ReactionParamInputCard
        paramSymbol={reaction.kineticModel === 2 ? <GreekMu /> : "k"}
        value={reactionConstant}
        updateValue={(value: number) => {
          updateKineticConstant("reactionConstant", value)
        }}
      />

      {inverseReactionConstant !== undefined && (
        <ReactionParamInputCard
          paramSymbol={<Subindex base="k" subindex="-1" />}
          value={inverseReactionConstant}
          updateValue={(value: number) => {
            updateKineticConstant("reactionConstant", value)
          }}
        />
      )}

      {reaction.reactants.map((reactionCompound) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound

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

      {/* For reversible reactions, and for now */}
      {reaction.kineticModel === 1 &&
        reaction.products.map((reactionCompound) => {
          const compound = compounds.find(
            (c) => c.id === reactionCompound.compoundId
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
