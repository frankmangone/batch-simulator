import styled from "styled-components"

interface CompoundCardProps {
  compound: Compound
}

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 800 })};
  border-radius: 3px;
  padding: 20px 30px;
`

const CompoundCard: React.FC<CompoundCardProps> = (props) => {
  const { compound } = props

  return <Wrapper>{compound.symbol}</Wrapper>
}

export default CompoundCard
