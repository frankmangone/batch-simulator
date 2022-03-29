const RerollIcon: React.VFC<InnerIconProps> = (props) => {
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
        d="M15 7.5V11.25L20 6.25L15 1.25V5C9.475 5 5 9.475 5 15C5 16.9625 5.575 18.7875 6.55 20.325L8.375 18.5C7.8125 17.4625 7.5 16.2625 7.5 15C7.5 10.8625 10.8625 7.5 15 7.5ZM23.45 9.675L21.625 11.5C22.175 12.55 22.5 13.7375 22.5 15C22.5 19.1375 19.1375 22.5 15 22.5V18.75L10 23.75L15 28.75V25C20.525 25 25 20.525 25 15C25 13.0375 24.425 11.2125 23.45 9.675V9.675Z"
        fill={color}
      />
    </svg>
  )
}

export default RerollIcon
