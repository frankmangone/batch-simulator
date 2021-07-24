import styled from "styled-components"

/* Constants */
import { COMPOUND_COLORS } from "../../constants/compoundColors"

/* Helpers */
import { validateNotEmpty } from "../../helpers/validators"

/* Hooks */
import { useState } from "react"

/* Types */
import { ICompound } from "../../types/Compound"
import { IReactionCompound } from "../../types/Reaction"

interface IReactionCompoundCardProps {
  key: string
  compound: ICompound
  reactionCompound: IReactionCompound
  updateReactionCompound: (updatedReactionCompound: IReactionCompound) => void
}

const ReactionCompoundCard: React.FC<IReactionCompoundCardProps> = (props) => {
  const { compound, reactionCompound, updateReactionCompound } = props

  /* Coefficient is short for Stoichiometric Coefficient in this component */
  const [coefficientInput, setCoefficientInput] = useState<number | "">(
    reactionCompound.stoichiometricCoefficient
  )

  const handleCoefficientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "") {
      setCoefficientInput("")
      return
    }
    setCoefficientInput(parseFloat(event.target.value))
  }

  const validateAndUpdateCoefficient = () => {
    if (validateNotEmpty(coefficientInput)) {
      updateReactionCompound({
        ...reactionCompound,
        stoichiometricCoefficient: coefficientInput as number,
      })
      return
    }
    setCoefficientInput(reactionCompound.stoichiometricCoefficient)
  }

  return (
    <ReactionCompoundCardWrapper
      color={compound.color as keyof typeof COMPOUND_COLORS}
    >
      <h1>{compound.symbol}</h1>
      <input
        value={coefficientInput}
        type="number"
        onChange={handleCoefficientChange}
        onBlur={validateAndUpdateCoefficient}
      />
    </ReactionCompoundCardWrapper>
  )
}

export default ReactionCompoundCard

interface IReactionCompoundCardWrapperProps {
  color: keyof typeof COMPOUND_COLORS
}

const ReactionCompoundCardWrapper = styled.div<IReactionCompoundCardWrapperProps>`
  margin: 5px;
  padding: 20px;
  position: relative;

  align-items: center;
  animation-name: slide-in;
  animation-timing-function: ease-in-out;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  background-color: ${(props) => COMPOUND_COLORS[props.color]};
  border-radius: 5px;
  color: var(--color-grey-dark);
  display: flex;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    & {
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
  }

  h1 {
    flex-grow: 1;
    font-size: 1.8rem;
    margin: 0;
  }

  input {
    font-size: 1.3rem;
    width: 0px;
  }
`
