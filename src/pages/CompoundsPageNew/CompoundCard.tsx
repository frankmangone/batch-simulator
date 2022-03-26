import styled from "styled-components"

interface CompoundCardProps {
  compound: Compound
}

const Wrapper = styled.div``

const CompoundCard: React.FC<CompoundCardProps> = (props) => {
  const { compound } = props

  return <Wrapper>{compound.symbol}</Wrapper>
}

export default CompoundCard
