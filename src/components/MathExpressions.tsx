import styled from "styled-components"

interface IEquation {
  equation: string
}

export const Equation: React.FC<IEquation> = (props) => {
  const { equation } = props

  return <div></div>
}

/**
 * Division
 */

interface IDivisionProps {
  numerator: string | JSX.Element
  denominator: string | JSX.Element
}

export const Division: React.FC<IDivisionProps> = (props) => {
  const { numerator, denominator } = props

  return (
    <DivisionWrapper>
      <div>{numerator}</div>
      <div></div>
      <div>{denominator}</div>
    </DivisionWrapper>
  )
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

/**
 * Power
 *  */

interface IPowerProps {
  base: string | JSX.Element
  power: string | JSX.Element
}

export const Power: React.FC<IPowerProps> = (props) => {
  const { base, power } = props
  return (
    <PowerWrapper>
      <div>{base}</div>
      <div className="exponent">{power}</div>
    </PowerWrapper>
  )
}

const PowerWrapper = styled.div`
  position: relative;
  display: flex;

  & > .exponent {
    transform: translateY(-50%) scale(0.8);
  }
`

/**
 * Subindex
 *  */

interface ISubindexProps {
  base: string | JSX.Element
  subindex: string | JSX.Element
}

export const Subindex: React.FC<ISubindexProps> = (props) => {
  const { base, subindex } = props
  return (
    <SubindexWrapper>
      <div>{base}</div>
      <div className="subindex">{subindex}</div>
    </SubindexWrapper>
  )
}

const SubindexWrapper = styled.div`
  position: relative;
  display: flex;

  & > .subindex {
    transform: translateY(50%) scale(0.8);
  }
`

/**
 * Greek letters
 */

export const GreekAlpha = () => <span>&alpha;</span>
export const GreekBeta = () => <span>&beta;</span>
export const GreekMu = () => <span>&mu;</span>
