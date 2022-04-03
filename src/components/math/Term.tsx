import React from "react"

interface TermProps {
  element: string | JSX.Element
}

const Term: React.VFC<TermProps> = (props) => {
  const { element } = props

  if (typeof element === "string") {
    return <span>{element}</span>
  }

  return element
}

export default Term
