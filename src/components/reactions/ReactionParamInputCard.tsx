import styled from "styled-components"

/* Components */
import InfoTooltip from "../InfoTooltip"

/* Helpers */
import { validateNotEmpty } from "../../helpers/validators"

/* Hooks */
import { useState } from "react"

interface IReactionParamInputCardProps {
  paramSymbol: string | JSX.Element | JSX.Element[]
  units?: JSX.Element
  value: number
  updateValue: (value: number) => void
}

const ReactionParamInputCard: React.FC<IReactionParamInputCardProps> = (
  props
) => {
  const { paramSymbol, value, units, updateValue } = props
  const [valueInput, setValueInput] = useState<number | "">(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setValueInput("")
      return
    }
    setValueInput(parseFloat(event.target.value))
  }

  const validateAndUpdateConstant = () => {
    if (validateNotEmpty(valueInput)) {
      updateValue(valueInput as number)
      return
    }
    setValueInput(value)
  }

  return (
    <ParamInputWrapper>
      <ParamInputInner>
        <h1>{paramSymbol}</h1>
        <input
          value={valueInput}
          type="number"
          onChange={handleChange}
          onBlur={validateAndUpdateConstant}
        />
        {units && <InfoTooltip text={units} />}
      </ParamInputInner>
    </ParamInputWrapper>
  )
}

export default ReactionParamInputCard

const ParamInputWrapper = styled.div`
  flex-basis: 25%;
  position: relative;
  z-index: 2;

  &:hover {
    z-index: 3;
  }
`

const ParamInputInner = styled.div`
  position: relative;
  align-items: center;
  background-color: var(--color-grey-light);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  margin: 0.5rem;
  padding: 1.3rem;
  transition: all 0.15s ease-in-out;

  &:hover {
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  h1 {
    color: var(--color-grey-dark);
    font-size: 1.6rem;
    margin: 0;
    margin-right: 1rem;

    span {
      /* Greek symbols */
      font-family: "Comfortaa", symbol;
    }
  }

  input {
    font-size: 1.4rem;
  }
`
