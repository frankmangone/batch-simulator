import styled from "styled-components"
import EditModal from "../EditModal"
import CompoundInputField from "./CompoundInputField"
import SubmitButton from "../SubmitButton"
import { validateNotEmpty, validateGreaterThan } from "../../lib/validators"
import { useState } from "react"
import { useFormik } from "formik"
import useCompounds from "../../hooks/entities/useCompounds"
import useUnits from "../../hooks/useUnits"

interface CompoundEditModalProps {
  compound: Compound
  closeModal: () => void
}

interface Errors {
  symbol?: string
  concentration?: string
  name?: string
  molecularWeight?: string
}

const CompoundEditModal: React.FC<CompoundEditModalProps> = (props) => {
  const { compound, closeModal } = props
  const { compounds, updateCompound } = useCompounds()
  const [closing, setClosing] = useState<boolean>(false)
  const compoundIndex = compounds.findIndex((comp) => comp.id === compound.id)

  const { molarUnits, massUnits, volumeUnits } = useUnits()

  /**
   * Validate method for Formik
   */

  const validate = (values: CompoundInput): Errors => {
    const errors: Errors = {}

    /* Symbol validation */
    if (!validateNotEmpty(values.symbol))
      errors.symbol = "Symbol cannot be empty"
    else if (!validateUnicity("symbol", values.symbol))
      errors.symbol = "Symbol is already used"

    /* Concentration validation */
    if (!validateNotEmpty(values.concentration))
      errors.concentration = "Concentration cannot be empty"
    else if (!validateGreaterThan(values.concentration, 0, true))
      errors.concentration = "Concentration cannot be lower than 0"

    /* Molecular weight validation */
    if (!validateNotEmpty(values.molecularWeight))
      errors.molecularWeight = "Molecular weight cannot be empty"
    else if (!validateGreaterThan(values.molecularWeight, 0, true))
      errors.molecularWeight = "Molecular weight cannot be lower than 0"

    return errors
  }

  const validateUnicity = (field: string, value: any): boolean => {
    for (var i = 0; i < compounds.length; i++) {
      if (
        i !== compoundIndex &&
        compounds[i][field as keyof Compound] === value
      ) {
        return false
      }
    }
    return true
  }

  /**
   * Formik form initialization
   */
  const formik = useFormik<CompoundInput>({
    initialValues: {
      symbol: compound.symbol,
      concentration: compound.concentration,
      name: compound.name,
      molecularWeight: compound.molecularWeight,
    },
    validate,
    onSubmit: (values) => {
      const updatedCompound = { ...compound, ...values }
      updateCompound(compound.id, updatedCompound)
      window.scrollTo({ top: 0, behavior: "smooth" })
      setClosing(true)
    },
  })

  return (
    <EditModal
      closing={closing}
      setClosing={setClosing}
      handleClose={closeModal}
    >
      <Form onSubmit={formik.handleSubmit}>
        <CompoundInputField
          fieldName="symbol"
          label="Symbol:"
          color={compound.color}
          formik={formik}
        />

        <CompoundInputField
          fieldName="concentration"
          label={`Initial concentration [${molarUnits}/${volumeUnits}]:`}
          formik={formik}
        />

        <CompoundInputField
          fieldName="molecularWeight"
          label={`Molecular weight [${massUnits}/${molarUnits}]:`}
          formik={formik}
        />

        <CompoundInputField
          fieldName="name"
          label="Compound name (optional):"
          formik={formik}
        />

        <SubmitButton color="green" type="submit">
          Done
        </SubmitButton>
      </Form>
    </EditModal>
  )
}

export default CompoundEditModal

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
