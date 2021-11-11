import styled from "styled-components"

/* Hooks */
import useSettings from "../../hooks/useSettings"

/* Components */
import ReactionParamInputCard from "./ReactionParamInputCard"
import { Equation, SymbolComponent } from "../MathExpressions"

/* Types */
import { TokenTypes } from "../../helpers/tokenization"
import { Reaction, KineticModel } from "../../types/Reaction"

interface IReactionKineticParametersProps {
  compounds: Compound[]
  reaction: Reaction
  updateKineticConstant: (key: string, value: number) => void
}

const ReactionKineticParameters: React.FC<IReactionKineticParametersProps> = (
  props
) => {
  const { reaction, updateKineticConstant } = props
  const { settings } = useSettings()
  const kineticModel: KineticModel = reaction.kineticModel

  const tokenizedMuUnits = [
    { type: TokenTypes.Parameter, value: `${settings.timeUnits}` },
    { type: TokenTypes.Operator, value: "^" },
    { type: TokenTypes.Parameter, value: `-1` },
  ]

  const tokenizedKUnits = [
    { type: TokenTypes.Parameter, value: `${settings.timeUnits}` },
    { type: TokenTypes.Operator, value: "^" },
    { type: TokenTypes.Parameter, value: `-1` },
  ]

  const globalOrder = Object.entries(reaction?.kineticConstants).reduce(
    (accumulator, [key, value]) => {
      if (key === "preExponential" || key === "activationEnergy")
        return accumulator
      return accumulator + value
    },
    -reaction?.kineticConstants.k || 0
  )

  if (globalOrder !== 1) {
    tokenizedKUnits.push({ type: TokenTypes.Operator, value: "*" })
    tokenizedKUnits.push({
      type: TokenTypes.Parameter,
      value: `${settings.volumeUnits}`,
    })
    tokenizedKUnits.push({ type: TokenTypes.Operator, value: "^" })
    tokenizedKUnits.push({
      type: TokenTypes.Parameter,
      value: `${globalOrder - 1}`,
    })
    tokenizedKUnits.push({ type: TokenTypes.Operator, value: "*" })
    tokenizedKUnits.push({
      type: TokenTypes.Parameter,
      value: `${settings.molarUnits}`,
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
          if (kineticModel === KineticModel.hyperbolic) {
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
            value={value as number}
            units={units}
            updateValue={(value: number) => {
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
