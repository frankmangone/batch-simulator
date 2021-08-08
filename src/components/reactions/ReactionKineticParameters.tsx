import styled from "styled-components"

/* Components */
import ReactionParamInputCard from "./ReactionParamInputCard"
import { SymbolComponent } from "../MathExpressions"

/* Types */
import { Compound } from "../../types/Compound"
import { Reaction } from "../../types/Reaction"

interface IReactionKineticParametersProps {
  compounds: Compound[]
  reaction: Reaction
  updateKineticConstant: (key: string, value: number) => void
}

const ReactionKineticParameters: React.FC<IReactionKineticParametersProps> = (
  props
) => {
  const { reaction, updateKineticConstant } = props
  const { reactionConstant, ...compoundParams } = reaction.kineticConstants

  return (
    <KineticParamsWrapper>
      {Object.entries(compoundParams).map(([param, value]) => (
        <ReactionParamInputCard
          key={param}
          paramSymbol={<SymbolComponent symbol={param} />}
          value={value as number}
          updateValue={(value: number) => {
            updateKineticConstant(param, value)
          }}
        />
      ))}
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
