import Term from "./Term"

interface ParenthesisProps {
  elements: (string | JSX.Element)[]
}

const Parenthesis: React.FC<ParenthesisProps> = (props) => {
  const { elements } = props

  return (
    <>
      {elements.map((elem, index) => (
        <Term element={elem} key={index} />
      ))}
    </>
  )
}

export default Parenthesis
