/* Components */
import ReactionCompoundCard from "./ReactionCompoundCard"

/* Hooks */
import { useData } from "../../context/DataContext"

/* Types */
import { Compound } from "../../types/Compound"
import { ReactionCompound } from "../../types/Reaction"
import { CompoundType } from "../../context/DataContext"

interface IReactionCompoundListProps {
  compoundType: CompoundType
  reactionCompounds: ReactionCompound[]
  reactionIndex: number
  removeCompound: (compoundIndex: number, compoundType: CompoundType) => void
  updateCompound: (
    compoundIndex: number,
    compoundType: CompoundType,
    updatedCompound: ReactionCompound
  ) => void
}

const ReactionCompoundList: React.FC<IReactionCompoundListProps> = (props) => {
  const { reactionCompounds, removeCompound, updateCompound, compoundType } =
    props
  const { findCompound } = useData()

  return (
    <>
      {reactionCompounds.map((reactionCompound) => {
        const compound = findCompound(reactionCompound.compoundId) as Compound
        /**
         * compoundIndex is the index in the reaction object (reactants or products)
         *  */
        const compoundIndex = reactionCompounds.findIndex(
          (c) => c.compoundId === reactionCompound.compoundId
        ) as number

        return (
          <ReactionCompoundCard
            key={reactionCompound.compoundId}
            compound={compound}
            reactionCompound={reactionCompound}
            updateCompound={(updatedReactionCompound: ReactionCompound) => {
              updateCompound(
                compoundIndex,
                compoundType,
                updatedReactionCompound
              )
            }}
            removeCompound={() => {
              removeCompound(compoundIndex, compoundType)
            }}
          />
        )
      })}
    </>
  )
}

export default ReactionCompoundList
