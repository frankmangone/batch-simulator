const CompoundIcon: React.VFC<InnerIconProps> = (props) => {
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
        d="M14.2916 28.5833L24.5 18.375L34.7083 28.5833H14.2916Z"
        fill={color}
      />
    </svg>
  )
}

export default CompoundIcon
