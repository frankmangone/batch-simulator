/**
 * Validates if field is equal to a provided value.
 * */
export const validateEqual = (a: unknown, b: unknown) => {
  if (a === b) return true
  return false
}

/**
 * Validates if field is not empty, which equates to
 * not being undefined, null,
 * In the case it is a string, check that it is not empty.
 * In the case of a number, 0 is valid.
 * */
export const validateNotEmpty = (value: unknown) => {
  if (value === "") return false
  if (typeof value === "number") return true
  if (!value) return false
  return true
}

/**
 * Validates if field is greater than, only if the value is numeric.
 * Otherwise, returns false.
 * */
export const validateGreaterThan = (
  value: unknown,
  threshold: number,
  equal: boolean
) => {
  if (typeof value !== "number") return false
  if (value > threshold) return true
  if (value === threshold && equal) return true
  return false
}
