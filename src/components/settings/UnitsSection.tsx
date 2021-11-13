import { VFC } from "react"
import InputSection from "./InputSection"
import FieldInput from "../forms/FieldInput"
import Select from "../Select"
import { timeUnits } from "../../constants/units"
import type { FormikProps } from "formik"

interface UnitsProps {
  formik: FormikProps<Settings>
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UnitsSection: VFC<UnitsProps> = (props) => {
  const { formik, onBlur, onChange } = props

  const timeUnitOptions = timeUnits.map((unit, index) => ({
    value: index,
    displayText: unit,
    collapsedDisplayText: unit,
  }))

  return (
    <InputSection>
      <h2>Units</h2>
      <Select
        initialValue={timeUnitOptions[formik.values.timeUnits]}
        selectOptions={timeUnitOptions}
        onSelectionChange={(value) => {
          formik.setFieldValue("timeUnits", value, false)
        }}
      />
      <FieldInput
        fieldName="timeUnits"
        label="Time units:"
        type="text"
        value={formik.values.timeUnits}
        error={formik.errors.timeUnits}
        {...{ onBlur, onChange }}
      />
      <FieldInput
        fieldName="volumeUnits"
        label="Volume units:"
        type="text"
        value={formik.values.volumeUnits}
        error={formik.errors.volumeUnits}
        {...{ onBlur, onChange }}
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
