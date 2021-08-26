import styled from "styled-components"

/* Components */
import FieldInput from "../components/FieldInput"
import PageTitle from "../components/PageTitle"

/* Helpers */
import { validateNotEmpty, validateGreaterThan } from "../helpers/validators"

/* Hooks */
import { useData } from "../context/DataContext"
import { useFormik } from "formik"

/* Types */
import { Settings, SettingsErrors } from "../types/Settings"

const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useData()

  /**
   * Form validation function
   */
  const validate = (values: Settings): SettingsErrors => {
    const errors: SettingsErrors = {}

    /* Reaction time validation */
    if (!validateNotEmpty(values.reactionTime))
      errors.reactionTime = "Reaction time cannot be empty"
    else if (!validateGreaterThan(values.reactionTime, 0, true))
      errors.reactionTime = "Reaction time cannot be lower than 0"

    /* Dead time validation */
    if (!validateNotEmpty(values.deadTime))
      errors.deadTime = "Dead time cannot be empty"
    else if (!validateGreaterThan(values.deadTime, 0, true))
      errors.deadTime = "Dead time cannot be lower than 0"

    /* Time step validation */
    if (!validateNotEmpty(values.timeStep))
      errors.timeStep = "Time step cannot be empty"
    else if (!validateGreaterThan(values.timeStep, 0, false))
      errors.timeStep = "Time step has to be greater than 0"
    // TODO: Time step has to be lower than reaction time

    return errors
  }

  const formik = useFormik({
    initialValues: { ...settings },
    validate,
    onSubmit: (values) => {
      updateSettings(values)
    },
  })

  const submit = () => {
    formik.handleSubmit()
  }

  const onBlur = submit
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    formik.handleChange(event)

  return (
    <>
      <PageTitle>Operation</PageTitle>

      <Form>
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

        <InputSection>
          <h2>Units</h2>
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
        </InputSection>
      </Form>
    </>
  )
}

export default SettingsPage

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
`

const InputSection = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  return (
    <InputSectionWrapper>
      <InputSectionInner>{children}</InputSectionInner>
    </InputSectionWrapper>
  )
}

const InputSectionWrapper = styled.div`
  display: flex;
  flex-basis: 50%;

  @media only screen and (max-width: 940px) {
    flex-basis: 100%;
  }
`

const InputSectionInner = styled.div`
  flex-grow: 1;
  background-color: var(--color-grey-lighter);
  border-radius: 5px;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
  margin-bottom: 0;

  h2 {
    color: var(--color-grey-normal);
    font-size: 1.2rem;
    margin-top: 0;
  }

  input {
    width: auto;
  }
`
