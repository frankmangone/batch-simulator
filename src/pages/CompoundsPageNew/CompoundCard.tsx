import styled from "styled-components"

interface CompoundCardProps {
  compound: Compound
}

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 800 })};
  border-radius: 3px;
  padding: 16px 30px;
  margin: 0px 5px 10px;
`

const Symbol = styled.p`
  font-family: "Comfortaa", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.h3};
  line-height: ${(props) => props.theme.lineHeights.h3};
  font-weight: 700;
  margin: 0;
`

const CompoundCard: React.FC<CompoundCardProps> = (props) => {
  const { compound } = props

  return (
    <Wrapper>
      <Symbol>{compound.symbol}</Symbol>
    </Wrapper>
  )
}

export default CompoundCard
