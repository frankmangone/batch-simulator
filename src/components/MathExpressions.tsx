import styled from "styled-components"
import { Fragment } from "react"
import { TokenTypes } from "../helpers/tokenTypes"
interface IEquation {
  tokenizedEquation: Token[]
}

// It is necessary to specify the 'parenthesis level' at which the operation is done
interface Operation {
  code: JSX.Element | string
  level: number
}

export const Equation: React.FC<IEquation> = (props) => {
  const { tokenizedEquation } = props
  const components: JSX.Element[] = []

  const parenthesisStack: (JSX.Element | string)[][] = []
  const operationStack: Operation[] = []

  tokenizedEquation.forEach((token) => {
    /**
     * Parenthesis treatment takes precedence over everything else.
     *
     * A buffer is pushed to the parenthesis stack upon finding a left bracket.
     *
     * When a right parenthesis is found, the last element from the buffer is popped,
     * and added as a parenthesis component to the latest parenthesis stack, or the components array
     */
    if (token.type === TokenTypes.LeftParenthesis) {
      parenthesisStack.push([])
    } else if (token.type === TokenTypes.RightParenthesis) {
      // If the syntax is correct, pop should never return undefined
      const parenthesis = parenthesisStack.pop() as (string | JSX.Element)[]

      // If there are elements in the parenthesisStack, then push any new components to it
      // If not, push any new components to the components array
      const currentStack =
        parenthesisStack.length === 0
          ? components
          : parenthesisStack[parenthesisStack.length - 1]

      // If there are operations in the operationStack, and if the latest operation
      // matches the parenthesis level, pop most recent one
      if (
        operationStack.length > 0 &&
        operationStack[operationStack.length - 1].level ===
          parenthesisStack.length
      ) {
        const operation = operationStack.pop() as Operation

        //
        if (operation.code === "/") {
          const numerator = currentStack.pop() as string | JSX.Element
          currentStack.push(
            <Division
              numerator={numerator}
              denominator={<Parenthesis elements={parenthesis} />}
            />
          )
        } else if (operation.code === "^") {
          const base = currentStack.pop() as string | JSX.Element
          currentStack.push(
            <Power base={base} power={<Parenthesis elements={parenthesis} />} />
          )
        } else if (operation.code === "-" || operation.code === "+") {
          currentStack.push(operation.code)
          currentStack.push(<Parenthesis elements={parenthesis} />)
        }
      } else {
        // No *valid* operations in operationStack, simply push component
        currentStack.push(<Parenthesis elements={parenthesis} />)
      }
    }
    //
    /**
     * Variables and parameters are easy to treat.
     *
     * The only considerations are to push to the parenthesis stack
     * if a buffer is present, and to build Division and Power components if
     * necessary.
     */
    else if (
      token.type === TokenTypes.Parameter ||
      token.type === TokenTypes.Variable
    ) {
      /**
       * Push to parenthesis stack if one is present
       */
      if (parenthesisStack.length > 0) {
        parenthesisStack[parenthesisStack.length - 1].push(
          <SymbolComponent
            symbol={(token.value as string).replace(/<|>|{|}/g, "")}
          />
        )
      }
      //
      /**
       * Then, check if division or power are present in the stack
       *  */
      else if (operationStack.length > 0) {
        /**
         * Pop most recent operation from stack
         */
        const operation = operationStack.pop() as Operation
        //
        if (operation.code === "/") {
          const numerator = components.pop() as string | JSX.Element
          components.push(
            <Division
              numerator={numerator}
              denominator={
                <SymbolComponent
                  symbol={(token.value as string).replace(/<|>|{|}/g, "")}
                />
              }
            />
          )
        } else if (operation.code === "^") {
          const base = components.pop() as string | JSX.Element
          components.push(
            <Power
              base={base}
              power={
                <SymbolComponent
                  symbol={(token.value as string).replace(/<|>|{|}/g, "")}
                />
              }
            />
          )
        }
      }
      //
      /**
       * Next steps are easier: close parenthesis or just push to components
       */
      else {
        components.push(
          <SymbolComponent
            symbol={(token.value as string).replace(/<|>|{|}/g, "")}
          />
        )
      }
    }
    //
    /**
     * Division and power are special in that they need the previous
     * element in components. For this reason, the use a stack.
     * */
    else if (token.type === TokenTypes.Operator) {
      if (token.value === "/" || token.value === "^") {
        //
        operationStack.push({
          code: token.value,
          level: parenthesisStack.length,
        })
      }
      //
      else if (parenthesisStack.length > 0) {
        if (token.value === "+" || token.value === "-") {
          parenthesisStack[parenthesisStack.length - 1].push(<>{token.value}</>)
        } else if (token.value === "*") {
          parenthesisStack[parenthesisStack.length - 1].push(<>.</>)
        }
      } else {
        if (token.value === "+" || token.value === "-") {
          components.push(<>{token.value}</>)
        } else if (token.value === "*") {
          components.push(<>.</>)
        }
      }
    }
  })

  return (
    <>
      {components.map((component, index) => (
        <Fragment key={index}>{component}</Fragment>
      ))}
    </>
  )
}

