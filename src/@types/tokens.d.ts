interface Token {
  type: TokenType
  value: string | number
  latexSymbol?: string
}

type TokenType =
  | "parameter"
  | "variable"
  | "operator"
  | "left-parenthesis"
  | "right-parenthesis"
