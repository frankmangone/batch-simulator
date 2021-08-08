/**
 * Equation tokenization
 * https://blog.shalvah.me/posts/how-to-build-a-math-expression-tokenizer-using-javascript-or-any-other-language
 * https://blog.shalvah.me/posts/parsing-math-expressions-with-javascript
 */

export enum TokenTypes {
  Parameter = 0,
  Variable,
  Operator,
  LeftParenthesis,
  RightParenthesis,
}

export const tokenizeEquation = (equation: string): Token[] => {
  const tokensArray: Token[] = []

  // Remove spaces, they don't matter
  equation.replace(/\s+/g, "")

  // Convert to array of characters
  const charsArray = equation.split("")

  // Define buffers
  let parameterBuffer: string[] = []
  let variableBuffer: string[] = []

  /**
   * Buffer handling
   */
  const emptyParameterBuffer = () => {
    // Push new parameter to the tokens array
    const newParam = parameterBuffer.join("")
    tokensArray.push(new Token(TokenTypes.Parameter, newParam))

    // Empty parameter buffer
    parameterBuffer = []
  }

  const emptyVariableBuffer = () => {
    // Push new variable to the tokens array
    const newVar = variableBuffer.join("")
    tokensArray.push(new Token(TokenTypes.Variable, newVar))

    // Empty variable buffer
    variableBuffer = []
  }

  /**
   * Array traversal
   * This is the core of the tokenization function
   *  */
  charsArray.forEach((char, index) => {
    /**
     * Parameters are always contained in <>, so if the parameterBuffer
     * isn't empty, you simply keep pushing to it.
     *  */
    if (parameterBuffer.length !== 0) {
      if (isParameterEnd(char)) {
        parameterBuffer.push(char)
        emptyParameterBuffer()
      } else {
        parameterBuffer.push(char)
      }
    }
    //
    /**
     * Variables are always contained in {}. Treatment is exactly the same
     * as with parameters.
     */
    else if (variableBuffer.length !== 0) {
      if (isVariableEnd(char)) {
        variableBuffer.push(char)
        emptyVariableBuffer()
      } else {
        variableBuffer.push(char)
      }
    }
    //
    /**
     * Check if variable start or parameter start
     */
    else if (isVariableStart(char)) {
      variableBuffer.push(char)
    } else if (isParameterStart(char)) {
      parameterBuffer.push(char)
    }
    //
    /**
     * Only operators and parenthesis remain, so:
     */
    else if (isOperator(char)) {
      tokensArray.push(new Token(TokenTypes.Operator, char))
    } else if (isLeftParenthesis(char)) {
      tokensArray.push(new Token(TokenTypes.LeftParenthesis, char))
    } else if (isRightParenthesis(char)) {
      tokensArray.push(new Token(TokenTypes.RightParenthesis, char))
    }
  })

  return tokensArray
}

export const joinTokens = (tokens: Token[]) => {
  return tokens.map(({ value }) => value).join("")
}

/**
 * Token class
 */
const assoc = {
  "^": "right",
  "*": "left",
  "/": "left",
  "+": "left",
  "-": "left",
}

const prec = {
  "^": 4,
  "*": 3,
  "/": 3,
  "+": 2,
  "-": 2,
}

export class Token {
  type: number
  value: string | number

  constructor(type: number, value: string) {
    this.type = type
    this.value = value
  }

  get precedence() {
    return prec[this.value as keyof typeof prec] || 1
  }

  get associativity() {
    return assoc[this.value as keyof typeof assoc] || "left"
  }
}

/**
 * Recognition functions
 *  */

// const isDigit = (char: string): boolean => {
//   return /\d/.test(char)
// }
// const isLetter = (char: string): boolean => {
//   return /[a-z]/i.test(char)
// }
const isOperator = (char: string): boolean => {
  return /\+|-|\*|\/|\^/.test(char)
}
const isLeftParenthesis = (char: string): boolean => {
  return char === "("
}
const isRightParenthesis = (char: string): boolean => {
  return char === ")"
}
const isParameterStart = (char: string): boolean => {
  return char === "<"
}
const isParameterEnd = (char: string): boolean => {
  return char === ">"
}
const isVariableStart = (char: string): boolean => {
  return char === "{"
}
const isVariableEnd = (char: string): boolean => {
  return char === "}"
}
