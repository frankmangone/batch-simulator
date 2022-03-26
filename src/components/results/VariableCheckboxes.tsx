import React from "react"
import styled from "styled-components"
import useCompounds from "../../hooks/entities/useCompounds"
import useSettings from "../../hooks/useSettings"
import Checkbox from "../forms/Checkbox"
import Show from "../Show"
import { COMPOUND_COLORS } from "../../constants/compoundColors"
import type { Dispatch, SetStateAction } from "react"

interface VariableCheckboxesProps {
  selectedVariables: number[]
  setSelectedVariables: Dispatch<SetStateAction<number[]>>
  temperatureSelected: boolean
  setTemperatureSelected: Dispatch<SetStateAction<boolean>>
}

const VariableCheckboxes: React.VFC<VariableCheckboxesProps> = (props) => {
  const {
    selectedVariables,
    setSelectedVariables,
    temperatureSelected,
    setTemperatureSelected,
  } = props

  const { compounds } = useCompounds()
  const { settings } = useSettings()

  const isToggled = (compoundIndex: number): boolean => {
    const foundIndex = selectedVariables.findIndex(
      (value) => value === compoundIndex
    )
    if (foundIndex === -1) return false
    return true
  }

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

  const toggleTemperature = (): void => {
    if (!temperatureSelected) {
      setTemperatureSelected(true)
      setSelectedVariables([])
      return
    }

    setTemperatureSelected(false)
  }

  return (
    <Wrapper>
      {compounds.map((compound, index) => {
        const color =
          COMPOUND_COLORS[compound.color as keyof typeof COMPOUND_COLORS]
        return (
          <CheckboxWrapper
            onClick={() => toggleIndex(index)}
            toggled={isToggled(index)}
            key={compound.id}
            color={color}
          >
            <ColorBadge color={color} toggled={isToggled(index)} />
            <CompoundSymbol>{compound.symbol}</CompoundSymbol>
            <Checkbox
              toggled={!!selectedVariables.includes(index)}
              onToggle={() => {}}
            />
          </CheckboxWrapper>
        )
      })}

      {/* Temperature */}
      <Show when={!settings.isothermic}>
        <CheckboxWrapper
          onClick={toggleTemperature}
          toggled={temperatureSelected}
          color="#000"
        >
          <ColorBadge color="#000" toggled={temperatureSelected} />
          <CompoundSymbol>Temperature</CompoundSymbol>
          <Checkbox toggled={temperatureSelected} onToggle={() => {}} />
        </CheckboxWrapper>
      </Show>
    </Wrapper>
  )
}

export default VariableCheckboxes
interface CheckboxProps {
  color: string
  toggled: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const CheckboxWrapper = styled.button<CheckboxProps>`
  background-color: ${(props) =>
    props.toggled ? "var(--color-grey-lighter)" : "var(--color-grey-light)"};
  border-radius: 5px;
  border: 2px solid
    ${(props) => (props.toggled ? props.color : "var(--color-grey-light)")};
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${(props) =>
      props.toggled
        ? "var(--color-grey-lightest)"
        : "var(--color-grey-lighter)"};
    border: 2px solid
      ${(props) => (props.toggled ? props.color : "var(--color-grey-lighter)")};
  }
`

const ColorBadge = styled.div<CheckboxProps>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 1rem;
  box-shadow: ${(props) =>
    props.toggled ? "" : "0 2px 5px -2px var(--color-grey-normal)"};
`

const CompoundSymbol = styled.span`
  flex-grow: 1;
  text-align: left;
  font-size: 1rem;
`
