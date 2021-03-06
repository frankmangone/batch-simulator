import styled from "styled-components"

interface ErrorProps {
  big?: boolean
}

const Error: React.FC<ErrorProps> = (props) => {
  const { big, children } = props
  return (
    <ErrorWrapper big={big} className="error">
      {children}
    </ErrorWrapper>
  )
}

const ErrorWrapper = styled.div<ErrorProps>`
  position: absolute;
  ${(props) =>
    props.big
      ? `
    bottom: 0.9rem;
    right: 1rem;
  `
      : `
    bottom: 0.4rem;
    right: 0.5rem;
  `}

  background-color: var(--color-triadic-red-darker);
  border-radius: 5px;
  box-shadow: 0px 0px 4px var(--color-triadic-red-darker);
  color: white;
  padding: 0.2rem 0.5rem;
  pointer-events: none;
  opacity: 0;
  transform: translateY(105%);
  z-index: 4;
`

export default Error
