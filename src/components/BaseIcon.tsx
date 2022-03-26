import React from "react"

export type BaseIconProps = {
  color?: string
  icon: (color: string) => string
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

  const { color = "#000", icon } = props

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(icon(color))}`}
        alt=""
      />
    </div>
  )
}

export default BaseIcon
