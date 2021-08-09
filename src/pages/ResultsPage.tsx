import styled from "styled-components"

/* Components */
import { VictoryAxis, VictoryChart, VictoryLine } from "victory"
import PageTitle from "../components/PageTitle"
import Select from "../components/Select"

/* Constants */
import { COMPOUND_COLORS } from "../constants/compoundColors"

/* Helpers */
import { lastElement } from "../helpers/array"

/* Hooks */
import { useState } from "react"
import { useData } from "../context/DataContext"
import useGetData from "../hooks/useGetData"

const ResultsPage: React.FC = () => {
  const { variableData, maxFunctionalValue } = useGetData()
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
      <VictoryChart style={styles.container}>
        {/* Axis components */}
        <VictoryAxis
          crossAxis
          domain={[0, lastElement(data).x]}
          style={styles.axis}
          standalone={false}
        />
        <VictoryAxis
          dependentAxis
          crossAxis
          domain={[0, maxFunctionalValue([data]) * 1.02]}
          style={styles.axis}
          standalone={false}
        />

        {/* Line components */}
        <VictoryLine
          style={{
            data: {
              stroke:
                COMPOUND_COLORS[
                  selectedCompound.color as keyof typeof COMPOUND_COLORS
                ],
            },
            parent: { border: "1px solid #ccc" },
          }}
          data={data}
        />
      </VictoryChart>
    </>
  )
}

export default ResultsPage

const styles = {
  container: {
    parent: {
      fontFamily: "'Mulish', sans-serif",
      backgroundColor: "hsl(213, 20%, 95%)",
      borderRadius: "5px",
      height: "auto",
    },
  },
  axis: {
    axis: { fontFamily: "'Mulish', sans-serif" },
    ticks: { size: 5, stroke: "black", strokeWidth: 1 },
    tickLabels: { fontFamily: "inherit", fontSize: 10 },
  },
}

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
