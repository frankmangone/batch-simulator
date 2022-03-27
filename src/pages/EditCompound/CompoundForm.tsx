import TextInput from "../../components/forms/TextInput"
import type { FormikProps } from "formik"

interface CompoundFormProps {
  formik: FormikProps<CompoundInput>
}

type ReducedInput = Omit<CompoundInput, "color" | "symbol">

const LABELS: Record<keyof ReducedInput, string> = {
  name: "Compound name",
  molecularWeight: "Molecular Weight",
  concentration: "Concentration",
}

const CompoundForm: React.VFC<CompoundFormProps> = (props) => {
  const { formik } = props
  const { values, setFieldValue } = formik

  const textInputProps = (key: keyof ReducedInput) => {
    return {
      fieldName: key,
      label: LABELS[key],
      value: values[key],
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValue(key, event.target.value),
    }
  }

  return (
    <>
      <TextInput {...textInputProps("name")} />
      <TextInput {...textInputProps("molecularWeight")} />
      <TextInput {...textInputProps("concentration")} />
    </>
  )
}

export default CompoundForm
