import styled from "styled-components"

/* Components */
import { FiEdit } from "react-icons/fi"

/* Constants */
import { COMPOUND_COLORS } from "../constants/compoundColors"

/* Hooks */
import { useEffect, useRef, useState } from "react"

/* Helpers */
import { validateNotEmpty } from "../helpers/validators"

/* Types */
import { ICompound } from "../types/Compound"

interface ICompoundCardProps {
  compound: ICompound
  editCompound: () => void
  updateCompound: (compound: ICompound) => void
  validateUnicity: (field: string, value: any) => boolean
}

const CompoundCard: React.FC<ICompoundCardProps> = (props) => {
  const { compound, editCompound, updateCompound, validateUnicity } = props
  const [symbolInput, setSymbolInput] = useState<string>(compound.symbol)

  /* Reference to Reactor liquid to change color on hover */
  const liquidRef = useRef<HTMLElement>()

  useEffect(() => {
    liquidRef.current = document.getElementById("liquid") || undefined
  }, [])

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
        onMouseEnter={() => {
          // @ts-ignore
          liquidRef.current.style.backgroundColor =
            COMPOUND_COLORS[compound.color as keyof typeof COMPOUND_COLORS]
        }}
        onMouseLeave={() => {
          // @ts-ignore
          liquidRef.current.style.backgroundColor = "hsl(213, 20%, 95%)"
        }}
      >
        <CompoundSymbolInputWrapper className="symbol-input">
          <input
            value={symbolInput}
            onBlur={validateAndUpdateSymbol}
            onChange={handleSymbolChange}
          />
        </CompoundSymbolInputWrapper>

        {/* Button to toggle modal edition */}
        <CompoundEditButton onClick={editCompound}>
          <FiEdit />
        </CompoundEditButton>

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
  flex-basis: 33%;
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
  color: #f7f3f2;
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
      transform: scale(18);
      border-color: var(--color-grey-lighter);
    }
    & > .symbol-input:after {
      margin-left: 0%;
      width: auto;
    }
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

const CompoundSymbolInputWrapper = styled.div`
  z-index: 2;

  &:after {
    content: "";
    display: block;
    height: 2px;
    margin-left: 100%;
    width: 0;
    background-color: var(--color-grey-dark);
    transition: margin-left 0.15s ease-in-out;
  }

  input {
    background-color: unset;
    border: none;
    color: var(--color-grey-dark);
    font-size: 2rem;
    margin: 0;
    outline: none;
    width: 100%;
  }
`

const CompoundEditButton = styled.button`
  align-items: center;
  align-self: stretch;
  background-color: unset;
  border: none;
  border-radius: 5px;
  color: var(--color-grey-dark);
  cursor: pointer;
  display: flex;
  opacity: 0;
  font-size: 1.6em;
  margin-left: 1rem;
  transition: all 0.15s ease-in-out;
  z-index: 2;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
