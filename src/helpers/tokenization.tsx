/**
 * Equation tokenization
 * https://blog.shalvah.me/posts/how-to-build-a-math-expression-tokenizer-using-javascript-or-any-other-language
 * https://blog.shalvah.me/posts/parsing-math-expressions-with-javascript
 */

const tokenizeEquation = (equation: string): Token[] => {
  const tokensArray: Token[] = []

  // Remove spaces, they don't matter
  equation.replace(/\s+/g, "")

  // Convert to array of characters
  const charsArray = equation.split("")

  // Traverse array
  charsArray.forEach(function (char, index) {
    if (isDigit(char)) {
      tokensArray.push(createToken("Literal", char))
    } else if (isLetter(char)) {
      tokensArray.push(createToken("Variable", char))
    } else if (isOperator(char)) {
      tokensArray.push(createToken("Operator", char))
    } else if (isLeftParenthesis(char)) {
      tokensArray.push(createToken("Left Parenthesis", char))
    } else if (isRightParenthesis(char)) {
      tokensArray.push(createToken("Right Parenthesis", char))
    }
  })

  return tokensArray
}

/**
 * Token factory
 */
export interface Token {
  type: string
  value: string
}

const createToken = (type: string, value: string): Token => {
  return {
    type,
    value,
  }
}

/**
 * Recognition functions
 *  */

const isDigit = (char: string): boolean => {
  return /\d/.test(char)
}
const isLetter = (char: string): boolean => {
  return /[a-z]/i.test(char)
}
const isOperator = (char: string): boolean => {
  return /\+|-|\*|\/|\^/.test(char)
}
const isLeftParenthesis = (char: string): boolean => {
  return char === "("
}
const isRightParenthesis = (char: string): boolean => {
  return char === ")"
}
