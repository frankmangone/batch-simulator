import { Fragment } from "react"

interface ParenthesisProps {
  elements: (string | JSX.Element)[]
}

const Parenthesis: React.FC<ParenthesisProps> = (props) => {
  const { elements } = props

  return (
    <>
      {elements.map((elem, index) => (
        <Fragment key={index}>{elem}</Fragment>
      ))}
    </>
  )
}

export default Parenthesis
