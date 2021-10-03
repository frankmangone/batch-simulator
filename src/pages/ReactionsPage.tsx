/* Components */
import Button from "../components/Button"
import PageTitle from "../components/PageTitle"
import ReactionList from "../components/reactions/ReactionList"
import { FiPlus, FiTrash2 } from "react-icons/fi"

/* Hooks */
import { useEffect } from "react"
import { useData } from "../context/DataContext"

const deleteButtonStyle = `
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.6rem 1rem;
`

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
      <Button color="red" buttonStyle={deleteButtonStyle}>
        <FiTrash2 size={20} />
      </Button>
      <ReactionList />
    </>
  )
}

export default ReactionsPage
