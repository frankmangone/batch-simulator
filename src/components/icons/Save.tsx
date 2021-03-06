const SaveIcon: React.VFC<InnerIconProps> = (props) => {
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
        d="M34.7083 6.125H10.2083C7.94208 6.125 6.125 7.9625 6.125 10.2083V38.7917C6.125 41.0375 7.94208 42.875 10.2083 42.875H38.7917C41.0375 42.875 42.875 41.0375 42.875 38.7917V14.2917L34.7083 6.125ZM38.7917 38.7917H10.2083V10.2083H33.0138L38.7917 15.9863V38.7917ZM24.5 24.5C21.1108 24.5 18.375 27.2358 18.375 30.625C18.375 34.0142 21.1108 36.75 24.5 36.75C27.8892 36.75 30.625 34.0142 30.625 30.625C30.625 27.2358 27.8892 24.5 24.5 24.5ZM12.25 12.25H30.625V20.4167H12.25V12.25Z"
        fill={color}
      />
    </svg>
  )
}

export default SaveIcon
