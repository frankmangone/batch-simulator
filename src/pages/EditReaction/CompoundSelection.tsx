import { useState } from "react"
import styled from "styled-components"
import Show from "@components/Show"
import CompoundCard from "./CompoundCard"
import AddCompoundModal from "./AddCompoundModal"
import PageSubTitle from "@components/layout/PageSubTitle"
import replaceAtIndex from "@lib/array/replaceAtIndex"
import deleteAtIndex from "@lib/array/deleteAtIndex"
import type { FormikProps } from "formik"
import type { Dispatch, SetStateAction } from "react"

type CompoundGroup = "reactants" | "products"

interface CompoundSelectionProps {
  formik: FormikProps<ReactionInput>
}

interface CompoundSelectionGroupProps {
  formik: FormikProps<ReactionInput>
  compoundGroup: CompoundGroup
  activeModal: CompoundGroup | null
  setActiveModal: Dispatch<SetStateAction<CompoundGroup | null>>
}

const Wrapper = styled.div`
  flex-basis: 100%;
  margin-top: 40px;
`

const CompoundList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`

const SubTitle = styled(PageSubTitle)`
  flex-basis: 100%;
  margin-bottom: 20px;
`

const CompoundSelectionGroup: React.VFC<CompoundSelectionGroupProps> = (
  props
) => {
  const { compoundGroup, formik } = props
  const { values } = formik
  const reactionCompounds = values[compoundGroup]

  const handleFieldChange =
    (index: number) =>
    (fieldName: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedCompounds = replaceAtIndex({
        array: values[compoundGroup],
        index,
        newElement: {
          ...values[compoundGroup][index],
          [fieldName]: event.target.value,
        },
      })

      formik.setFieldValue(compoundGroup, updatedCompounds)
    }

  const handleAdd = (compoundId: string) => {
    formik.setFieldValue(compoundGroup, [
      ...values[compoundGroup],
      { compoundId, stoichiometricCoefficient: 1 },
    ])
  }

  const handleDelete = (index: number) => () => {
    const updatedCompounds = deleteAtIndex({
      array: values[compoundGroup],
      index,
    })

    // Reset key compound if needed
    if (values[compoundGroup][index].compoundId === values.keyCompound) {
      formik.setFieldValue("keyCompound", undefined)
    }

    formik.setFieldValue(compoundGroup, updatedCompounds)
  }

  return (
    <Wrapper>
      <SubTitle>
        {compoundGroup === "reactants" ? "Reactants" : "Products"}
      </SubTitle>
      <AddCompoundModal
        takenCompounds={reactionCompounds}
        handleAdd={handleAdd}
      />
      <Show when={reactionCompounds.length === 0}>
        <p>No components yet added</p>
      </Show>
      <CompoundList>
        {reactionCompounds.map((compound, index) => (
          <CompoundCard
            key={compound.compoundId}
            compound={compound}
            handleFieldChange={handleFieldChange(index)}
            handleDelete={handleDelete(index)}
          />
        ))}
      </CompoundList>
    </Wrapper>
  )
}

const CompoundSelection: React.VFC<CompoundSelectionProps> = (props) => {
  const { formik } = props
  const [activeModal, setActiveModal] = useState<CompoundGroup | null>(null)

  return (
    <>
      <CompoundSelectionGroup
        compoundGroup="reactants"
        {...{ formik, activeModal, setActiveModal }}
      />
      <CompoundSelectionGroup
        compoundGroup="products"
        {...{ formik, activeModal, setActiveModal }}
      />
    </>
  )
}

export default CompoundSelection
