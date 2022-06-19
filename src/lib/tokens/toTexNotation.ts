const toTexNotation = (equation: Token[]) => {
  return equation.reduce((prev, token) => {
    return `${prev}${token.latexSymbol ?? token.value}`
  }, "")
}

export default toTexNotation
