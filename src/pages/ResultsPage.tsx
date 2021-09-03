import styled from "styled-components"

/* Components */
import PageTitle from "../components/PageTitle"
import Select from "../components/Select"
import Button from "../components/Button"
import Plot from "../components/Plot"
import SidebarOptions from "../components/results/SidebarOptions"

/* Constants */
import { COMPOUND_COLORS } from "../constants/compoundColors"

/* Hooks */
import { useMemo, useState } from "react"
import { useData } from "../context/DataContext"
import useGetData from "../hooks/useGetData"

import type { Point } from "../hooks/useGetData"

const ResultsPage: React.FC = () => {
  const { variableData } = useGetData()
  const { compounds } = useData()
  const [selectedVariableIndex, setSelectedVariableIndex] = useState<number>(0)
  const [selectedVariables, setSelectedVariables] = useState<number[]>([
    0, 1, 2,
  ])
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false)

  const toggleOptionsVisible = () => setOptionsVisible(!optionsVisible)

  /* Derived state from selectedVariable */

  const [data, colors] = useMemo(() => {
    const data: Point[][] = []
    const colors: string[] = []

    selectedVariables.forEach((compoundIndex: number) => {
      const selectedCompound = compounds[compoundIndex]
      const compoundData: Point[] = variableData(`[${selectedCompound.symbol}]`)
      data.push(compoundData)
      colors.push(
        COMPOUND_COLORS[selectedCompound.color as keyof typeof COMPOUND_COLORS]
      )
    })

    return [data, colors]
    // eslint-disable-next-line
  }, [selectedVariables])
  // const selectedCompound = compounds[selectedVariableIndex]
  // const data = variableData(`[${selectedCompound.symbol}]`)

  return (
    <>
      <PageTitle>Results</PageTitle>
      <OptionsButton onClick={toggleOptionsVisible}>Options</OptionsButton>
      {/* <SelectWrapper>
        <p>Variable:</p>
        <Select
          initialValue={{
            value: 0,
            displayText: selectedCompound.symbol,
            collapsedDisplayText: selectedCompound.symbol,
          }}
          selectOptions={compounds.map((compound, index) => ({
            value: index,
            displayText: compound.symbol,
            collapsedDisplayText: compound.symbol,
          }))}
          onSelectionChange={(index) =>
            setSelectedVariableIndex(index as number)
          }
        />
      </SelectWrapper> */}
      <SidebarOptions
        {...{
          optionsVisible,
          toggleOptionsVisible,
        }}
      />
      <Plot data={data} colors={colors} />
    </>
  )
}

export default ResultsPage

const SelectWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 200px;
  display: flex;
  align-items: center;

  p {
    margin: 0;
    margin-right: 1rem;
    font-size: 1rem;
  }
`

const OptionsButton = styled.button`
  float: right;
  margin-bottom: 0.5rem;
  padding: 0.8rem;
  background-color: var(--color-grey-lighter);
  border: none;
  font-size: 1rem;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-grey-lightest);
  }
`
