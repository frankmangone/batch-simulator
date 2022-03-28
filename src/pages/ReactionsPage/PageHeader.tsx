import styled from "styled-components"
import { AddIcon, DeleteIcon } from "../../components/Icons"
import BaseButton from "../../components/general/ButtonNew"
import Title from "../../components/layout/PageTitle"
import Header from "../../components/layout/PageHeader"
import useReactions from "../../hooks/entities/useReactions"

const Button = styled(BaseButton)`
  margin-left: 10px;
`

const PageHeader: React.VFC = () => {
  const { addReaction, resetReactions } = useReactions()

  const handleResetCompounds = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete all reactions?"
    )
    if (confirmation) resetReactions()
  }

  return (
    <Header>
      <Title>Reactions</Title>
      <Button color="success" onClick={addReaction}>
        <AddIcon color="#000" size={30} />
      </Button>
      <Button color="cancel" onClick={handleResetCompounds}>
        <DeleteIcon color="#000" size={30} />
      </Button>
    </Header>
  )
}

export default PageHeader
