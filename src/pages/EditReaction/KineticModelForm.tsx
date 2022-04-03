import React from "react"
import styled from "styled-components"
import PageSubTitle from "@components/layout/PageSubTitle"
import SelectInput from "@components/forms/SelectInputNew/index"
import SelectOption from "@components/forms/SelectInputNew/SelectOption"
import useCompounds from "@hooks/entities/useCompounds"
import type { FormikProps } from "formik"

interface KineticModelProps {
  formik: FormikProps<ReactionInput>
  reactants: ReactionCompound[]
}

const KINETIC_MODELS = ["Simple", "Hiperbolic", "Autocatalytic"]

const LABELS: Record<keyof ReducedReactionKineticInput, string> = {
  keyCompound: "Key compound",
  kineticModel: "Kinetic model",
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
`

const SubTitle = styled(PageSubTitle)`
  flex-basis: 100%;
  margin-bottom: 20px;
`

const KineticModelForm: React.VFC<KineticModelProps> = (props) => {
  const { formik, reactants } = props
  const { values, setFieldValue } = formik
  const { findCompound } = useCompounds()

  const mappedReactants: Compound[] = reactants.map(
    (reactant) => findCompound(reactant.compoundId) as Compound
  )

  const formValues: Record<keyof ReducedReactionKineticInput, number> = {
    kineticModel: values.kineticModel,
    keyCompound: reactants.findIndex(
      (reactant) => reactant.compoundId === values.keyCompound
    ),
  }

  const handleChange: Record<
    keyof ReducedReactionKineticInput,
    (index: number) => void
  > = {
    kineticModel: (index: number) => {
      setFieldValue("kineticModel", index)
    },
    keyCompound: (index: number) => {
      setFieldValue("keyCompound", reactants[index].compoundId)
    },
  }

  const selectProps = (key: keyof ReducedReactionKineticInput) => {
    return {
      label: LABELS[key],
      fieldName: key,
      value: formValues[key],
      onChange: handleChange[key],
    }
  }

  return (
    <Wrapper>
      <SubTitle>Kinetics</SubTitle>
      <SelectInput {...selectProps("kineticModel")}>
        {KINETIC_MODELS.map((model, index) => (
          <SelectOption key={index} value={index} displayText={model} />
        ))}
      </SelectInput>

      <SelectInput {...selectProps("keyCompound")}>
        {mappedReactants.map((compound, index) => (
          <SelectOption
            key={compound.id}
            value={index}
            displayText={compound.symbol}
          />
        ))}
      </SelectInput>
    </Wrapper>
  )
}

export default KineticModelForm
