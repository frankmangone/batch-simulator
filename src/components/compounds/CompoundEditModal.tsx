import styled from "styled-components"
import { useFormik } from "formik"

/* Components */
import EditModal from "../EditModal"
import FieldInput from "../FieldInput"
import SubmitButton from "../SubmitButton"

/* Helpers */
import { validateNotEmpty, validateGreaterThan } from "../../helpers/validators"

/* Hooks */
import { useState } from "react"
import useCompounds from "../../hooks/useCompounds"
import useSettings from "../../hooks/useSettings"

/* Types */
import { Compound } from "../../types/Compound"

interface ICompoundEditModalProps {
  compound: Compound
  closeModal: () => void
}

const CompoundEditModal: React.FC<ICompoundEditModalProps> = (props) => {
  const { compound, closeModal } = props
  const { compounds, updateCompound } = useCompounds()
  const { settings } = useSettings()
  const [closing, setClosing] = useState<boolean>(false)
  const compoundIndex = compounds.findIndex((comp) => comp.id === compound.id)

  /**
   * Validate method for Formik
   */
  interface IErrors {
    symbol?: string
    concentration?: string
    name?: string
    molecularWeight?: string
  }

  const validate = (values: Compound): IErrors => {
    const errors: IErrors = {}

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
      // @ts-ignore
      if (i !== compoundIndex && compounds[i][field] === value) {
        return false
      }
    }
    return true
  }

  /**
   * Formik form initialization
   */
  const formik = useFormik({
    // @ts-ignore
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
        <FieldInput
          fieldName="symbol"
          label="Symbol:"
          error={formik.errors.symbol}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            formik.handleChange(event)
          }}
          value={formik.values.symbol}
          color={compound.color}
          row
          big
        />

        <FieldInput
          fieldName="concentration"
          label={`Initial concentration [${settings.molarUnits}/${settings.volumeUnits}]:`}
          error={formik.errors.concentration}
          tooltip="Concentration in the loaded mixture"
          type="number"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            formik.handleChange(event)
          }}
          value={formik.values.concentration}
        />

        <FieldInput
          fieldName="molecularWeight"
          label={`Molecular weight [${settings.massUnits}/${settings.molarUnits}]:`}
          error={formik.errors.molecularWeight}
          type="number"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            formik.handleChange(event)
          }}
          value={formik.values.molecularWeight}
        />

        <FieldInput
          fieldName="name"
          label="Compound name (optional):"
          error={formik.errors.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            formik.handleChange(event)
          }}
          value={formik.values.name}
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
