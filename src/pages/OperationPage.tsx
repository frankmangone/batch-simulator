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
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
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
            type="number"
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
              submit()
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              formik.handleChange(event)
            }}
            value={formik.values.deadTime}
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
