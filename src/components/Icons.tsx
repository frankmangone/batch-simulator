import React from "react"
import BaseIcon from "./BaseIcon"

import editIcon from "../lib/icons/edit"
import deleteIcon from "../lib/icons/delete"
import rerollIcon from "../lib/icons/reroll"

interface IconProps {
  color?: string
  size?: number
}

export const EditIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={editIcon} {...props} />
)

export const DeleteIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={deleteIcon} {...props} />
)

export const RerollIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={rerollIcon} {...props} />
)
