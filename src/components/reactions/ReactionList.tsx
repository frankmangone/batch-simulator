import styled from "styled-components"
import ReactionCard from "./ReactionCard"
import ReactionEditModal from "./ReactionEditModal"
import NoResource from "../NoResource"
import { useMemo, useState } from "react"
import useCompounds from "../../hooks/entities/useCompounds"
import useReactions from "../../hooks/useReactions"

const ReactionList: React.FC = () => {
  const { compounds } = useCompounds()
  const { reactions, removeReaction } = useReactions()
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
    <ReactionListWrapper>
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
            removeReaction(reaction.id)
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
    </ReactionListWrapper>
  )
}

export default ReactionList

const ReactionListWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding-left: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
`
