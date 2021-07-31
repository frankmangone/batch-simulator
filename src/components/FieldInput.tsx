import styled from "styled-components"

const FieldInput = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  padding: 0.5rem;
  position: relative;

  input {
    font-size: 1rem;
  }

  &:hover > .error {
    opacity: 1 !important;
  }
`
export default FieldInput
