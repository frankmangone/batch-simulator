import styled from "styled-components"
import TextInput from "../../components/forms/TextInput"
import SymbolInput from "./SymbolInput"
import useCompounds from "../../hooks/entities/useCompounds"
import type { FormikProps } from "formik"

interface CompoundFormProps {
  formik: FormikProps<CompoundInput>
}

const LABELS: Record<keyof ReducedCompoundInput, string> = {
  name: "Compound name",
  molecularWeight: "Molecular Weight",
  concentration: "Concentration",
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const CompoundForm: React.VFC<CompoundFormProps> = (props) => {
  const { formik } = props
  const { values, errors, setFieldValue } = formik
  const { randomCompoundColor } = useCompounds()

  const textInputProps = (key: keyof ReducedCompoundInput) => {
    return {
      fieldName: key,
      label: LABELS[key],
      value: values[key],
      error: errors[key],
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

  const changeColor = () => setFieldValue("color", randomCompoundColor())

  return (
    <Wrapper>
      <SymbolInput
        color={values.color}
        changeColor={changeColor}
        value={values.symbol}
        error={errors.symbol}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setFieldValue("symbol", event.target.value)
        }
      />
      <TextInput {...textInputProps("name")} />
      <TextInput {...textInputProps("molecularWeight")} />
      <TextInput {...textInputProps("concentration")} />
    </Wrapper>
  )
}

export default CompoundForm
