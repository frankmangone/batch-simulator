/* Components */
import ReactionCard from "./ReactionCard"
import ReactionEditModal from "./ReactionEditModal"

/* Hooks */
import { useData } from "../../context/DataContext"

/* Types */
import { IReaction } from "../../types/Reaction"
import { CompoundType } from "../../context/DataContext"

const ReactionList: React.FC = () => {
  const {
    compounds,
    reactions,
    addCompoundToReaction,
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
          addCompoundToReaction={(
            compoundId: string,
            compoundType: CompoundType
          ) => {
            addCompoundToReaction(
              editedReactionIndex as number,
              compoundId,
              compoundType
            )
          }}
          closeModal={() => editReaction()}
        />
      )}
    </>
  )
}

export default ReactionList
