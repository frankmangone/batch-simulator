interface Token {
  type: TokenType
  value: string | number
}

type TokenType =
  | "parameter"
  | "variable"
  | "operator"
  | "left-parenthesis"
  | "right-parenthesis"
