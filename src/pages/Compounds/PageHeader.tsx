import styled from "styled-components"
import { AddIcon, DeleteIcon } from "../../components/Icons"
import BaseButton from "../../components/general/ButtonNew"
import Title from "../../components/layout/PageTitle"
import Header from "../../components/layout/PageHeader"
import useCompounds from "../../hooks/entities/useCompounds"

const Button = styled(BaseButton)`
  margin-left: 10px;
`

const PageHeader: React.VFC = () => {
  const { addCompound, removeAllCompounds } = useCompounds()

  const handleResetCompounds = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete all compounds? This will also delete all reactions"
    )
    if (confirmation) removeAllCompounds()
  }

  return (
    <Header>
      <Title>Compounds</Title>
      <Button color="success" onClick={addCompound}>
        <AddIcon color="#000" size={30} />
      </Button>
      <Button color="cancel" onClick={handleResetCompounds}>
        <DeleteIcon color="#000" size={30} />
      </Button>
    </Header>
  )
}

export default PageHeader
