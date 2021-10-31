import styled from "styled-components"

/* Components */
import ReactionParamInputCard from "./ReactionParamInputCard"
import { Equation, SymbolComponent } from "../MathExpressions"

/* Types */
import { Compound } from "../../types/Compound"
import { Reaction } from "../../types/Reaction"

import { Token, TokenTypes } from "../../helpers/tokenization"
import useSettings from "../../hooks/useSettings"

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

        switch (param) {
          case "k":
            units = <Equation tokenizedEquation={tokenizedKUnits} />
            symbol = param
            break
          case "\\mu":
            units = <Equation tokenizedEquation={tokenizedMuUnits} />
            symbol = param
            break
          case "preExponential":
            symbol = "k_0"
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
