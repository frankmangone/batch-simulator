import styled from "styled-components"
import ReactionParamInputCard from "@components/reactions/ReactionParamInputCard"
import Equation from "@components/math/Equation"
import SymbolComponent from "@components/math/Symbol"
import { KineticModels } from "@lib/reactionTypes"
import {
  reactionConstantsSymbols,
  isVariableRelatedParam,
} from "@lib/reactions"
import useUnits from "@hooks/useUnits"
import type { FormikProps } from "formik"

interface KineticParametersProps {
  formik: FormikProps<ReactionInput>
}

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

const ReactionKineticParameters: React.FC<KineticParametersProps> = (props) => {
  const { formik } = props
  const { values, setFieldValue } = formik
  const { kineticModel, kineticConstants } = values

  const {
    tokenizedKUnits,
    tokenizedMuUnits,
    tokenizedActivationEnergyUnits,
    tokenizedReactionEnthalpyUnits,
  } = useUnits()

  const globalOrder = Object.entries(kineticConstants).reduce(
    (accumulator, [key, value]) => {
      if (isVariableRelatedParam(key)) {
        return accumulator
      }
      return accumulator + parseFloat(value)
    },
    0
  )

  const handleUpdateKineticConstant = (key: string) => (value: string) => {
    setFieldValue("kineticConstants", {
      ...kineticConstants,
      [key]: value,
    })
  }

  return (
    <KineticParamsWrapper>
      {Object.entries(kineticConstants).map(([param, value]) => {
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
            updateValue={handleUpdateKineticConstant(param)}
          />
        )
      })}
    </KineticParamsWrapper>
  )
}

export default ReactionKineticParameters
