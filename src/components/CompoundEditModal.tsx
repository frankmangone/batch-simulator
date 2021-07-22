import styled from "styled-components"
import { useFormik } from "formik"

/* Components */
import { FiX } from "react-icons/fi"

/* Constants */
import { COMPOUND_COLORS } from "../constants/compoundColors"

/* Hooks */
import { useState } from "react"

/* Types */
import { ICompound } from "../types/Compound"

interface ICompoundEditCardProps {
  compound: ICompound
  closeModal: () => void
}

const CompoundEditModal: React.FC<ICompoundEditCardProps> = (props) => {
  const { compound, closeModal } = props
  const [closing, setClosing] = useState<boolean>(false)

  /**
   * Formik form initialization
   */
  const formik = useFormik({
    initialValues: {
      symbol: compound.symbol,
      concentration: compound.concentration,
      name: compound.name,
    },
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
              color={compound.color}
              onChange={formik.handleChange}
              value={formik.values.symbol}
            />
          </SymbolFieldInput>

          <FieldInput>
            <label htmlFor="concentration">Concentration:</label>
            <input
              name="concentration"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.concentration}
            />
          </FieldInput>

          <FieldInput>
            <label htmlFor="name">Compound name (optional):</label>
            <input
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FieldInput>
        </form>
        {/* <h1>{compound.symbol}</h1>
        <p>Concentration: {compound.concentration} mol/L</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p> */}
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
    border-radius: 5px;
    padding: 0.3rem 1rem;
    min-width: 0;
    background-color: rgba(0, 0, 0, 0.1);

    &:hover, &:focus {
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
  align-items: flex-end;
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
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  
  input {
    font-size: 3rem;
    margin-left: 1rem;
  }
`
