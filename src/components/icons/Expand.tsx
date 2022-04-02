const ExpandIcon: React.VFC<InnerIconProps> = (props) => {
  const { color, style } = props

  return (
    <svg
      style={style}
      width="49"
      height="49"
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.2916 20.4167L24.5 30.6251L34.7083 20.4167H14.2916Z"
        fill={color}
      />
    </svg>
  )
}

export default ExpandIcon
