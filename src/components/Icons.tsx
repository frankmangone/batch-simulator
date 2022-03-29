import React from "react"
import BaseIcon from "./BaseIcon"

import addIcon from "../lib/icons/add"
import arrowRightIcon from "../lib/icons/arrowRight"
import compoundIcon from "../lib/icons/compound"
import deleteIcon from "../lib/icons/delete"
import editIcon from "../lib/icons/edit"
import phaseIcon from "../lib/icons/phase"
import reactionIcon from "../lib/icons/reaction"
import rerollIcon from "../lib/icons/reroll"
import runIcon from "../lib/icons/run"
import saveIcon from "../lib/icons/save"
import settingsIcon from "../lib/icons/settings"
import type { CSSProperties } from "styled-components"

interface IconProps {
  color?: string
  size?: number
  style?: CSSProperties
}

export const AddIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={addIcon} {...props} />
)

export const ArrowRightIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={arrowRightIcon} {...props} />
)

export const CompoundIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={compoundIcon} {...props} />
)

export const DeleteIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={deleteIcon} {...props} />
)

export const EditIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={editIcon} {...props} />
)

export const PhaseIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={phaseIcon} {...props} />
)

export const ReactionIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={reactionIcon} {...props} />
)

export const RerollIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={rerollIcon} {...props} />
)

export const RunIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={runIcon} {...props} />
)

export const SaveIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={saveIcon} {...props} />
)

export const SettingsIcon: React.VFC<IconProps> = (props): JSX.Element => (
  <BaseIcon icon={settingsIcon} {...props} />
)
