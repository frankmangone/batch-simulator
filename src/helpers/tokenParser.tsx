import { associativity, precedence } from "./tokenization"
import { TokenTypes } from "./tokenTypes"

export const parseEquation = (tokenizedEquation: Token[]): Token[] => {
  /**
   * Note: this assumes that the tokenized expression is valid!!
   * Returns an RPN-ordered version of the tokenized expression
   * (Reverse Polish Notation, or Infix Notation)
   *
   * Based on: https://blog.shalvah.me/posts/parsing-math-expressions-with-javascript
   */

  const tokens = replaceSigns(tokenizedEquation)

  const outputQueue: Token[] = []
  const operationStack: Token[] = []

  const peek = <T extends unknown>(array: Array<T>): T => {
    return array.slice(-1)[0]
  }

  tokens.forEach((token: Token) => {
    // Push parameters and variables to output queue
    if (
      token.type === TokenTypes.Parameter ||
      token.type === TokenTypes.Variable
    ) {
      outputQueue.push(token)
    }

    // Functions are not contemplated in this app (for now) ---------------

    // If token is an operator, things get a little more complicated:
    else if (token.type === TokenTypes.Operator) {
      while (
        peek(operationStack) &&
        peek(operationStack).type === TokenTypes.Operator &&
        ((associativity(token) === "left" &&
          precedence(token) <= precedence(peek(operationStack))) ||
          (associativity(token) === "right" &&
            precedence(token) < precedence(peek(operationStack))))
      ) {
        outputQueue.push(operationStack.pop() as Token)
      }
      // At the end of iteration push o1 onto the operator stack
      operationStack.push(token)
    }

    // If the token is a left parenthesis (i.e. "("), then push it onto the stack.
    else if (token.type === TokenTypes.LeftParenthesis) {
      operationStack.push(token)
    }

    // If the token is a right parenthesis (i.e. ")"):
    else if (token.type === TokenTypes.RightParenthesis) {
      // Until the token at the top of the stack is a left parenthesis,
      // pop operators off the stack onto the output queue.
      while (
        peek(operationStack) &&
        peek(operationStack).type !== TokenTypes.LeftParenthesis
      ) {
        outputQueue.push(operationStack.pop() as Token)
      }

      // Pop the left parenthesis from the stack, but not onto the output queue.
      // (We 'consume' the parenthesis)
      operationStack.pop()
    }
  })

  return outputQueue.concat(operationStack.reverse())
}

export const rpnToString = (rpn: Token[]) => {
  return rpn.map((token) => token.value).join(" ")
}

//

const replaceSigns = (tokenizedEquation: Token[]): Token[] => {
  // A special case needs to be accounted for:
  // If the previous element on the serialized equation is a LeftParenthesis, and the current
  // element is a (+) or a (-), it's a *SIGN* rather than an operation.
  //
  // For this reason, we want to update that token, switching it by a number (parameter)
  // of value 1 or -1, and add a '*' operation.  let i = 0, parenthesisFound: boolean

  let i = 0,
    parenthesisFound = false

  while (i < tokenizedEquation.length) {
    if (tokenizedEquation[i].type === TokenTypes.LeftParenthesis) {
      parenthesisFound = true
    }
    //
    else if (
      parenthesisFound &&
      (tokenizedEquation[i].value === "+" || tokenizedEquation[i].value === "-")
    ) {
      // Set sign to a parameter of value 1 or -1
      tokenizedEquation[i].type = TokenTypes.Parameter
      if (tokenizedEquation[i].value === "+") tokenizedEquation[i].value = 1
      else tokenizedEquation[i].value = -1

      // Add an operation (multiplication) right after
      tokenizedEquation = [
        ...tokenizedEquation.slice(0, i + 1),
        { type: TokenTypes.Operator, value: "*" },
        ...tokenizedEquation.slice(i + 1, tokenizedEquation.length),
      ]

      parenthesisFound = false
    }
    //
    else {
      parenthesisFound = false
    }

    i++
  }

  return tokenizedEquation
}
