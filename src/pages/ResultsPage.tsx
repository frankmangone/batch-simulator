import PageTitle from "../components/PageTitle"

/* Components */
import { VictoryAxis, VictoryChart, VictoryLine } from "victory"

/* Hooks */
import useGetData from "../hooks/useGetData"

/* Types */
import { SimulationResults } from "../types/SimulationResults"

const ResultsPage: React.FC = () => {
  const { variableData } = useGetData()

  const testData = variableData("[A]") as SimulationResults // Just a test!!

  console.log(testData)

  return (
    <>
      <PageTitle>Results</PageTitle>
      <VictoryChart>
        <VictoryAxis
          crossAxis
          domain={[0, testData[testData.length - 1].t]}
          standalone={false}
        />
        <VictoryAxis
          dependentAxis
          crossAxis
          domain={[0, testData[testData.length - 1].t]}
          standalone={false}
        />
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={testData}
        />
      </VictoryChart>
    </>
  )
}

export default ResultsPage
