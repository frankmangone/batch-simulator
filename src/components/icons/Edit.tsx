const EditIcon: React.VFC<InnerIconProps> = (props) => {
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
        d="M17.575 11.275L18.725 12.425L7.4 23.75H6.25V22.6L17.575 11.275V11.275ZM22.075 3.75C21.7625 3.75 21.4375 3.875 21.2 4.1125L18.9125 6.4L23.6 11.0875L25.8875 8.8C26.375 8.3125 26.375 7.525 25.8875 7.0375L22.9625 4.1125C22.7125 3.8625 22.4 3.75 22.075 3.75V3.75ZM17.575 7.7375L3.75 21.5625V26.25H8.4375L22.2625 12.425L17.575 7.7375V7.7375Z"
        fill={color}
      />
    </svg>
  )
}

export default EditIcon
