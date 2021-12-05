import styled from "styled-components"
import ReactionParamInputCard from "./ReactionParamInputCard"
import { Equation, SymbolComponent } from "../MathExpressions"
import { KineticModels } from "../../lib/reactionTypes"
import {
  reactionConstantsSymbols,
  isVariableRelatedParam,
} from "../../lib/reactions"
import useUnits from "../../hooks/useUnits"
interface ReactionKineticParametersProps {
  compounds: Compound[]
  reaction: Reaction
  updateKineticConstant: (key: string, value: string) => void
}

const ReactionKineticParameters: React.FC<ReactionKineticParametersProps> = (
  props
) => {
  const { reaction, updateKineticConstant } = props
  const kineticModel: KineticModel = reaction.kineticModel

  const {
    tokenizedKUnits,
    tokenizedMuUnits,
    tokenizedActivationEnergyUnits,
    tokenizedReactionEnthalpyUnits,
  } = useUnits()

  const globalOrder = Object.entries(reaction?.kineticConstants).reduce(
    (accumulator, [key, value]) => {
      if (isVariableRelatedParam(key)) {
        return accumulator
      }
      return accumulator + parseFloat(value)
    },
    0
  )

  return (
    <KineticParamsWrapper>
      {Object.entries(reaction.kineticConstants).map(([param, value]) => {
        let units

        if (param === reactionConstantsSymbols.preExponential) {
          if (kineticModel === KineticModels.hyperbolic) {
            units = <Equation tokenizedEquation={tokenizedMuUnits} />
          } else {
            units = (
              <Equation tokenizedEquation={tokenizedKUnits(globalOrder)} />
            )
          }
        }

        if (param === reactionConstantsSymbols.activationEnergy) {
          units = (
            <Equation tokenizedEquation={tokenizedActivationEnergyUnits} />
          )
        }

        if (param === reactionConstantsSymbols.reactionEnthalpy) {
          units = (
            <Equation tokenizedEquation={tokenizedReactionEnthalpyUnits} />
          )
        }

        return (
          <ReactionParamInputCard
            key={param}
            paramSymbol={<SymbolComponent symbol={param} />}
            value={value}
            units={units}
            positive={param !== reactionConstantsSymbols.reactionEnthalpy}
            updateValue={(value: string) => {
              updateKineticConstant(param, value)
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
