interface InnerIconProps {
  color: string
  style?: CSSProperties
}

interface BaseIconProps {
  color?: string
  size?: number
  style?: CSSProperties
  Icon: React.VFC<InnerIconProps>
}

type IconProps = Omit<BaseIconProps, "Icon">
