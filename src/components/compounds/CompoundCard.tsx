import styled from "styled-components"

/* Components */
import CardButton from "../CardButton"
import { FiEdit, FiTrash2 } from "react-icons/fi"

/* Constants */
import { COMPOUND_COLORS } from "../../constants/compoundColors"

/* Hooks */
import { useEffect, useState } from "react"

/* Helpers */
import { validateNotEmpty } from "../../helpers/validators"

/* Types */
import { Compound } from "../../types/Compound"

interface ICompoundCardProps {
  compound: Compound
  editCompound: () => void
  updateCompound: (compound: Compound) => void
  validateUnicity: (field: string, value: any) => boolean
  removeCompound: () => void
}

const CompoundCard: React.FC<ICompoundCardProps> = (props) => {
  const {
    compound,
    editCompound,
    updateCompound,
    removeCompound,
    validateUnicity,
  } = props
  const [symbolInput, setSymbolInput] = useState<string>(compound.symbol)

  /* Reference to Reactor liquid to change color on hover */
  // const liquidRef = useRef<HTMLElement>()

  // useEffect(() => {
  //   liquidRef.current = document.getElementById("liquid") || undefined
  // }, [])

  /**
   * Update symbol input on compound update
   */
  useEffect(() => {
    setSymbolInput(compound.symbol)
  }, [compound])

  /**
   * Form submission handling
   */
  const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbolInput(event.target.value)
  }

  const validateAndUpdateSymbol = () => {
    if (
      validateNotEmpty(symbolInput) &&
      validateUnicity("symbol", symbolInput)
    ) {
      /* Update symbol */
      const updatedCompound = { ...compound }
      updatedCompound.symbol = symbolInput
      updateCompound(updatedCompound)
    } else {
      /* Reset input initial state */
      setSymbolInput(compound.symbol)
    }
  }

  /**
   * Toggling
   */

  return (
    <CompoundCardWrapper>
      <CompoundCardInner
      // onMouseEnter={() => {
      //   // @ts-ignore
      //   liquidRef.current.style.backgroundColor =
      //     COMPOUND_COLORS[compound.color as keyof typeof COMPOUND_COLORS]
      // }}
      // onMouseLeave={() => {
      //   // @ts-ignore
      //   liquidRef.current.style.backgroundColor = "hsl(213, 20%, 95%)"
      // }}
      >
        <SymbolInput
          value={symbolInput}
          onBlur={validateAndUpdateSymbol}
          onChange={handleSymbolChange}
        />

        {/* Button to toggle modal edition */}
        <CardButton onClick={editCompound}>
          <FiEdit />
        </CardButton>

        {/* Button to delete the compound */}
        <CardButton onClick={removeCompound}>
          <FiTrash2 />
        </CardButton>

        {/* Bullet to display the color associated with the compound */}
        <CompoundColorBullet
          className="bullet"
          color={compound.color as keyof typeof COMPOUND_COLORS}
        />
      </CompoundCardInner>
    </CompoundCardWrapper>
  )
}

export default CompoundCard

/**
 * Styled components
 */

const CompoundCardWrapper = styled.li`
  flex-basis: 25%;

  @media only screen and (max-width: 1200px) {
    flex-basis: 33.3%;
  }

  @media only screen and (max-width: 960px) {
    flex-basis: 50%;
  }

  @media only screen and (max-width: 520px) {
    flex-basis: 100%;
  }
`

const CompoundCardInner = styled.div`
  margin: 5px;
  padding: 20px;
  position: relative;

  align-items: center;
  animation-name: slide-in;
  animation-timing-function: ease-in-out;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  background-color: var(--color-grey-lighter);
  border-radius: 5px;
  display: flex;
  color: var(--color-grey-lightest);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.15s ease-in-out;

  &:hover {
    & {
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    & > button {
      opacity: 1;
    }

    & > .bullet {
      transform: scale(60);
      border-color: var(--color-grey-lighter);
    }
    & > .symbol-input:after {
      margin-left: 0%;
      width: auto;
    }
  }

  button {
    padding: 0.8rem;
  }
`

interface ICompoundColorBulletProps {
  color: keyof typeof COMPOUND_COLORS
}

const CompoundColorBullet = styled.div<ICompoundColorBulletProps>`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  z-index: 1;

  background-color: ${(props) => COMPOUND_COLORS[props.color]};
  border: 1px solid var(--color-grey-light);
`

const SymbolInput = styled.input`
  font-size: 2rem;
  margin-left: 0;
  margin-right: 0.5rem;
  z-index: 2;
`
