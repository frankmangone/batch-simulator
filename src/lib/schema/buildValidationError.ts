import type { ValidationError } from "yup"

const buildValidationError = (error: ValidationError) => {
  const errors: Record<string, string> = {}

  error.inner.forEach((fieldError) => {
    const key = fieldError.path as string
    const message = fieldError.message

    errors[key] = message
  })

  return errors
}

export default buildValidationError
