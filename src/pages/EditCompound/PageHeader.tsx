import styled from "styled-components"
import { DeleteIcon } from "../../components/Icons"
import BaseButton from "../../components/general/ButtonNew"
import Title from "../../components/layout/PageTitle"
import Header from "../../components/layout/PageHeader"
import useCompounds from "../../hooks/entities/useCompounds"
import { useParams } from "react-router-dom"

const Button = styled(BaseButton)`
  margin-left: 10px;
`

const PageHeader: React.VFC = () => {
  const { removeCompound } = useCompounds()
  const { id } = useParams()

  const handleRemove = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this compound?"
    )
    if (confirmation) removeCompound(id as string)
  }

  return (
    <Header>
      <Title>Edit Compound</Title>
      <Button color="cancel" onClick={handleRemove}>
        <DeleteIcon color="#000" size={30} />
      </Button>
    </Header>
  )
}

export default PageHeader
