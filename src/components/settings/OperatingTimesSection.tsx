import InputSection from "./InputSection"
import FieldInput from "../forms/FieldInput"

/* Types */
import type { Settings } from "../../types/Settings"
import type { FormikProps } from "formik"

interface OperatingTimesProps {
  formik: FormikProps<Settings>
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const OperatingTimesSection: React.VFC<OperatingTimesProps> = (props) => {
  const { formik, onBlur, onChange } = props

  return (
    <InputSection>
      <h2>Operating times</h2>
      <FieldInput
        fieldName="reactionTime"
        label="Reaction time:"
        type="number"
        value={formik.values.reactionTime}
        error={formik.errors.reactionTime}
        {...{ onBlur, onChange }}
      />
      <FieldInput
        fieldName="deadTime"
        label="Dead time:"
        type="number"
        tooltip="Time needed for discharge, cleaning, etc."
        value={formik.values.deadTime}
        error={formik.errors.deadTime}
        {...{ onBlur, onChange }}
      />
      <FieldInput
        fieldName="timeStep"
        label="Time step:"
        type="number"
        tooltip="Small time interval for numerical calculation purposes"
        value={formik.values.timeStep}
        error={formik.errors.timeStep}
        {...{ onBlur, onChange }}
      />
    </InputSection>
  )
}

export default OperatingTimesSection
