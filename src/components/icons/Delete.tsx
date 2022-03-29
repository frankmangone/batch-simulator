const DeleteIcon: React.VFC<InnerIconProps> = (props) => {
  const { color, style } = props

  return (
    <svg
      style={style}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 11.25V23.75H10V11.25H20ZM18.125 3.75H11.875L10.625 5H6.25V7.5H23.75V5H19.375L18.125 3.75ZM22.5 8.75H7.5V23.75C7.5 25.125 8.625 26.25 10 26.25H20C21.375 26.25 22.5 25.125 22.5 23.75V8.75Z"
        fill={color}
      />
    </svg>
  )
}

export default DeleteIcon
