/**
 * Validates if field is not empty, which equates to
 * not being undefined, null, or in case it is a string,
 * not being the empty string
 *  */
export const validateNotEmpty = (value: unknown) => {
  if (!value) return false
  if (value === "") return false
  return true
}

/**
 * Validates if field is greater than, only if the value is numeric.
 * Otherwise, returns false.
 *  */
 export const validateGreaterThan = (value: unknown, threshold: number, equal: boolean) => {
  if (typeof value !== 'number') return false
  if (value > threshold) return true
  if (value === threshold && equal) return true
  return false
}