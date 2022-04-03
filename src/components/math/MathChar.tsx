interface MathCharProps {
  symbol: string
}

/**
 * MathChar
 *
 * A function which receives an HTML entity symbol (i.e. `&infin`)
 */
const MathChar: React.VFC<MathCharProps> = (props) => {
  const { symbol } = props

  return <span>{symbol}</span>
}

export default MathChar
