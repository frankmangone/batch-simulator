import * as yup from "yup"

const nonNegative = (value?: number) => {
  if (value === undefined) return false
  return value >= 0
}

const localeSchema = yup.object().shape({
  symbol: yup
    .string()
    .required("Symbol is required")
    .min(1, "Symbol cannot be empty"),
  name: yup.string(),
  concentration: yup
    .number()
    .test("Is non-negative?", "Concentration cannot be negative", nonNegative),
  molecularWeight: yup
    .number()
    .test(
      "Is non-negative?",
      "Molecular weight cannot be negative",
      nonNegative
    ),
  color: yup.string(),
})

export default localeSchema