// ----------------------------------------------------------------
/**
 * Symbol Component
 * For alphanumeric expressions such as variables or parameters
 */
interface ISymbolComponent {
  symbol: string
}

export const SymbolComponent: React.FC<ISymbolComponent> = (props) => {
  const { symbol } = props

  /**
   * Expressions may have subindices
   * For now, they may not have superindices (TODO: maybe?)
   * TODO: Support commas for subindex separation?
   */
  const separatedTerms: (string | JSX.Element)[] = symbol.split("_")

  // Replace symbols represented as strings for components
  separatedTerms.forEach((term, index) => {
    switch (term) {
      case "\\alpha":
        separatedTerms[index] = <GreekAlpha />
        break
      case "\\beta":
        separatedTerms[index] = <GreekBeta />
        break
      case "\\mu":
        separatedTerms[index] = <GreekMu />
        break
      case "\\Delta":
        separatedTerms[index] = <GreekDeltaCapital />
        break
      case "\\inf":
        separatedTerms[index] = <SymbolInfinity />
        break
      default:
    }
  })

  for (let i = separatedTerms.length - 1; i > 0; i--) {
    // Last term will be the subindex
    const subindex = separatedTerms.pop() as string | JSX.Element
    separatedTerms[i - 1] = (
      <Subindex base={separatedTerms[i - 1]} subindex={subindex} />
    )
  }

  // Final result is at separatedTerms[0]
  return separatedTerms[0] as JSX.Element
}

// ----------------------------------------------------------------
/**
 * Parenthesis
 */

interface IParenthesisProps {
  elements: (string | JSX.Element)[]
}

export const Parenthesis: React.FC<IParenthesisProps> = (props) => {
  const { elements } = props

  return (
    <>
      {elements.map((elem, index) => (
        <Fragment key={index}>{elem}</Fragment>
      ))}
    </>
  )
}

// ----------------------------------------------------------------
/**
 * Division
 */

interface IDivisionProps {
  numerator: string | JSX.Element
  denominator: string | JSX.Element
}

export const Division: React.FC<IDivisionProps> = (props) => {
  const { numerator, denominator } = props

  return (
    <DivisionWrapper>
      <div>{numerator}</div>
      <div></div>
      <div>{denominator}</div>
    </DivisionWrapper>
  )
}

const DivisionWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  & > div:not(:nth-child(2)) {
    display: flex;
    padding: 0.5rem;
    position: relative;
  }

  & > div:nth-child(2) {
    width: 100%;
    height: 2px;
    background-color: var(--color-grey-dark);
  }
`

// ----------------------------------------------------------------
/**
 * Power
 *  */

interface IPowerProps {
  base: string | JSX.Element
  power: string | JSX.Element
}

export const Power: React.FC<IPowerProps> = (props) => {
  const { base, power } = props
  return (
    <PowerWrapper>
      <div>{base}</div>
      <div className="exponent">{power}</div>
    </PowerWrapper>
  )
}

const PowerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  & > .exponent {
    transform: translateY(-30%) scale(0.7);
  }
`

// ----------------------------------------------------------------
/**
 * Subindex
 *  */

interface ISubindexProps {
  base: string | JSX.Element
  subindex: string | JSX.Element
}

export const Subindex: React.FC<ISubindexProps> = (props) => {
  const { base, subindex } = props
  return (
    <SubindexWrapper>
      <div>{base}</div>
      <div className="subindex">{subindex}</div>
    </SubindexWrapper>
  )
}

const SubindexWrapper = styled.div`
  position: relative;
  display: flex;

  & > .subindex {
    transform: translateY(30%) scale(0.75);
  }
`

// ----------------------------------------------------------------
/**
 * Greek letters
 */

export const GreekAlpha = () => <span>&alpha;</span>
export const GreekBeta = () => <span>&beta;</span>
export const GreekMu = () => <span>&mu;</span>

export const GreekDeltaCapital = () => <span>&Delta;</span>

// ----------------------------------------------------------------
/**
 * Other Symbols
 */
export const SymbolInfinity = () => <span>&infin;</span>
