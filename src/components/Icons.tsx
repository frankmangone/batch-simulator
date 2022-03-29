import React from "react"
import BaseIcon from "./BaseIcon"

import Add from "./icons/Add"
import ArrowRight from "./icons/ArrowRight"
import Compound from "./icons/Compound"
import Delete from "./icons/Delete"
import Edit from "./icons/Edit"
import Phase from "./icons/Phase"
import Reaction from "./icons/Reaction"
import Reroll from "./icons/Reroll"
import Run from "./icons/Run"
import Save from "./icons/Save"
import Settings from "./icons/Settings"

export const AddIcon: React.VFC<IconProps> = (props) => (
  <BaseIcon Icon={Add} {...props} />
)

export const ArrowRightIcon: React.VFC<IconProps> = (props) => (
  <BaseIcon Icon={ArrowRight} {...props} />
)

export const CompoundIcon: React.VFC<IconProps> = (props) => (
  <BaseIcon Icon={Compound} {...props} />
)

export const DeleteIcon: React.VFC<IconProps> = (props) => (
  <BaseIcon Icon={Delete} {...props} />
)

export const EditIcon: React.VFC<IconProps> = (props) => (
  <BaseIcon Icon={Edit} {...props} />
)

export const PhaseIcon: React.VFC<IconProps> = (props) => (
  <BaseIcon Icon={Phase} {...props} />
)

export const ReactionIcon: React.VFC<IconProps> = (props) => (
  <BaseIcon Icon={Reaction} {...props} />
)

export const RerollIcon: React.VFC<IconProps> = (props) => (
  <BaseIcon Icon={Reroll} {...props} />
)

export const RunIcon: React.VFC<IconProps> = (props) => (
  <BaseIcon Icon={Run} {...props} />
)

export const SaveIcon: React.VFC<IconProps> = (props) => (
  <BaseIcon Icon={Save} {...props} />
)

export const SettingsIcon: React.VFC<IconProps> = (props) => (
  <BaseIcon Icon={Settings} {...props} />
)
