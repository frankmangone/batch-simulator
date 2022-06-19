import * as yup from "yup"

// const nonNegative = (value?: number) => {
//   if (value === undefined) return false
//   return value >= 0
// }

// const uniqueSymbol = (symbolNames: string[]) => (value?: string) => {
//   if (value === undefined) return false
//   return !symbolNames.includes(value)
// }

const schema = () => {
  return yup.object().shape({
    name: yup.string(),
    keyCompound: yup.string().required("A key compound is required"),
  })
}

export default schema
