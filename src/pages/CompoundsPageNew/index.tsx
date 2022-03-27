import styled from "styled-components"
import { AddIcon, DeleteIcon } from "../../components/Icons"
import BaseButton from "../../components/general/ButtonNew"
import PageTitle from "../../components/PageTitle"
import CompoundList from "./CompoundList"
import useCompounds from "../../hooks/entities/useCompounds"

const Wrapper = styled.main`
  margin: 30px auto 0px;
  max-width: 900px;
  padding: 0px 50px;
`

const ActionButtons = styled.div`
  margin-bottom: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  align-self: stretch;
`

const Button = styled(BaseButton)`
  margin-left: 10px;
`

const CompoundsPage: React.FC = () => {
  const { addCompound, removeAllCompounds } = useCompounds()

  const handleResetCompounds = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete all compounds? This will also delete all reactions"
    )
    if (confirmation) removeAllCompounds()
  }

  return (
    <Wrapper>
      <PageTitle>Compounds</PageTitle>
      <ActionButtons>
        <Button color="success" onClick={addCompound}>
          <AddIcon color="#000" size={30} />
        </Button>
        <Button color="cancel" onClick={handleResetCompounds}>
          <DeleteIcon color="#000" size={30} />
        </Button>
      </ActionButtons>
      <CompoundList />
    </Wrapper>
  )
}

export default CompoundsPage
