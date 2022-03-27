import styled from "styled-components"

const PageTitle = styled.h2`
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 100 })};
  font-size: ${(props) => props.theme.fontSizes.h3};
  line-height: ${(props) => props.theme.lineHeights.h3};
  font-family: "Mulish", sans-serif;
  margin: 0;
  flex: 1;
  display: inline-block;
`

export default PageTitle
