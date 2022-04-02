import React from "react"
// import SelectInput from "../../components/forms/SelectInput"
import SelectInputNew from "../../components/forms/SelectInputNew/index"
import SelectOption from "../../components/forms/SelectInputNew/SelectOption"

const KineticModelForm: React.VFC = () => {
  return (
    <>
      <SelectInputNew
        label="Test"
        fieldName="ahsjgdja"
        value="asdsd"
        onChange={() => null}
      >
        <SelectOption />
        <SelectOption />
        <SelectOption />
      </SelectInputNew>
      {/* <SelectInput
        selectedOption={undefined}
        fieldName="timeUnits"
        label="Time units:"
        selectOptions={timeUnitsOptions}
        onSelectionChange={(_value) => {}}
      /> */}
    </>
  )
}

export default KineticModelForm
