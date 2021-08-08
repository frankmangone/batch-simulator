import PageTitle from "../components/PageTitle"

/* Components */
import { VictoryAxis, VictoryChart, VictoryLine } from "victory"

/* Constants */
import { COMPOUND_COLORS } from "../constants/compoundColors"

/* Hooks */
import useGetData from "../hooks/useGetData"

const ResultsPage: React.FC = () => {
  const { variableData, maxFunctionalValue } = useGetData()

  const testData1 = variableData("[A]") // Just a test!!
  const testData2 = variableData("[B]") // Just a test!!

  return (
    <>
      <PageTitle>Results</PageTitle>
      <VictoryChart style={styles.container}>
        {/* Axis components */}
        <VictoryAxis
          crossAxis
          domain={[0, testData1[testData1.length - 1].x]}
          style={styles.axis}
          standalone={false}
        />
        <VictoryAxis
          dependentAxis
          crossAxis
          domain={[0, maxFunctionalValue([testData1, testData2])]}
          style={styles.axis}
          standalone={false}
        />

        {/* Line components */}
        <VictoryLine
          style={{
            data: { stroke: COMPOUND_COLORS.blue1 },
            parent: { border: "1px solid #ccc" },
          }}
          data={testData1}
        />
        <VictoryLine
          style={{
            data: { stroke: COMPOUND_COLORS.red1 },
            parent: { border: "1px solid #ccc" },
          }}
          data={testData2}
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
      height: "auto",
    },
  },
  axis: {
    axis: { fontFamily: "'Mulish', sans-serif" },
    tickLabels: { fontFamily: "inherit" },
  },
}
