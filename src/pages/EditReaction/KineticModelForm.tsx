import React, { useState } from "react"
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
  const [select1, setSelect1] = useState<number>(0)
  const [select2, setSelect2] = useState<number>(0)
  const [select3, setSelect3] = useState<number>(0)

  return (
    <Wrapper>
      <SubTitle>Kinetic Model</SubTitle>
      <SelectInput
        label="Test"
        fieldName="ahsjgdja"
        value={select1}
        onChange={(index) => setSelect1(index)}
      >
        <SelectOption value="1" displayText="option 1" />
        <SelectOption value="2" displayText="option 2" />
        <SelectOption value="3" displayText="option 3" />
      </SelectInput>

      <SelectInput
        label="Test"
        fieldName="ahsjgdja"
        value={select2}
        onChange={(index) => setSelect2(index)}
      >
        <SelectOption value="4" displayText="option 4" />
        <SelectOption value="5" displayText="option 5" />
        <SelectOption value="6" displayText="option 6" />
      </SelectInput>

      <SelectInput
        label="Test"
        fieldName="ahsjgdja"
        value={select3}
        onChange={(index) => setSelect3(index)}
      >
        <SelectOption value="1" displayText="option 1" />
        <SelectOption value="2" displayText="option 2" />
      </SelectInput>
    </Wrapper>
  )
}

export default KineticModelForm
