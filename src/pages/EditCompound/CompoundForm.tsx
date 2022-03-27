import TextInput from "../../components/forms/TextInput"
import type { FormikProps } from "formik"

interface CompoundFormProps {
  formik: FormikProps<CompoundInput>
}

const LABELS: Record<keyof ReducedCompoundInput, string> = {
  name: "Compound name",
  molecularWeight: "Molecular Weight",
  concentration: "Concentration",
}

const CompoundForm: React.VFC<CompoundFormProps> = (props) => {
  const { formik } = props
  const { values, setFieldValue } = formik

  const textInputProps = (key: keyof ReducedCompoundInput) => {
    return {
      fieldName: key,
      label: LABELS[key],
      value: values[key],
      type: key === "name" ? "text" : "number",
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (key === "name") {
          setFieldValue(key, event.target.value)
          return
        }
        setFieldValue(key, parseFloat(event.target.value))
      },
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
