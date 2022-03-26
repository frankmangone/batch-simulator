import styled from "styled-components"

const PageTitle = styled.h2`
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 100 })};
  font-size: 20px;
  font-family: "Mulish", sans-serif;
  margin-top: 0;
  display: inline-block;
`

export default PageTitle
