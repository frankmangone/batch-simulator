import styled from "styled-components"

/* Components */
import PageTitle from "../components/PageTitle"
import FieldInput from "../components/FieldInput"

/* Hooks */
import { useData } from "../context/DataContext"

const OperationPage: React.FC = () => {
  const { operation, setOperationKey } = useData()

  return (
    <>
      <PageTitle>Operation</PageTitle>

      <InputSection>
        <h2>Operating times</h2>
        <FieldInput>
          <label htmlFor="reactionTime">Reaction time:</label>
          <input
            name="reactionTime"
            autoComplete="off"
            onChange={() => {}}
            onBlur={() => {}}
            value={operation.reactionTime}
          />
        </FieldInput>
        <FieldInput>
          <label htmlFor="deadTime">Dead time:</label>
          <input
            name="deadTime"
            autoComplete="off"
            onChange={() => {}}
            onBlur={() => {}}
            value={operation.deadTime}
          />
        </FieldInput>
      </InputSection>
    </>
  )
}

export default OperationPage

const InputSection = styled.div`
  display: flex;
  background-color: var(--color-grey-lighter);
  border-radius: 5px;
  flex-direction: column;
  margin-top: 2rem;
  padding: 1rem;

  h2 {
    color: var(--color-grey-normal);
    font-size: 1.2rem;
    margin-top: 0;
  }
`
