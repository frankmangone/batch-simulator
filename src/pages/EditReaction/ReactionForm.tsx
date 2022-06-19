import styled from "styled-components"
import CompoundSelection from "./CompoundSelection"
import KineticModelForm from "./KineticModelForm"
import TextInput from "@components/forms/TextInput"
import ReactionPreview from "@components/reactions/ReactionPreview"
import type { FormikProps } from "formik"

interface ReactionFormProps {
  formik: FormikProps<ReactionInput>
}

const LABELS: Record<keyof ReducedReactionInput, string> = {
  name: "Name",
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
`

const ReactionForm: React.VFC<ReactionFormProps> = (props) => {
  const { formik } = props
  const { values, errors, setFieldValue } = formik
  const { reactants, products } = values

  const textInputProps = (key: keyof ReducedReactionInput) => {
    return {
      fieldName: key,
      label: LABELS[key],
      value: values[key],
      error: errors[key],
      type: key === "name" ? "text" : "number",
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(key, event.target.value)
      },
    }
  }

  return (
    <Wrapper>
      <TextInput {...textInputProps("name")} />
      <ReactionPreview
        style={{ justifyContent: "center", flexBasis: "100%" }}
        {...{ reactants, products }}
      />
      <CompoundSelection formik={formik} />
      <KineticModelForm {...{ formik, reactants }} />
    </Wrapper>
  )
}

export default ReactionForm
