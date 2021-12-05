export const TokenTypes: Record<string, TokenType> = {
  Parameter: "parameter",
  Variable: "variable",
  Operator: "operator",
  LeftParenthesis: "left-parenthesis",
  RightParenthesis: "right-parenthesis",
}

const { Operator, Parameter, Variable, LeftParenthesis, RightParenthesis } =
  TokenTypes

// Operation tokens
export const additionToken = { type: Operator, value: "+" }
export const divisionToken = { type: Operator, value: "/" }
export const exponentiationToken = { type: Operator, value: "^" }
export const multiplicationToken = { type: Operator, value: "*" }
export const subtractionToken = { type: Operator, value: "-" }
export const operationToken = (value: string) => ({ type: Operator, value })

// Parameter token
export const parameterToken = (value: string) => ({ type: Parameter, value })
export const minusOneToken = parameterToken("-1")

// Variable token
export const variableToken = (value: string) => ({ type: Variable, value })

// Parameter token
export const leftParenthesisToken = { type: LeftParenthesis, value: "(" }
export const rightParenthesisToken = { type: RightParenthesis, value: ")" }
