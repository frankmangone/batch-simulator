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
        d="M6.125 34.7083V38.7917H18.375V34.7083H6.125ZM6.125 10.2083V14.2917H26.5417V10.2083H6.125ZM26.5417 42.875V38.7917H42.875V34.7083H26.5417V30.625H22.4583V42.875H26.5417ZM14.2917 18.375V22.4583H6.125V26.5417H14.2917V30.625H18.375V18.375H14.2917ZM42.875 26.5417V22.4583H22.4583V26.5417H42.875ZM30.625 18.375H34.7083V14.2917H42.875V10.2083H34.7083V6.125H30.625V18.375Z"
        fill={color}
      />
    </svg>
  )
}

export default CompoundIcon
