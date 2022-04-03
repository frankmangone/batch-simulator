import styled from "styled-components"

interface SubindexProps {
  base: string | JSX.Element
  subindex: string | JSX.Element
}

const SubindexWrapper = styled.div`
  position: relative;
  display: flex;

  & > .subindex {
    transform: translateY(30%) scale(0.75);
  }
`

/**
 * Subindex
 *
 * A simple math expression for a subindex
 *
 * @param {SubindexProps} props
 */
const Subindex: React.FC<SubindexProps> = (props) => {
  const { base, subindex } = props
  return (
    <SubindexWrapper>
      <div>{base}</div>
      <div className="subindex">{subindex}</div>
    </SubindexWrapper>
  )
}

export default Subindex
