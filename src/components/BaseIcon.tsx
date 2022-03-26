import React from "react"

export type BaseIconProps = {
  color?: string
  size?: number
  style?: any
  icon: (color: string, size: number) => string
}

/**
 * BaseIcon
 *
 * Base component for all other icons in ./Icons file
 *
 * @param {BaseIconProps} props
 * */
const BaseIcon: React.FC<BaseIconProps> = (props) => {
  /**
   * The 'size' prop will actually be taken as the height of the icon
   * It will be multiplied by the 'aspectRatio', which is ( width / height )
   *  */

  const { color = "#000", size = 30, style, icon } = props

  return (
    <div style={{ width: size, height: size, ...style }}>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(icon(color, size))}`}
        width={`${size}px`}
        height={`${size}px`}
        alt="icon"
      />
    </div>
  )
}

export default BaseIcon
