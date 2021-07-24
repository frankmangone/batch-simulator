import styled from "styled-components"

const CardButton = styled.button`
  align-items: center;
  align-self: stretch;
  background-color: unset;
  border: none;
  border-radius: 5px;
  color: var(--color-grey-dark);
  cursor: pointer;
  display: flex;
  opacity: 0;
  font-size: 1.5em;
  margin-left: 0.2rem;
  padding: 0.5rem;
  transition: all 0.15s ease-in-out;
  z-index: 2;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

export default CardButton
