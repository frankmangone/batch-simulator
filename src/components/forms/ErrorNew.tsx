import styled from "styled-components"

const Error = styled.p`
  color: ${(props) => props.theme.getColor("cancel")};
  font-size: ${(props) => props.theme.fontSizes.p};
  line-height: ${(props) => props.theme.lineHeights.p};
  height: ${(props) => props.theme.lineHeights.p};
  margin-top: 10px;
  margin-bottom: 0;
`

export default Error
