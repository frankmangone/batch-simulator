/* Components */
import Button from "../components/Button"
import PageTitle from "../components/PageTitle"
import ReactionList from "../components/ReactionList"
import { FiPlus } from "react-icons/fi"

/* Hooks */
import { useData } from "../context/DataContext"

const ReactionsPage: React.FC = () => {
  const { addReaction } = useData()

  return (
    <>
      <PageTitle>Reactions</PageTitle>
      <Button color="green" onClick={addReaction}>
        Add <FiPlus />
      </Button>
      <ReactionList />
    </>
  )
}

export default ReactionsPage
