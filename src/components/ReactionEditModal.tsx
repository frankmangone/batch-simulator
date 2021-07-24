import styled from "styled-components"

/* Components */
import { default as EditModal, IClosing } from "./EditModal"

/* Hooks */
import { useState } from "react"

/* Types */
import { IReaction } from "../types/Reaction"

interface IReactionEditModalProps {
  reaction: IReaction
  closeModal: () => void
}

const ReactionEditModal: React.FC<IReactionEditModalProps> = (props) => {
  const { reaction, closeModal } = props
  const [closing, setClosing] = useState<boolean>(false)

  return (
    <EditModal closing={closing} handleClose={() => {}}>
      <p>hola</p>
    </EditModal>
  )
}

export default ReactionEditModal
