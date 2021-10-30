import styled from "styled-components"

const InputSection = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  return (
    <InputSectionWrapper>
      <InputSectionInner>{children}</InputSectionInner>
    </InputSectionWrapper>
  )
}

export default InputSection

const InputSectionWrapper = styled.div`
  display: flex;
  flex-basis: 50%;

  @media only screen and (max-width: 940px) {
    flex-basis: 100%;
  }
`

const InputSectionInner = styled.div`
  flex-grow: 1;
  background-color: var(--color-grey-lighter);
  border-radius: 5px;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
  margin-bottom: 0;

  h2 {
    color: var(--color-grey-normal);
    font-size: 1.2rem;
    margin-top: 0;
  }

  input {
    width: auto;
  }
`
