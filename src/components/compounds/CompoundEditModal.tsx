import styled from "styled-components"
import { useFormik } from "formik"

/* Components */
import Error from "../Error"
import Input from "../Input"
import EditModal from "../EditModal"
import SubmitButton from "../SubmitButton"

/* Constants */
import { COMPOUND_COLORS } from "../../constants/compoundColors"

/* Helpers */
import { validateNotEmpty, validateGreaterThan } from "../../helpers/validators"

/* Hooks */
import { useState } from "react"
import { useData } from "../../context/DataContext"

/* Types */
import { ICompound } from "../../types/Compound"

interface ICompoundEditModalProps {
  compound: ICompound
  closeModal: () => void
}

const CompoundEditModal: React.FC<ICompoundEditModalProps> = (props) => {
  const { compound, closeModal } = props
  const { compounds, updateCompound } = useData()
  const [closing, setClosing] = useState<boolean>(false)
  const compoundIndex = compounds.findIndex((comp) => comp.id === compound.id)

  /**
   * Validate method for Formik
   */
  interface IErrors {
    symbol?: string
    concentration?: string
    name?: string
  }

  const validate = (values: ICompound) => {
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
    },
    validate,
    onSubmit: (values) => {
      const updatedCompound = { ...compound, ...values }
      updateCompound(compoundIndex, updatedCompound)
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
      <form onSubmit={formik.handleSubmit}>
        <SymbolFieldInput color={compound.color}>
          <label htmlFor="symbol">Symbol:</label>
          <Input
            errors={!!formik.errors.symbol}
            name="symbol"
            autoComplete="off"
            color={compound.color}
            onChange={formik.handleChange}
            value={formik.values.symbol}
          />
          {formik.errors.symbol && <Error>{formik.errors.symbol}</Error>}
        </SymbolFieldInput>

        <FieldInput>
          <label htmlFor="concentration">Concentration [mol/L]:</label>
          <Input
            errors={!!formik.errors.concentration}
            name="concentration"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.concentration}
          />
          {formik.errors.concentration && (
            <Error>{formik.errors.concentration}</Error>
          )}
        </FieldInput>

        <FieldInput>
          <label htmlFor="name">Compound name (optional):</label>
          <input
            name="name"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </FieldInput>
        <SubmitButton color="green" type="submit">
          Done
        </SubmitButton>
      </form>
    </EditModal>
  )
}

export default CompoundEditModal

/**
 * Styled components
 */

const FieldInput = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  padding: 0.5rem;
  position: relative;

  &:hover > .error {
    opacity: 1 !important;
  }
`

interface ISymbolInputProps {
  color: string
}

const SymbolFieldInput = styled(FieldInput)<ISymbolInputProps>`
  align-items: flex-start;
  background-color: ${(props) =>
    COMPOUND_COLORS[props.color as keyof typeof COMPOUND_COLORS]};
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.5rem;
  padding: 1rem;

  label {
    font-size: 1.5rem;
  }

  input {
    font-size: 3rem;
    margin-left: 1rem;
    width: 0;
  }
`
