import React from "react"
import SelectInput from "../../components/forms/SelectInput"
import SelectInputNew from "../../components/forms/SelectInputNew/index"
import { timeUnitsOptions } from "../../lib/units"

const KineticModelForm: React.VFC = () => {
  return (
    <div>
      <SelectInputNew
        label="Test"
        fieldName="ahsjgdja"
        value="asdsd"
        onChange={() => null}
      />
      {/* <SelectInput
        selectedOption={undefined}
        fieldName="timeUnits"
        label="Time units:"
        selectOptions={timeUnitsOptions}
        onSelectionChange={(_value) => {}}
      /> */}
    </div>
  )
}

export default KineticModelForm
