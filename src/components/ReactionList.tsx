/* Components */
import ReactionCard from "./ReactionCard"

/* Hooks */
import { useData } from "../context/DataContext"

const ReactionList: React.FC = () => {
  const { reactions } = useData()

  return (
    <>
      {reactions.map((reaction, index) => (
        <ReactionCard reaction={reaction} editReaction={() => {}} key={index}>
          Reaction
        </ReactionCard>
      ))}
    </>
  )
}

export default ReactionList
