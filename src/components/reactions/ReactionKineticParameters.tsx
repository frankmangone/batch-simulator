import styled from "styled-components"
import ReactionParamInputCard from "./ReactionParamInputCard"
import useSettings from "../../hooks/useSettings"
import { Equation, SymbolComponent } from "../MathExpressions"
import { TokenTypes } from "../../helpers/tokenTypes"
import { KineticModels } from "../../helpers/reactionTypes"
import {
  timeUnitsValue,
  volumeUnitsValue,
  molarUnitsValue,
} from "../../helpers/units"

interface IReactionKineticParametersProps {
  compounds: Compound[]
  reaction: Reaction
  updateKineticConstant: (key: string, value: string) => void
}

const ReactionKineticParameters: React.FC<IReactionKineticParametersProps> = (
  props
) => {
  const { reaction, updateKineticConstant } = props
  const { settings } = useSettings()
  const kineticModel: KineticModel = reaction.kineticModel

  const timeUnits = timeUnitsValue(settings.timeUnits)
  const volumeUnits = volumeUnitsValue(settings.volumeUnits)
  const molarUnits = molarUnitsValue(settings.molarUnits)

  const tokenizedMuUnits = [
    {
      type: TokenTypes.Parameter,
      value: `${timeUnits}`,
    },
    { type: TokenTypes.Operator, value: "^" },
    { type: TokenTypes.Parameter, value: `-1` },
  ]

  const tokenizedKUnits = [
    {
      type: TokenTypes.Parameter,
      value: `${timeUnits}`,
    },
    { type: TokenTypes.Operator, value: "^" },
    { type: TokenTypes.Parameter, value: `-1` },
  ]

  const globalOrder = Object.entries(reaction?.kineticConstants).reduce(
    (accumulator, [key, value]) => {
      if (key === "preExponential" || key === "activationEnergy")
        return accumulator
      return accumulator + parseFloat(value)
    },
    -reaction?.kineticConstants.k || 0
  )

  if (globalOrder !== 1) {
    tokenizedKUnits.push({ type: TokenTypes.Operator, value: "*" })
    tokenizedKUnits.push({
      type: TokenTypes.Parameter,
      value: `${volumeUnits}`,
    })
    tokenizedKUnits.push({ type: TokenTypes.Operator, value: "^" })
    tokenizedKUnits.push({
      type: TokenTypes.Parameter,
      value: `${globalOrder - 1}`,
    })
    tokenizedKUnits.push({ type: TokenTypes.Operator, value: "*" })
    tokenizedKUnits.push({
      type: TokenTypes.Parameter,
      value: `${molarUnits}`,
    })
    tokenizedKUnits.push({ type: TokenTypes.Operator, value: "^" })
    tokenizedKUnits.push({
      type: TokenTypes.Parameter,
      value: `${-(globalOrder - 1)}`,
    })
  }

  return (
    <KineticParamsWrapper>
      {Object.entries(reaction.kineticConstants).map(([param, value]) => {
        let units, symbol

        if ("k_\\inf") {
          if (kineticModel === KineticModels.hyperbolic) {
            units = <Equation tokenizedEquation={tokenizedMuUnits} />
          } else {
            units = <Equation tokenizedEquation={tokenizedKUnits} />
          }
        }
        symbol = param

        return (
          <ReactionParamInputCard
            key={param}
            paramSymbol={<SymbolComponent symbol={symbol} />}
            value={value}
            units={units}
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
