import React from "react"
import styled from "styled-components"
import PageSubTitle from "../../components/layout/PageSubTitle"
import SelectInput from "../../components/forms/SelectInputNew/index"
import SelectOption from "../../components/forms/SelectInputNew/SelectOption"

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
`

const SubTitle = styled(PageSubTitle)`
  flex-basis: 100%;
  margin-bottom: 20px;
`

const KineticModelForm: React.VFC = () => {
  return (
    <Wrapper>
      <SubTitle>Kinetic Model</SubTitle>
      <SelectInput
        label="Test"
        fieldName="ahsjgdja"
        value="asdsd"
        onChange={() => null}
      >
        <SelectOption />
        <SelectOption />
        <SelectOption />
      </SelectInput>

      <SelectInput
        label="Test"
        fieldName="ahsjgdja"
        value="asdsd"
        onChange={() => null}
      >
        <SelectOption />
        <SelectOption />
        <SelectOption />
      </SelectInput>

      <SelectInput
        label="Test"
        fieldName="ahsjgdja"
        value="asdsd"
        onChange={() => null}
      >
        <SelectOption />
        <SelectOption />
        <SelectOption />
      </SelectInput>
      {/* <SelectInput
        selectedOption={undefined}
        fieldName="timeUnits"
        label="Time units:"
        selectOptions={timeUnitsOptions}
        onSelectionChange={(_value) => {}}
      /> */}
    </Wrapper>
  )
}

export default KineticModelForm
