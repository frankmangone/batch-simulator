import styled from "styled-components"

interface DivisionProps {
  numerator: string | JSX.Element
  denominator: string | JSX.Element
}

const DivisionWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  & > div:not(:nth-child(2)) {
    display: flex;
    padding: 0.5rem;
    position: relative;
  }

  & > div:nth-child(2) {
    width: 100%;
    height: 2px;
    background-color: var(--color-grey-dark);
  }
`

const Division: React.FC<DivisionProps> = (props) => {
  const { numerator, denominator } = props

  return (
    <DivisionWrapper>
      <div>{numerator}</div>
      <div></div>
      <div>{denominator}</div>
    </DivisionWrapper>
  )
}

export default Division
