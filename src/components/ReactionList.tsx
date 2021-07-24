/* Components */
import ReactionCard from "./ReactionCard"
import ReactionEditModal from "./ReactionEditModal"

/* Hooks */
import { useData } from "../context/DataContext"

/* Types */
import { IReaction } from "../types/Reaction"

const ReactionList: React.FC = () => {
  const { reactions, editedReactionId, editReaction } = useData()

  const editedReaction = editedReactionId
    ? reactions.find((reaction) => reaction.id === editedReactionId)
    : undefined

  return (
    <>
      {reactions.map((reaction, index) => (
        <ReactionCard
          reaction={reaction}
          editReaction={(): void => {
            editReaction(index)
          }}
          key={index}
        >
          Reaction
        </ReactionCard>
      ))}

      {/* Edit modal */}
      {editedReactionId && (
        <ReactionEditModal
          reaction={editedReaction as IReaction}
          closeModal={() => editReaction()}
        />
      )}
    </>
  )
}

export default ReactionList
