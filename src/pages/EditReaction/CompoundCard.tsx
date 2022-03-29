import styled from "styled-components"

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border-radius: 5px;
  box-shadow: 0 0 6px
    ${(props) => props.theme.getColor({ name: "baseBlack", shade: 800 })};
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  flex-basis: 180px;
  flex-shrink: 0;
  flex-direction: column;
  height: 100px;
  margin: 0px 5px 10px;
  padding: 0px;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 800 })};
  }
`

const CompoundCard: React.VFC = () => {
  return <Wrapper></Wrapper>
}

export default CompoundCard
