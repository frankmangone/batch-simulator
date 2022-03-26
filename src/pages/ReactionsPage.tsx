import styled from "styled-components"
import Button from "../components/general/Button"
import PageTitle from "../components/PageTitle"
import ReactionList from "../components/reactions/ReactionList"
import { FiPlus, FiTrash2 } from "react-icons/fi"
import useReactions from "../hooks/entities/useReactions"
import { mobileBreakpoint } from "../lib/breakpoints"

const DeleteButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.6rem 1rem;

  @media screen and (max-width: ${mobileBreakpoint}px) {
    top: calc(80px + 1rem);
  }
`

const ReactionsPage: React.FC = () => {
  const { addReaction, resetReactions } = useReactions()

  const handleResetReactions = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete all reactions?"
    )
    if (confirmation) resetReactions()
  }

  return (
    <>
      <PageTitle>Reactions</PageTitle>
      <Button color="green" onClick={addReaction}>
        Add <FiPlus />
      </Button>
      <DeleteButton color="red" onClick={handleResetReactions}>
        <FiTrash2 size={20} />
      </DeleteButton>
      <ReactionList />
    </>
  )
}

export default ReactionsPage
