import FieldInput from "../forms/FieldInput"
import type { FormikProps } from "formik"

interface CompoundInputFieldProps {
  label: string
  fieldName: string
  color?: string
  formik: FormikProps<CompoundInput>
}

const CompoundInputField: React.VFC<CompoundInputFieldProps> = (props) => {
  const { color, label, fieldName, formik } = props

  const error = formik.errors[fieldName as keyof typeof formik.errors]
  const value = formik.values[fieldName as keyof typeof formik.values]
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event)
  }

  // Special props for symbol input
  const symbolProps = color
    ? {
        big: true,
        transparent: true,
      }
    : {}

  return (
    <FieldInput
      {...{
        fieldName,
        label,
        color,
        error,
        onChange,
        value,
        ...symbolProps,
      }}
    />
  )
}

export default CompoundInputField
