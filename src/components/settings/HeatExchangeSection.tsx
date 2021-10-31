import InputSection from "./InputSection"
import FieldInput from "../forms/FieldInput"

/* Types */
import type { Settings } from "../../types/Settings"
import type { FormikProps } from "formik"

interface HeatExchangeProps {
  formik: FormikProps<Settings>
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const HeatExchangeSection: React.VFC<HeatExchangeProps> = (props) => {
  const { formik, onBlur, onChange } = props

  return (
    <InputSection>
      <h2>Heat Exchange</h2>
      <FieldInput
        fieldName="initialTemperature"
        label="Initial Temperature:"
        type="number"
        value={formik.values.initialTemperature}
        error={formik.errors.initialTemperature}
        {...{ onBlur, onChange }}
      />
      <FieldInput
        fieldName="initialTemperature"
        label="Initial Temperature:"
        type="number"
        value={formik.values.initialTemperature}
        error={formik.errors.initialTemperature}
        {...{ onBlur, onChange }}
      />
    </InputSection>
  )
}

export default HeatExchangeSection
