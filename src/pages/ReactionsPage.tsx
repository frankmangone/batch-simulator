/* Components */
import Button from "../components/Button"
import PageTitle from "../components/PageTitle"
import ReactionList from "../components/reactions/ReactionList"
import { FiPlus } from "react-icons/fi"

/* Hooks */
import { useEffect } from "react"
import { useData } from "../context/DataContext"

const ReactionsPage: React.FC = () => {
  const { addReaction, editReaction } = useData()

  useEffect(() => {
    return () => {
      /* Sets edited reaction to undefined on dismount */
      editReaction()
    }
    // eslint-disable-next-line
  }, [])

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
