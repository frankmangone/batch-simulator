import InputSection from "./InputSection"
import FieldInput from "../forms/FieldInput"
import CheckboxInput from "../forms/CheckboxInput"

/* Hooks */
import useSettings from "../../hooks/useSettings"

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
  const { settings } = useSettings()

  return (
    <InputSection>
      <h2>Heat Exchange</h2>
      <CheckboxInput<Settings>
        fieldName="isothermic"
        label="Isothermic system"
        {...{ formik }}
      />
      <FieldInput
        fieldName="initialTemperature"
        label={`Initial Temperature [${settings.temperatureUnits}]:`}
        type="number"
        value={formik.values.initialTemperature}
        error={formik.errors.initialTemperature}
        {...{ onBlur, onChange }}
      />
    </InputSection>
  )
}

export default HeatExchangeSection
