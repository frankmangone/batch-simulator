import { Fragment } from "react"
import { TokenTypes } from "@lib/tokens/tokenTypes"
import Division from "./Division"
import Power from "./Power"
import Parenthesis from "./Parenthesis"
import SymbolComponent from "./Symbol"

type Term = string | JSX.Element

interface EquationProps {
  tokenizedEquation: Token[]
}

// It is necessary to specify the 'parenthesis level' at which the operation is done
interface Operation {
  code: Term
  level: number
}

const Equation: React.FC<EquationProps> = (props) => {
  const { tokenizedEquation } = props
  const components: JSX.Element[] = []

  const parenthesisStack: Term[][] = []
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

export default Equation
