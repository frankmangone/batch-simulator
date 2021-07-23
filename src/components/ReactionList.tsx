/* Hooks */
import { useData } from '../context/DataContext'

const ReactionList: React.FC = () => {
  const { reactions } = useData()

  return (
    <>
      {reactions.map((reaction, index) => (
        <p key={index}>Reaction</p>
      ))}
    </>
  )
}

export default ReactionList
