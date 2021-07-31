import styled from "styled-components"

export const ModalInputSection = styled.div`
  border-top: 1px solid var(--color-grey-light);
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  padding: 2rem 1rem 0rem;

  h2 {
    color: var(--color-grey-dark);
    font-size: 20px;
    margin-top: 0;
  }
`

export const ModalColumnInputSection = styled(ModalInputSection)`
  flex-direction: column;
  flex-wrap: nowrap;
`
