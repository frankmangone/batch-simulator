import styled from "styled-components"

interface PowerProps {
  base: string | JSX.Element
  power: string | JSX.Element
}

const PowerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  & > .exponent {
    transform: translateY(-40%) scale(0.7);
    margin-left: -10px;
    margin-right: -20px;
  }
`

/**
 * Power
 *
 * A simple math expression for a power operation
 *
 * @param {PowerProps} props
 */
const Power: React.FC<PowerProps> = (props) => {
  const { base, power } = props
  return (
    <PowerWrapper>
      <div>{base}</div>
      <div className="exponent">{power}</div>
    </PowerWrapper>
  )
}

export default Power
