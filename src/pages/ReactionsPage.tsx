/* Components */
import Button from "../components/Button"
import PageTitle from "../components/PageTitle"
import ReactionList from "../components/reactions/ReactionList"
import { FiPlus, FiTrash2 } from "react-icons/fi"

/* Hooks */
import { useEffect } from "react"
import { useData } from "../context/DataContext"
import useReactions from "../hooks/useReactions"

const deleteButtonStyle = `
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.6rem 1rem;
`

const ReactionsPage: React.FC = () => {
  const { addReaction } = useReactions()
  const { editReaction, removeAllReactions } = useData()

  useEffect(() => {
    return () => {
      /* Sets edited reaction to undefined on dismount */
      editReaction()
    }
    // eslint-disable-next-line
  }, [])

  const onRemoveAllReactions = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete all reactions?"
    )
    if (confirmation) removeAllReactions()
  }

  return (
    <>
      <PageTitle>Reactions</PageTitle>
      <Button color="green" onClick={addReaction}>
        Add <FiPlus />
      </Button>
      <Button
        color="red"
        buttonStyle={deleteButtonStyle}
        onClick={onRemoveAllReactions}
      >
        <FiTrash2 size={20} />
      </Button>
      <ReactionList />
    </>
  )
}

export default ReactionsPage
