interface FieldInputProps {
  label: string
  fieldName: string
  error?: string
  tooltip?: string
  type?: string
  nested?: boolean // For text inputs inside cards
  value: number
  children: JSX.Element | JSX.Element[]
  onChange: (index: number) => void
}

interface SelectOptionProps {
  value: index
  displayText: string
  collapsedDisplayText?: string
}
