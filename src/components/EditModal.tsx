import styled from "styled-components"

/* Components */
import { FiX } from "react-icons/fi"

/* Hooks */
import { useEffect } from "react"

export interface IClosing {
  closing?: boolean
}

type EditModalProps = IClosing & {
  setClosing: (closing: boolean) => void
  handleClose: () => void
}

const EditModal: React.FC<EditModalProps> = (props) => {
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
    <EditModalWrapper closing={closing}>
      <EditModalInner closing={closing}>
        <CloseButton onClick={closeModal} closing={closing}>
          <FiX />
        </CloseButton>
        {children}
      </EditModalInner>
    </EditModalWrapper>
  )
}

export default EditModal

const EditModalWrapper = styled.div<IClosing>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.15);

  animation-name: dim-in;
  animation-timing-function: ease-in-out;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  display: flex;
  align-items: center;
  justify-content: center;

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
      background-color: rgba(0, 0, 0, 0.15);
    }
  }

  @keyframes dim-out {
    from {
      background-color: rgba(0, 0, 0, 0.15);
    }

    to {
      background-color: rgba(0, 0, 0, 0);
    }
  }
`

const EditModalInner = styled.div<IClosing>`
  animation-name: slide-in;
  animation-timing-function: ease-in-out;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  background-color: var(--color-grey-lighter);
  border: 1px solid var(--color-grey-lightest);
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  flex-grow: 1;
  margin: 10px;
  padding: 2rem;
  padding-top: 3.5rem;
  position: relative;
  max-width: 700px;
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
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
    color: var(--color-grey-darker);
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
