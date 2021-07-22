import styled from "styled-components"
import { useFormik } from "formik"

/* Components */
import Button from './Button'
import { FiX } from "react-icons/fi"

/* Constants */
import { COMPOUND_COLORS } from "../constants/compoundColors"

/* Helpers */
import { validateNotEmpty, validateGreaterThan } from '../helpers/validators'

/* Hooks */
import { useState } from "react"
import { useData } from '../context/DataContext'

/* Types */
import { ICompound } from "../types/Compound"

interface ICompoundEditCardProps {
  compound: ICompound
  closeModal: () => void
}

const CompoundEditModal: React.FC<ICompoundEditCardProps> = (props) => {
  const { compound, closeModal } = props
  const { compounds } = useData()
  const [closing, setClosing] = useState<boolean>(false)

  /**
   * Validate method for Formik
   */
  interface IErrors  {
    symbol?: string
    concentration?: string
    name?: string
  }

  const validate = (values: ICompound) => {
    const errors: IErrors = {}

    /* Symbol validation */
    if (!validateNotEmpty(values.symbol)) errors.symbol = 'Symbol cannot be empty'
    else if (!validateUnicity('symbol', values.symbol)) errors.symbol = 'Symbol is already used'

    /* Concentration validation */
    if (!validateNotEmpty(values.concentration)) errors.concentration = 'Concentration cannot be empty'
    if (!validateGreaterThan(values.concentration, 0, true)) errors.concentration = 'Concentration cannot lower than 0'
  
    return errors
  }

  const validateUnicity = (field: string, value: any): boolean => {
    const index = compounds.findIndex((comp) => comp.id === compound.id)
    for (var i = 0; i < compounds.length; i++) {
      // @ts-ignore
      if (i !== index && compounds[i][field] === value) {
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
      alert(JSON.stringify(values, null, 2))
    },
  })

  const handleClose = () => {
    /**
     * Animate and close modal after slide animation
     */
    setClosing(true)
    setTimeout(() => {
      closeModal()
    }, 250)
  }

  return (
    <CompoundEditModalWrapper closing={closing}>
      <CompoundEditModalInner closing={closing}>
        <CloseButton onClick={handleClose} closing={closing}>
          <FiX />
        </CloseButton>
        <form onSubmit={formik.handleSubmit}>
          <SymbolFieldInput color={compound.color}>
            <label htmlFor="symbol">Symbol:</label>
            <input
              name="symbol"
              autoComplete="off"
              color={compound.color}
              onChange={formik.handleChange}
              value={formik.values.symbol}
            />
            { formik.errors.symbol && <p>{formik.errors.symbol}</p> }
          </SymbolFieldInput>

          <FieldInput>
            <label htmlFor="concentration">Concentration [mol/L]:</label>
            <input
              name="concentration"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.concentration}
            />
            { formik.errors.concentration && <p>{formik.errors.concentration}</p> }
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
          <SubmitButton color='green'>Done</SubmitButton>
        </form>
      </CompoundEditModalInner>
    </CompoundEditModalWrapper>
  )
}

export default CompoundEditModal

/**
 * Styled components
 */

interface IClosing {
  closing: boolean
}

const CompoundEditModalWrapper = styled.div<IClosing>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);

  animation-name: dim-in;
  animation-timing-function: ease-in-out;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  display: flex;
  flex-direction: column;

  /* Override animation upon modal close */
  ${(props) =>
    props.closing
      ? `
    animation-name: dim-out;
    animation-timing-function: ease-in-out;
    animation-duration: 0.25s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  `
      : ""}

  @keyframes dim-in {
    from {
      background-color: rgba(0, 0, 0, 0);
    }

    to {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  @keyframes dim-out {
    from {
      background-color: rgba(0, 0, 0, 0.2);
    }

    to {
      background-color: rgba(0, 0, 0, 0);
    }
  }
`

const CompoundEditModalInner = styled.div<IClosing>`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;

  animation-name: slide-in;
  animation-timing-function: ease-in-out;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  background-color: var(--color-grey-lighter);
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding: 2rem;
  z-index: 3;

  /* Override animation upon modal close */
  ${(props) =>
    props.closing
      ? `
    animation-name: slide-out;
    animation-timing-function: ease-in-out;
    animation-duration: 0.25s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  `
      : ""}

  label {
    color: var(--color-grey-dark);
  }

  input {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    flex-grow: 1;
    min-width: 0;
    margin-left: 1rem;
    padding: 0.5rem 1rem;

    &:hover, &:focus {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &:autofill {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &:focus {
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
    }
  }
`

const CloseButton = styled.button<IClosing>`
  position: absolute;
  top: 10px;
  right: 10px;

  align-items: center;
  background-color: unset;
  border: none;
  border-radius: 5px;
  display: flex;
  ${(props) => (props.closing ? "disabled: true;" : "")}
  font-size: 1.3rem;
  padding: 0.5rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const FieldInput = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  flex-wrap: wrap;
  padding: 0.5rem;
`

interface ISymbolInputProps {
  color: string
}

const SymbolFieldInput = styled.div<ISymbolInputProps>`
  align-items: flex-start;
  align-self: stretch;
  background-color: ${(props) =>
    COMPOUND_COLORS[props.color as keyof typeof COMPOUND_COLORS]};
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  display: flex;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  
  label {
    font-size: 1.5rem;
  }

  input {
    font-size: 3rem;
    margin-left: 1rem;
  }
`

const SubmitButton = styled(Button)`
  font-size: 1.2rem;
  justify-content: center;
  margin-top: 2rem;
  margin-left: 10%;
  padding: 0.5rem;
  width: 80%;
`
