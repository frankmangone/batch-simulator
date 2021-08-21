import styled from "styled-components"

/* Components */
import { FiX } from "react-icons/fi"

/* Hooks */
import { useEffect } from "react"

/* Types */
import { FCWithChildren } from "../types/FCWithChildren"

export interface IClosing {
  closing?: boolean
}

type IEditModalProps = IClosing &
  FCWithChildren & {
    setClosing: (closing: boolean) => void
    handleClose: () => void
  }

const EditModal: React.FC<IEditModalProps> = (props) => {
  const { children, closing, setClosing, handleClose } = props

  const closeModal = () => {
    /**
     * Animate and close modal after slide animation
     */
    setClosing(true)
    setTimeout(() => {
      handleClose()
    }, 250)
  }

  useEffect(() => {
    if (closing) {
      closeModal()
    }
    // eslint-disable-next-line
  }, [closing])

  return (
    <CompoundEditModalWrapper closing={closing}>
      <CompoundEditModalInner closing={closing}>
        <CloseButton onClick={closeModal} closing={closing}>
          <FiX />
        </CloseButton>
        {children}
      </CompoundEditModalInner>
    </CompoundEditModalWrapper>
  )
}

export default EditModal

const CompoundEditModalWrapper = styled.div<IClosing>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100%;
  background-color: var(--color-grey-light);

  animation-name: dim-in;
  animation-timing-function: ease-in-out;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  border-radius: 5px;
  display: flex;

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
  align-self: stretch;
  animation-name: slide-in;
  animation-timing-function: ease-in-out;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  background-color: var(--color-grey-lighter);
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  flex-grow: 1;
  margin: 10px;
  padding: 2rem;
  padding-top: 3.5rem;
  position: relative;
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
    padding: 0.5rem 1rem;

    &:hover,
    &:focus {
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
  margin-bottom: 1rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
