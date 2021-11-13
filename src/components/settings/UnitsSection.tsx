import { VFC } from "react"
import InputSection from "./InputSection"
import FieldInput from "../forms/FieldInput"
import SelectInput from "../forms/SelectInput"
import { timeUnitsOptions, volumeUnitsOptions } from "../../helpers/units"
import type { FormikProps } from "formik"

interface UnitsProps {
  formik: FormikProps<Settings>
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UnitsSection: VFC<UnitsProps> = (props) => {
  const { formik, onBlur, onChange } = props

  return (
    <InputSection>
      <h2>Units</h2>
      <SelectInput
        selectedOption={timeUnitsOptions[formik.values.timeUnits]}
        fieldName="timeUnits"
        label="Time units:"
        selectOptions={timeUnitsOptions}
        onSelectionChange={(value) => {
          formik.setFieldValue("timeUnits", value, false)
          formik.handleSubmit()
        }}
      />
      <SelectInput
        selectedOption={volumeUnitsOptions[formik.values.volumeUnits]}
        fieldName="volumeUnits"
        label="Volume units:"
        selectOptions={volumeUnitsOptions}
        onSelectionChange={(value) => {
          formik.setFieldValue("volumeUnits", value, false)
          formik.handleSubmit()
        }}
      />
      <FieldInput
        fieldName="molarUnits"
        label="Molar units:"
        type="text"
        value={formik.values.molarUnits}
        error={formik.errors.molarUnits}
        {...{ onBlur, onChange }}
      />
      <FieldInput
        fieldName="massUnits"
        label="Mass units:"
        type="text"
        value={formik.values.massUnits}
        error={formik.errors.massUnits}
        {...{ onBlur, onChange }}
      />
      <FieldInput
        fieldName="temperatureUnits"
        label="Temperature units:"
        type="text"
        value={formik.values.temperatureUnits}
        error={formik.errors.temperatureUnits}
        {...{ onBlur, onChange }}
      />
    </InputSection>
  )
}

export default UnitsSection
