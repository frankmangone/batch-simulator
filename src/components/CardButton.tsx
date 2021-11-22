import styled from "styled-components"

const CardButton = styled.button`
  align-items: center;
  align-self: center;
  background-color: unset;
  border: none;
  border-radius: 5px;
  color: var(--color-grey-normal);
  cursor: pointer;
  display: flex;
  font-size: 1.5em;
  margin-left: 0.2rem;
  padding: 0.5rem;
  transition: all 0.15s ease-in-out;
  z-index: 2;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    color: var(--color-grey-dark);
  }
`

export default CardButton
