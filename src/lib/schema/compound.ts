import * as yup from "yup"

const nonNegative = (value?: number) => {
  if (value === undefined) return false
  return value >= 0
}

const uniqueSymbol = (symbolNames: string[]) => (value?: string) => {
  if (value === undefined) return false
  return !symbolNames.includes(value)
}

const schema = (symbolNames: string[]) => {
  return yup.object().shape({
    symbol: yup
      .string()
      .required("Symbol is required")
      .min(1, "Symbol cannot be empty")
      .test(
        "Is symbol unique?",
        "Symbol is already taken",
        uniqueSymbol(symbolNames)
      ),
    name: yup.string(),
    concentration: yup
      .number()
      .test(
        "Is non-negative?",
        "Concentration cannot be negative",
        nonNegative
      ),
    molecularWeight: yup
      .number()
      .test(
        "Is non-negative?",
        "Molecular weight cannot be negative",
        nonNegative
      ),
    color: yup.string(),
  })
}

export default schema
