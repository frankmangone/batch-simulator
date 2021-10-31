import styled from "styled-components"

/* Hooks */
import useSettings from "../../hooks/useSettings"

/* Components */
import ReactionParamInputCard from "./ReactionParamInputCard"
import { Equation, SymbolComponent } from "../MathExpressions"

/* Types */
import { Token, TokenTypes } from "../../helpers/tokenization"
import { Reaction, KineticModel } from "../../types/Reaction"
import type { Compound } from "../../types/Compound"

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
    new Token(TokenTypes.Parameter, `${settings.timeUnits}`),
    new Token(TokenTypes.Operator, "^"),
    new Token(TokenTypes.Parameter, `-1`),
  ]

  const tokenizedKUnits = [
    new Token(TokenTypes.Parameter, `${settings.timeUnits}`),
    new Token(TokenTypes.Operator, "^"),
    new Token(TokenTypes.Parameter, `-1`),
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
    tokenizedKUnits.push(new Token(TokenTypes.Operator, "*"))
    tokenizedKUnits.push(
      new Token(TokenTypes.Parameter, `${settings.volumeUnits}`)
    )
    tokenizedKUnits.push(new Token(TokenTypes.Operator, "^"))
    tokenizedKUnits.push(new Token(TokenTypes.Parameter, `${globalOrder - 1}`))
    tokenizedKUnits.push(new Token(TokenTypes.Operator, "*"))
    tokenizedKUnits.push(
      new Token(TokenTypes.Parameter, `${settings.molarUnits}`)
    )
    tokenizedKUnits.push(new Token(TokenTypes.Operator, "^"))
    tokenizedKUnits.push(
      new Token(TokenTypes.Parameter, `${-(globalOrder - 1)}`)
    )
  }

  return (
    <KineticParamsWrapper>
      {Object.entries(reaction.kineticConstants).map(([param, value]) => {
        let units, symbol

        if (param === "k" || param === "\\mu") return null

        switch (param) {
          case "preExponential":
            if (kineticModel === KineticModel.hyperbolic) {
              units = <Equation tokenizedEquation={tokenizedMuUnits} />
              symbol = "\\mu_0"
            } else {
              units = <Equation tokenizedEquation={tokenizedKUnits} />
              symbol = "k_0"
            }
            break
          case "activationEnergy":
            symbol = "E_A"
            break
          default:
            symbol = param
        }

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
