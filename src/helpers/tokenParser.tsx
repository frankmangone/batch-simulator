import { Token, TokenTypes } from "./tokenization"

export const tokenParser = (tokenizedEquation: Token[]): Token[] => {
  /**
   * Note: this assumes that the tokenized expression is valid!!
   * Returns an RPN-ordered version of the tokenized expression
   * (Reverse Polish Notation, or Infix Notation)
   *
   * Based on: https://blog.shalvah.me/posts/parsing-math-expressions-with-javascript
   */

  const outputQueue: Token[] = []
  const operationStack: Token[] = []

  const peek = <T extends unknown>(array: Array<T>): T => {
    return array.slice(-1)[0]
  }

  tokenizedEquation.forEach((token: Token) => {
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
        ((token.associativity() === "left" &&
          token.precedence() <= peek(operationStack).precedence()) ||
          (token.associativity() === "right" &&
            token.precedence() < peek(operationStack).precedence()))
      ) {
        outputQueue.push(operationStack.pop() as Token)
      }
      // At the end of iteration push o1 onto the operator stack
      operationStack.push(token)
    }

    //If the token is a left parenthesis (i.e. "("), then push it onto the stack.
    else if (token.type === TokenTypes.LeftParenthesis) {
      operationStack.push(token)
    }

    //If the token is a right parenthesis (i.e. ")"):
    else if (token.type === TokenTypes.RightParenthesis) {
      //Until the token at the top of the stack is a left parenthesis, pop operators off the stack onto the output queue.
      while (
        peek(operationStack) &&
        peek(operationStack).type !== TokenTypes.LeftParenthesis
      ) {
        outputQueue.push(operationStack.pop() as Token)
      }

      //Pop the left parenthesis from the stack, but not onto the output queue.
      operationStack.pop()
    }
  })

  return outputQueue.concat(operationStack.reverse())
}

export const rpnToString = (rpn: Token[]) => {
  return rpn.map((token) => token.value).join(" ")
}
