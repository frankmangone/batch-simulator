/* Components */
import ReactionCompoundCard from "./ReactionCompoundCard"

/* Hooks */
import { useData } from "../../context/DataContext"

/* Types */
import { IReactionCompound } from "../../types/Reaction"
import { CompoundType } from "../../context/DataContext"

interface IReactionCompoundListProps {
  compoundType: CompoundType
  reactionCompounds: IReactionCompound[]
  reactionIndex: number
}

const ReactionCompoundList: React.FC<IReactionCompoundListProps> = (props) => {
  const { reactionCompounds, reactionIndex, compoundType } = props
  const { compounds, updateReactionCompound } = useData()

  return (
    <>
      {reactionCompounds.map((reactionCompound) => {
        const compoundIndex = compounds.findIndex(
          (c) => c.id === reactionCompound.compoundId
        ) as number
        const compound = compounds[compoundIndex]

        return (
          <ReactionCompoundCard
            compound={compound}
            reactionCompound={reactionCompound}
            updateReactionCompound={(
              updatedReactionCompound: IReactionCompound
            ) => {
              updateReactionCompound(
                reactionIndex,
                compoundIndex,
                compoundType,
                updatedReactionCompound
              )
            }}
            key={reactionCompound.compoundId}
          />
        )
      })}
    </>
  )
}

export default ReactionCompoundList
