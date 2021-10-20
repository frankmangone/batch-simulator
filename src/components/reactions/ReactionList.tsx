/* Components */
import ReactionCard from "./ReactionCard"
import ReactionEditModal from "./ReactionEditModal"
import NoResource from "../NoResource"

/* Hooks */
import { useData } from "../../context/DataContext"
import useCompounds from "../../hooks/useCompounds"
import useReactions from "../../hooks/useReactions"

/* Types */
import { Reaction } from "../../types/Reaction"

const ReactionList: React.FC = () => {
  const { editedReactionId, editReaction, removeReaction } = useData()

  const { compounds } = useCompounds()
  const { reactions } = useReactions()

  const editedReactionIndex = editedReactionId
    ? reactions.findIndex((reaction) => reaction.id === editedReactionId)
    : undefined

  const editedReaction = editedReactionId
    ? reactions[editedReactionIndex as number]
    : undefined

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
            editReaction(index)
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
