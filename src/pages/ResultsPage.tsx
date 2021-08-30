import styled from "styled-components"

/* Components */
import PageTitle from "../components/PageTitle"
import Select from "../components/Select"
import Plot from "../components/Plot"

/* Constants */
import { COMPOUND_COLORS } from "../constants/compoundColors"

/* Hooks */
import { useState } from "react"
import { useData } from "../context/DataContext"
import useGetData from "../hooks/useGetData"

const ResultsPage: React.FC = () => {
  const { variableData } = useGetData()
  const { compounds } = useData()
  const [selectedVariableIndex, setSelectedVariableIndex] = useState<number>(0)

  /* Derived state from selectedVariable */
  const selectedCompound = compounds[selectedVariableIndex]
  const data = variableData(`[${selectedCompound.symbol}]`)

  return (
    <>
      <PageTitle>Results</PageTitle>
      <SelectWrapper>
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
      </SelectWrapper>
      <Plot
        data={data}
        color={
          COMPOUND_COLORS[
            selectedCompound.color as keyof typeof COMPOUND_COLORS
          ]
        }
      />
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
