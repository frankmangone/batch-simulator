import styled from "styled-components"
import InfoTooltip from "../forms/InfoTooltip"
import Input from "../forms/Input"
import { mobileBreakpoint } from "../../lib/breakpoints"
import { validateNotEmpty } from "../../lib/validators"
import { SCI_REGEX, SCI_POSITIVE_REGEX } from "../../constants/regexs"
import { useState } from "react"

interface ReactionParamInputCardProps {
  paramSymbol: string | JSX.Element | JSX.Element[]
  units?: JSX.Element
  value: string
  positive?: boolean
  updateValue: (value: string) => void
}

const ALLOWED_CHARS = "0123456789.-+eE"

const ReactionParamInputCard: React.FC<ReactionParamInputCardProps> = (
  props
) => {
  const { paramSymbol, value, positive = false, units, updateValue } = props
  const [valueInput, setValueInput] = useState<string>(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setValueInput("")
      return
    }

    // Filter input unallowed characters
    const filtered = event.target.value
      .split("")
      .filter((el) => ALLOWED_CHARS.indexOf(el) > -1)
      .join("")

    setValueInput(filtered)
  }

  const validateAndUpdateConstant = () => {
    if (!validateNotEmpty(valueInput)) {
      // Reset value
      setValueInput(valueInput)
      return
    }

    let validString: string | undefined

    if (positive) validString = valueInput.match(SCI_POSITIVE_REGEX)?.[0]
    else validString = valueInput.match(SCI_REGEX)?.[0]

    if (!validString) {
      // Reset value
      setValueInput(valueInput)
      return
    }

    updateValue(validString)
    setValueInput(validString)
  }

  return (
    <ParamInputWrapper>
      <ParamInputInner>
        <h1>{paramSymbol}</h1>
        <Input
          value={valueInput}
          type="text"
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
  flex-basis: 50%;
  flex-shrink: 0;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 600px) {
    flex-basis: 100%;
  }

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
  padding: 1rem 1.3rem;
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
    flex-grow: 1;

    @media screen and (max-width: ${mobileBreakpoint}px) {
      flex-basis: 0;
      flex-grow: 0;
      flex-shrink: 1;
    }

    span {
      /* Greek symbols */
      font-family: "Comfortaa", symbol;
    }
  }

  input {
    font-size: 1.4rem;
  }
`
