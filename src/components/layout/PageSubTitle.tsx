import styled from "styled-components"

const PageSubTitle = styled.h3`
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 100 })};
  font-size: ${(props) => props.theme.fontSizes.h4};
  line-height: ${(props) => props.theme.lineHeights.h4};
  font-family: "Mulish", sans-serif;
  margin: 0;
  flex: 1;
  display: inline-block;
`

export default PageSubTitle
