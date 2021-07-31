import styled from "styled-components"

/* Components */
import FieldInput from "../components/FieldInput"
import Input from "../components/Input"
import Error from "../components/Error"
import PageTitle from "../components/PageTitle"

/* Helpers */
import { validateNotEmpty, validateGreaterThan } from "../helpers/validators"

/* Hooks */
import { useData } from "../context/DataContext"
import { useFormik } from "formik"

/* Types */
import { IOperation, IOperationErrors } from "../types/Operation"

const OperationPage: React.FC = () => {
  const { operation, updateOperation } = useData()

  /**
   * Form validation function
   */
  const validate = (values: IOperation): IOperationErrors => {
    const errors: IOperationErrors = {}

    /* Reaction time validation */
    if (!validateNotEmpty(values.reactionTime))
      errors.reactionTime = "Reaction time cannot be empty"
    else if (!validateGreaterThan(values.reactionTime, 0, true))
      errors.reactionTime = "Reaction time cannot be lower than 0"

    /* Dead time validation */
    if (!validateNotEmpty(values.deadTime))
      errors.deadTime = "Reaction time cannot be empty"
    else if (!validateGreaterThan(values.deadTime, 0, true))
      errors.deadTime = "Reaction time cannot be lower than 0"

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
          <FieldInput>
            <label htmlFor="reactionTime">Reaction time:</label>
            <Input
              errors={!!formik.errors.reactionTime}
              name="reactionTime"
              type="number"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={submit}
              value={formik.values.reactionTime}
            />
            {formik.errors.reactionTime && (
              <Error>{formik.errors.reactionTime}</Error>
            )}
          </FieldInput>
          <FieldInput>
            <label htmlFor="deadTime">Dead time:</label>
            <Input
              errors={!!formik.errors.deadTime}
              name="deadTime"
              type="number"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={submit}
              value={formik.values.deadTime}
            />
            {formik.errors.deadTime && <Error>{formik.errors.deadTime}</Error>}
          </FieldInput>
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
