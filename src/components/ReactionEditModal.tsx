import styled from "styled-components"

/* Components */
import EditModal from "./EditModal"

/* Hooks */
import { useState } from "react"

/* Types */
import { IReaction } from "../types/Reaction"
import { CompoundType } from "../context/DataContext"

interface IReactionEditModalProps {
  reaction: IReaction
  closeModal: () => void
  addCompoundToReaction: (
    compoundId: string,
    compoundType: CompoundType
  ) => void
}

const ReactionEditModal: React.FC<IReactionEditModalProps> = (props) => {
  const { reaction, addCompoundToReaction, closeModal } = props
  const [closing, setClosing] = useState<boolean>(false)

  return (
    <EditModal
      closing={closing}
      setClosing={setClosing}
      handleClose={closeModal}
    >
      <p>hola</p>
    </EditModal>
  )
}

export default ReactionEditModal
