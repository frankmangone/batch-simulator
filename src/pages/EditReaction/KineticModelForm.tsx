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
        <SelectOption value="1" displayText="option 1" />
        <SelectOption value="2" displayText="option 2" />
        <SelectOption value="3" displayText="option 3" />
      </SelectInput>

      <SelectInput
        label="Test"
        fieldName="ahsjgdja"
        value="asdsd"
        onChange={() => null}
      >
        <SelectOption value="4" displayText="option 4" />
        <SelectOption value="5" displayText="option 5" />
        <SelectOption value="6" displayText="option 6" />
      </SelectInput>

      <SelectInput
        label="Test"
        fieldName="ahsjgdja"
        value="asdsd"
        onChange={() => null}
      >
        <SelectOption value="1" displayText="option 1" />
        <SelectOption value="2" displayText="option 2" />
      </SelectInput>
    </Wrapper>
  )
}

export default KineticModelForm
