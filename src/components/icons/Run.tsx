const RunIcon: React.VFC<InnerIconProps> = (props) => {
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
        d="M20.4167 17.6399L31.1763 24.4999L20.4167 31.3599V17.6399ZM16.3334 10.2083V38.7916L38.7917 24.4999L16.3334 10.2083Z"
        fill={color}
      />
    </svg>
  )
}

export default RunIcon
