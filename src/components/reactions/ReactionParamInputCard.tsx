import styled from "styled-components"

/* Types */
import { IFCWithChildren } from "../../types/FCWithChildren"

const ReactionParamInputCard: React.FC<IFCWithChildren> = (props) => {
  const { children } = props

  return (
    <ParamInputWrapper>
      <ParamInputInner>{children}</ParamInputInner>
    </ParamInputWrapper>
  )
}

export default ReactionParamInputCard

const ParamInputWrapper = styled.div`
  flex-basis: 33%;
`

const ParamInputInner = styled.div`
  align-items: center;
  background-color: var(--color-grey-light);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  margin: 0.5rem;
  padding: 1.3rem;
  transition: all 0.15s ease-in-out;

  &:hover {
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  h1 {
    color: var(--color-grey-dark);
    font-size: 1.6rem;
    margin: 0;
    margin-right: 1rem;

    span {
      /* Greek symbols */
      font-family: "Comfortaa", symbol;
    }
  }

  input {
    font-size: 1.4rem;
  }
`
