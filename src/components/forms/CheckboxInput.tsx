import styled from "styled-components"

/* Components */
import Error from "./Error"
import InfoTooltip from "./InfoTooltip"
import Checkbox from "./Checkbox"

/* Types */
import type { FormikProps } from "formik"

/*********************************
 * CAUTION: This checkbox only works inside a formik form
 *********************************/

interface CheckboxInputProps<T> {
  error?: string
  fieldName: string
  formik: FormikProps<T>
  label: string
  tooltip?: string
}

const CheckboxInput = <T extends unknown>(props: CheckboxInputProps<T>) => {
  const { fieldName, formik, label, tooltip } = props

  const key = fieldName as keyof typeof formik.values
  const value = formik.values[key]
  const error = formik.errors[key]

  const onToggle = () => {
    formik.setFieldValue(fieldName, !formik.values[key], false)
    formik.handleSubmit()
  }

  return (
    <CheckboxInputWrapper>
      <Checkbox onToggle={onToggle} toggled={!!value} />
      <LabelWrapper>
        <label htmlFor={fieldName}>{label}</label>
        {tooltip && <InfoTooltip text={tooltip} />}
      </LabelWrapper>
      {error && <Error>{error}</Error>}
    </CheckboxInputWrapper>
  )
}

export default CheckboxInput

const CheckboxInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  padding: 0.5rem;
  position: relative;

  label {
    font-weight: 600;
    color: var(--color-grey-dark);
  }

  &:hover > .error {
    opacity: 1 !important;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
