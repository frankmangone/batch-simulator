import styled from "styled-components"

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
      <CompoundEditModalInner color={compound.color} closing={closing}>
        <CloseButton onClick={handleClose} closing={closing}>
          <FiX />
        </CloseButton>
        <h1>{compound.symbol}</h1>
        <p>Concentration: {compound.concentration} mol/L</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
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

interface ICompoundEditCardWrapperProps extends IClosing {
  color: string
}

const CompoundEditModalInner = styled.div<ICompoundEditCardWrapperProps>`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;

  animation-name: slide-in;
  animation-timing-function: ease-in-out;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  background-color: ${(props) =>
    COMPOUND_COLORS[props.color as keyof typeof COMPOUND_COLORS]};
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
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
