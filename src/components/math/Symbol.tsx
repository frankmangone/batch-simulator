import { Fragment } from "react"
import Term from "./Term"
import MathChar from "./MathChar"
import Subindex from "./Subindex"

type TermValue = string | JSX.Element

/**
 * Symbol Component
 * For alphanumeric expressions such as variables or parameters
 */
interface SymbolProps {
  symbol: string
}

const replaceBySymbol = (symbol: string | JSX.Element) => {
  // Replace symbols represented as strings for components
  switch (symbol) {
    case "\\alpha":
      return <MathChar symbol="&alpha;" />
    case "\\beta":
      return <MathChar symbol="&beta;" />
    case "\\mu":
      return <MathChar symbol="&mu;" />
    case "\\Delta":
      return <MathChar symbol="&Delta;" />
    case "\\inf":
      return <MathChar symbol="&infin;" />
    default:
      return symbol
  }
}

const SymbolComponent: React.FC<SymbolProps> = (props) => {
  const { symbol } = props

  /**
   * Expressions may have subindices
   * For now, they may not have superindices (TODO: maybe?)
   * TODO: Support commas for subindex separation?
   */
  const separatedTerms: TermValue[] = symbol.split("_")
  const termsThatGoTogether: TermValue[][] = separatedTerms.map((term) =>
    (term as string).split("+")
  )

  termsThatGoTogether.forEach((termGroup: TermValue[], index) => {
    // Replace symbols represented as strings for components
    termGroup.forEach(
      (term: TermValue, index) => (termGroup[index] = replaceBySymbol(term))
    )

    // Join terms that go together into a single term
    separatedTerms[index] = (
      <>
        {termGroup.map((term, index) => (
          <Term key={index} element={term} />
        ))}
      </>
    )
  })

  separatedTerms.forEach(
    (term, index) => (separatedTerms[index] = replaceBySymbol(term))
  )

  for (let i = separatedTerms.length - 1; i > 0; i--) {
    // Last term will be the subindex
    const subindex = separatedTerms.pop() as string | JSX.Element
    separatedTerms[i - 1] = (
      <Subindex base={separatedTerms[i - 1]} subindex={subindex} />
    )
  }

  // Final result is at separatedTerms[0]
  return separatedTerms[0] as JSX.Element
}

export default SymbolComponent
