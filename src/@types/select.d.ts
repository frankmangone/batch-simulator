interface FieldInputProps<T> {
  label: string
  fieldName: string
  error?: string
  tooltip?: string
  type?: string
  nested?: boolean // For text inputs inside cards
  value: T
  children: JSX.Element | JSX.Element[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface SelectOptionProps<T> {
  value: T
  displayText: string
  collapsedDisplayText?: string
}
