import React from "react"
import styled from "styled-components"
import KineticEquation from "./KineticEquation"
import KineticParameters from "./KineticParameters"
import PageSubTitle from "@components/layout/PageSubTitle"
import SelectInput from "@components/forms/SelectInputNew"
import SelectOption from "@components/forms/SelectInputNew/SelectOption"
import useCompounds from "@hooks/entities/useCompounds"
import useSerializeEquation from "@hooks/useSerializeEquation"
import {
  KINETIC_MODELS,
  generateKineticConstants,
} from "../../constants/kineticModels"
import type { FormikProps } from "formik"

interface KineticModelProps {
  formik: FormikProps<ReactionInput>
  reactants: ReactionCompound[]
}

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
  width: 100%;
`

const SubTitle = styled(PageSubTitle)`
  flex-basis: 100%;
  margin-bottom: 20px;
`

const KineticModelForm: React.VFC<KineticModelProps> = (props) => {
  const { formik, reactants } = props
  const { values, errors, setFieldValue } = formik
  const { compounds, findCompound } = useCompounds()
  const serializeKineticEquation = useSerializeEquation()

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
    (index?: number) => void
  > = {
    kineticModel: (index?: number) => {
      const updatedReaction = {
        ...formik.values,
        kineticModel: index as KineticModel,
      }
      setFieldValue("kineticModel", index)
      setFieldValue(
        "kineticEquation",
        serializeKineticEquation(updatedReaction)
      )
      setFieldValue(
        "kineticConstants",
        generateKineticConstants(updatedReaction, compounds)
      )
    },
    keyCompound: (index?: number) => {
      if (index !== undefined) {
        setFieldValue("keyCompound", reactants[index].compoundId)
        return
      }

      setFieldValue("keyCompound", undefined)
    },
  }

  const selectProps = (key: keyof ReducedReactionKineticInput) => {
    return {
      label: LABELS[key],
      fieldName: key,
      value: formValues[key],
      error: errors[key],
      onChange: handleChange[key],
    }
  }

  return (
    <Wrapper>
      <SubTitle>Kinetics</SubTitle>
      <KineticEquation
        tokens={values.kineticEquation}
        keyCompound={values.keyCompound}
      />
      <SelectInput {...selectProps("kineticModel")}>
        {KINETIC_MODELS.map((model, index) => (
          <SelectOption key={index} value={index} displayText={model} />
        ))}
      </SelectInput>

      <SelectInput
        placeholder="Select compound..."
        {...selectProps("keyCompound")}
      >
        {mappedReactants.map((compound, index) => (
          <SelectOption
            key={compound.id}
            value={index}
            displayText={compound.symbol}
          />
        ))}
      </SelectInput>
      <KineticParameters formik={formik} />
    </Wrapper>
  )
}

export default KineticModelForm
