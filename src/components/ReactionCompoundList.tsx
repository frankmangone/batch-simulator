import styled from "styled-components"

/* Hooks */
import { useData } from "../context/DataContext"

/* Types */
import { ICompound } from "../types/Compound"
import { IReactionCompound } from "../types/Reaction"

interface IReactionCompoundListProps {
  reactionCompounds: IReactionCompound[]
}

const ReactionCompoundList: React.FC<IReactionCompoundListProps> = (props) => {
  const { reactionCompounds } = props
  const { compounds } = useData()

  return (
    <>
      {reactionCompounds.map((reactionCompound) => {
        const compound = compounds.find(
          (c) => c.id === reactionCompound.compoundId
        )
        return (
          <p key={reactionCompound.compoundId}>{`${
            reactionCompound.stoichiometricCoefficient
          }: ${(compound as ICompound).symbol}`}</p>
        )
      })}
    </>
  )
}

export default ReactionCompoundList
