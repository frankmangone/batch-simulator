/* Components */
import ReactionCard from "./ReactionCard"
import ReactionEditModal from "./ReactionEditModal"
import NoResource from "../NoResource"

/* Hooks */
import { useMemo, useState } from "react"
import { useData } from "../../context/DataContext"
import useCompounds from "../../hooks/useCompounds"
import useReactions from "../../hooks/useReactions"

/* Types */
import { Reaction } from "../../types/Reaction"

const ReactionList: React.FC = () => {
  const { removeReaction } = useData()
  const { compounds } = useCompounds()
  const { reactions } = useReactions()
  const [editedReactionId, setEditedReactionId] = useState<string | undefined>(
    undefined
  )

  const editReaction = (id?: string) => setEditedReactionId(id)
  const editedReaction = useMemo(
    () =>
      editedReactionId
        ? reactions.find((r) => r.id === editedReactionId)
        : undefined,
    [reactions, editedReactionId]
  )

  return (
    <>
      {reactions.length === 0 && (
        <NoResource>No reactions added yet</NoResource>
      )}

      {reactions.map((reaction, index) => (
        <ReactionCard
          reaction={reaction}
          reactionIndex={index}
          editReaction={(): void => {
            editReaction(reaction.id)
          }}
          removeReaction={(): void => {
            removeReaction(index)
          }}
          key={index}
        >
          Reaction
        </ReactionCard>
      ))}

      {/* Edit modal */}
      {editedReactionId && (
        <ReactionEditModal
          compounds={compounds}
          reaction={editedReaction as Reaction}
          closeModal={() => editReaction()}
        />
      )}
    </>
  )
}

export default ReactionList
