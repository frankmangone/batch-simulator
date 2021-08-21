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
import { Operation, OperationErrors } from "../types/Operation"

const OperationPage: React.FC = () => {
  const { operation, updateOperation } = useData()

  /**
   * Form validation function
   */
  const validate = (values: Operation): OperationErrors => {
    const errors: OperationErrors = {}

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
    initialValues: { ...operation },
    validate,
    onSubmit: (values) => {
      updateOperation(values)
    },
  })

  const submit = () => {
    formik.handleSubmit()
  }

  return (
    <>
      <PageTitle>Operation</PageTitle>

      <form>
        <InputSection>
          <h2>Operating times</h2>
          <FieldInput
            fieldName="reactionTime"
            label="Reaction time:"
            error={formik.errors.reactionTime}
            type="number"
            onBlur={() => {
              submit()
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              formik.handleChange(event)
            }}
            value={formik.values.reactionTime}
          />

          <FieldInput
            fieldName="deadTime"
            label="Dead time:"
            error={formik.errors.deadTime}
            tooltip="Time needed for discharge, cleaning, etc."
            type="number"
            onBlur={() => {
              submit()
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              formik.handleChange(event)
            }}
            value={formik.values.deadTime}
          />

          <FieldInput
            fieldName="timeStep"
            label="Time step:"
            error={formik.errors.timeStep}
            tooltip="Small time interval for numerical calculation purposes"
            type="number"
            onBlur={() => {
              submit()
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              formik.handleChange(event)
            }}
            value={formik.values.timeStep}
          />
        </InputSection>
      </form>
    </>
  )
}

export default OperationPage

const InputSection = styled.div`
  display: flex;
  background-color: var(--color-grey-lighter);
  border-radius: 5px;
  flex-direction: column;
  margin-top: 2rem;
  padding: 1rem;

  h2 {
    color: var(--color-grey-normal);
    font-size: 1.2rem;
    margin-top: 0;
  }
`
