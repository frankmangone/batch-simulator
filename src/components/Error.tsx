import styled from "styled-components"

/* Types */
import { IFCWithChildren } from "../types/FCWithChildren"

const Error: React.FC<IFCWithChildren> = (props) => {
  const { children } = props
  return <ErrorWrapper className="error">{children}</ErrorWrapper>
}

const ErrorWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
  right: 0rem;

  background-color: var(--color-triadic-red-dark);
  border-radius: 5px;
  box-shadow: 0px 0px 4px var(--color-triadic-red-darker);
  color: white;
  padding: 0.5rem;
  pointer-events: none;
  opacity: 0;
  transform: translateY(105%);
  z-index: 4;
`

export default Error
