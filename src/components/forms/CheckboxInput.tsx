import styled from "styled-components"

/* Components */
import Error from "./Error"
import InfoTooltip from "./InfoTooltip"
import { FaCheck } from "react-icons/fa"

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
      <Checkbox onClick={onToggle} toggled={!!value}>
        {value && <FaCheck size={10} />}
      </Checkbox>
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

interface CheckboxProps {
  toggled?: boolean
}

const Checkbox = styled.div<CheckboxProps>`
  width: 0.8rem;
  height: 0.8rem;
  border: 2px solid var(--color-grey-normal);
  background-color: ${(props) =>
    props.toggled ? "var(--color-grey-normal)" : "var(--color-grey-lightest)"};
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;

  svg {
    fill: var(--color-grey-lightest);
  }
`
