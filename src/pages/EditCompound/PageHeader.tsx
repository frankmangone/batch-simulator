import styled from "styled-components"
import { DeleteIcon, SaveIcon } from "../../components/Icons"
import BaseButton from "../../components/general/ButtonNew"
import Title from "../../components/layout/PageTitle"
import Header from "../../components/layout/PageHeader"
import useCompounds from "../../hooks/entities/useCompounds"
import { useTheme } from "../../contexts/Theme"
import { useParams } from "react-router-dom"

interface PageHeaderProps {
  handleSubmit: () => void
}

const Button = styled(BaseButton)`
  margin-left: 10px;
`

const PageHeader: React.VFC<PageHeaderProps> = (props) => {
  const { handleSubmit } = props
  const { removeCompound } = useCompounds()
  const { id } = useParams()
  const { getColor } = useTheme()

  const black = getColor({ name: "baseBlack", shade: 600 })

  const handleRemove = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this compound?"
    )
    if (confirmation) removeCompound(id as string)
  }

  return (
    <Header>
      <Title>Edit Compound</Title>
      <Button color="success" onClick={handleSubmit}>
        <SaveIcon color={black} size={30} />
      </Button>
      <Button color="cancel" onClick={handleRemove}>
        <DeleteIcon color={black} size={30} />
      </Button>
    </Header>
  )
}

export default PageHeader
