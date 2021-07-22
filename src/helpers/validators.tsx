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
