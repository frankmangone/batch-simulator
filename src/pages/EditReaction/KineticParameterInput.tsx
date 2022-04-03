import { useState } from "react"
import Input from "@components/forms/TextInput"
// import { validateNotEmpty } from "@lib/validators"
// import { SCI_REGEX, SCI_POSITIVE_REGEX } from "../../constants/regexs"

interface KineticParameterInputProps {
  paramSymbol: string | JSX.Element | JSX.Element[]
  units?: JSX.Element
  value: string
  positive?: boolean
  updateValue: (value: string) => void
}

const ALLOWED_CHARS = "0123456789.-+eE"

const KineticParameterInput: React.FC<KineticParameterInputProps> = (props) => {
  const { paramSymbol, value, positive = false, units, updateValue } = props // eslint-disable-line
  const [valueInput, setValueInput] = useState<string>(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setValueInput("")
      return
    }

    // Filter input unallowed characters
    const filtered = event.target.value
      .split("")
      .filter((el) => ALLOWED_CHARS.indexOf(el) > -1)
      .join("")

    setValueInput(filtered)
  }

  // const validateAndUpdateConstant = () => {
  //   if (!validateNotEmpty(valueInput)) {
  //     // Reset value
  //     setValueInput(valueInput)
  //     return
  //   }

  //   let validString: string | undefined

  //   if (positive) validString = valueInput.match(SCI_POSITIVE_REGEX)?.[0]
  //   else validString = valueInput.match(SCI_REGEX)?.[0]

  //   if (!validString) {
  //     // Reset value
  //     setValueInput(valueInput)
  //     return
  //   }

  //   updateValue(validString)
  //   setValueInput(validString)
  // }

  return (
    <Input
      label={paramSymbol}
      fieldName=""
      value={valueInput}
      type="text"
      onChange={handleChange}
      // onBlur={validateAndUpdateConstant}
    />
  )
}

export default KineticParameterInput
