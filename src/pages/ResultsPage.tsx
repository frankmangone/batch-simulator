import styled from "styled-components"

/* Components */
import PageTitle from "../components/PageTitle"
import Plot from "../components/results/Plot"
import PlotLegend from "../components/results/PlotLegend"
import SidebarOptions from "../components/results/SidebarOptions"
import Button from "../components/Button"

/* Constants */
import { COMPOUND_COLORS } from "../constants/compoundColors"

/* Hooks */
import { useMemo, useState } from "react"
import useCompounds from "../hooks/useCompounds"
import useGetData from "../hooks/useGetData"

const ResultsPage: React.VFC = () => {
  const { variableData } = useGetData()
  const { compounds } = useCompounds()
  const [selectedVariables, setSelectedVariables] = useState<number[]>([0])
  const [temperatureSelected, setTemperatureSelected] = useState<boolean>(false)
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

  return (
    <>
      <PageTitle>Results</PageTitle>
      <OptionsButton onClick={toggleOptionsVisible} color="green">
        Options
      </OptionsButton>
      <Plot data={data} colors={colors} />
      <PlotLegend selectedVariables={selectedVariables} />
      <SidebarOptions
        {...{
          optionsVisible,
          toggleOptionsVisible,
          selectedVariables,
          setSelectedVariables,
          temperatureSelected,
          setTemperatureSelected,
        }}
      />
    </>
  )
}

export default ResultsPage

const OptionsButton = styled(Button)`
  float: right;
  margin-bottom: 0.5rem;
  padding: 0.8rem;
`
