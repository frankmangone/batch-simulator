import styled from "styled-components"
import CompoundCard from "./CompoundCard"

const Wrapper = styled.div`
  flex-basis: 50%;
`

const Label = styled.p`
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 100 })};
  font-family: "Mulish", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.p};
  font-weight: 600;
  line-height: ${(props) => props.theme.lineHeights.p};
  margin-bottom: 12px;
`

const CompoundSelection: React.VFC = () => {
  return (
    <>
      <Wrapper>
        <Label>Reactants</Label>
        <CompoundCard />
      </Wrapper>

      <Wrapper>
        <Label>Products</Label>
        <CompoundCard />
      </Wrapper>
    </>
  )
}

export default CompoundSelection
