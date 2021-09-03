import styled from "styled-components"
import { useData } from "../../context/DataContext"
import { FiSquare, FiCheckSquare } from "react-icons/fi"
import { COMPOUND_COLORS } from "../../constants/compoundColors"
import type { Dispatch, SetStateAction } from "react"

interface VariableCheckboxesProps {
  selectedVariables: number[]
  setSelectedVariables: Dispatch<SetStateAction<number[]>>
}

const VariableCheckboxes = (props: VariableCheckboxesProps) => {
  const { selectedVariables, setSelectedVariables } = props
  const { compounds } = useData()

  const toggleIndex = (compoundIndex: number): void => {
    const foundIndex = selectedVariables.findIndex(
      (value) => value === compoundIndex
    )
    if (foundIndex === -1) {
      // Add variable to selected ones
      setSelectedVariables([...selectedVariables, compoundIndex])
      return
    }

    // Remove from selected ones if found
    setSelectedVariables([
      ...selectedVariables.slice(0, foundIndex),
      ...selectedVariables.slice(foundIndex + 1, selectedVariables.length),
    ])
  }

  return (
    <Wrapper>
      {compounds.map((compound, index) => {
        const color =
          COMPOUND_COLORS[compound.color as keyof typeof COMPOUND_COLORS]
        return (
          <CheckboxWrapper onClick={() => toggleIndex(index)} key={compound.id}>
            <ColorBadge color={color} />
            <CompoundSymbol>{compound.symbol}</CompoundSymbol>
            {selectedVariables.includes(index) ? (
              <FiCheckSquare />
            ) : (
              <FiSquare />
            )}
          </CheckboxWrapper>
        )
      })}
    </Wrapper>
  )
}

export default VariableCheckboxes

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const CheckboxWrapper = styled.button`
  background-color: var(--color-grey-light);
  border-radius: 5px;
  border: none;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  display: flex;
`

interface ColorBadgeProps {
  color: string
}

const ColorBadge = styled.div<ColorBadgeProps>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 1rem;
  box-shadow: 0 2px 5px -2px var(--color-grey-normal);
`

const CompoundSymbol = styled.span`
  flex-grow: 1;
  text-align: left;
`
