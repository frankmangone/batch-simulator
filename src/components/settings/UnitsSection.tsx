import { VFC } from "react"
import InputSection from "./InputSection"
import SelectInput from "../forms/SelectInput"
import {
  timeUnitsOptions,
  volumeUnitsOptions,
  massUnitsOptions,
  molarUnitsOptions,
  temperatureUnitsOptions,
  energyUnitsOptions,
} from "../../lib/units"
import type { FormikProps } from "formik"

interface UnitsProps {
  formik: FormikProps<Settings>
}

const UnitsSection: VFC<UnitsProps> = (props) => {
  const { formik } = props

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
      <SelectInput
        selectedOption={molarUnitsOptions[formik.values.molarUnits]}
        fieldName="molarUnits"
        label="Molar units:"
        selectOptions={molarUnitsOptions}
        onSelectionChange={(value) => {
          formik.setFieldValue("molarUnits", value, false)
          formik.handleSubmit()
        }}
      />
      <SelectInput
        selectedOption={massUnitsOptions[formik.values.massUnits]}
        fieldName="massUnits"
        label="Mass units:"
        selectOptions={massUnitsOptions}
        onSelectionChange={(value) => {
          formik.setFieldValue("massUnits", value, false)
          formik.handleSubmit()
        }}
      />
      <SelectInput
        selectedOption={temperatureUnitsOptions[formik.values.temperatureUnits]}
        fieldName="temperatureUnits"
        label="Temperature units:"
        selectOptions={temperatureUnitsOptions}
        onSelectionChange={(value) => {
          formik.setFieldValue("temperatureUnits", value, false)
          formik.handleSubmit()
        }}
      />
      <SelectInput
        selectedOption={energyUnitsOptions[formik.values.energyUnits]}
        fieldName="energyUnits"
        label="Energy units:"
        selectOptions={energyUnitsOptions}
        onSelectionChange={(value) => {
          formik.setFieldValue("energyUnits", value, false)
          formik.handleSubmit()
        }}
      />
    </InputSection>
  )
}

export default UnitsSection
