import React from "react"

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

  const { color = "#000", size = 30, style = {}, Icon } = props
  const modifiedStyle = { ...style, width: size, height: size }

  return <Icon {...{ color, style: modifiedStyle }} />
}

export default BaseIcon
