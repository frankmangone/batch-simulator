/* Components */
import ReactionCard from "./ReactionCard"
import ReactionEditModal from "./ReactionEditModal"

/* Hooks */
import { useData } from "../../context/DataContext"

/* Types */
import { IReaction } from "../../types/Reaction"

const ReactionList: React.FC = () => {
  const {
    compounds,
    reactions,
    editedReactionId,
    editReaction,
    removeReaction,
  } = useData()

  const editedReactionIndex = editedReactionId
    ? reactions.findIndex((reaction) => reaction.id === editedReactionId)
    : undefined

  const editedReaction = editedReactionId
    ? reactions[editedReactionIndex as number]
    : undefined

  return (
    <>
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
          reaction={editedReaction as IReaction}
          closeModal={() => editReaction()}
        />
      )}
    </>
  )
}

export default ReactionList
