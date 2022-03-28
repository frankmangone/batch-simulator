import React from "react"
import BaseIcon from "./BaseIcon"

import addIcon from "../lib/icons/add"
import deleteIcon from "../lib/icons/delete"
import editIcon from "../lib/icons/edit"
import rerollIcon from "../lib/icons/reroll"
import saveIcon from "../lib/icons/save"

interface IconProps {
  color?: string
  size?: number
}

export const AddIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={addIcon} {...props} />
)

export const DeleteIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={deleteIcon} {...props} />
)

export const EditIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={editIcon} {...props} />
)

export const RerollIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={rerollIcon} {...props} />
)

export const SaveIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={saveIcon} {...props} />
)
