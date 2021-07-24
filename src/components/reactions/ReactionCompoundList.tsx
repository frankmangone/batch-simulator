/* Components */
import ReactionCompoundCard from "./ReactionCompoundCard"

/* Hooks */
import { useData } from "../../context/DataContext"

/* Types */
import { ICompound } from "../../types/Compound"
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
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        ) as ICompound
        /**
         * compoundIndex is the index in the reaction object (reactants or products)
         *  */
        const compoundIndex = reactionCompounds.findIndex(
          (c) => c.compoundId === reactionCompound.compoundId
        ) as number

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
