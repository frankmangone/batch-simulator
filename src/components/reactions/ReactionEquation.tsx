import styled from "styled-components"

/* Components */
import { Equation, Subindex } from "../MathExpressions"

/* Hooks */
import useCompounds from "../../hooks/entities/useCompounds"

interface IReactionEquationProps {
  reaction: Reaction
  keyCompoundSymbol?: string
}

const ReactionEquation: React.FC<IReactionEquationProps> = (props) => {
  const { reaction } = props
  const { findCompound } = useCompounds()

  const keyCompound = findCompound(reaction.keyCompound)
  const keyCompoundSymbol: string | undefined = keyCompound?.symbol || undefined

  return (
    <EquationWrapper>
      {keyCompoundSymbol && (
        <>
          <Subindex base="r" subindex={keyCompoundSymbol} />
          &nbsp;=&nbsp;
        </>
      )}
      <Equation tokenizedEquation={reaction.kineticEquation} />
    </EquationWrapper>
  )
}

export default ReactionEquation

//

const EquationWrapper = styled.div`
  align-items: center;
  align-self: stretch;
  background-color: var(--color-grey-lightest);
  border: 1px solid var(--color-grey-light);
  border-radius: 5px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  color: var(--color-grey-dark);
  display: flex;
  font-size: 1.8rem;
  justify-content: center;
  padding: 1.5rem;
  margin: 1.5rem 0 1rem;

  span {
    font-family: "Comfortaa", symbol;
  }
`
