import styled from "styled-components"
import Button from "@components/general/Button"
import PageTitle from "@components/layout/PageTitle"
import CompoundList from "@components/compounds/CompoundList"
import { FiPlus, FiTrash2 } from "react-icons/fi"
import useCompounds from "@hooks/entities/useCompounds"
import { mobileBreakpoint } from "@lib/breakpoints"
import MainLayout from "@layouts/MainLayout"

const DeleteButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.6rem 1rem;

  @media screen and (max-width: ${mobileBreakpoint}px) {
    top: calc(80px + 1rem);
  }
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
    <MainLayout>
      <PageTitle>Compounds</PageTitle>
      <Button color="green" onClick={addCompound}>
        Add <FiPlus />
      </Button>
      <DeleteButton color="red" onClick={handleResetCompounds}>
        <FiTrash2 size={20} />
      </DeleteButton>
      <CompoundList />
    </MainLayout>
  )
}

export default CompoundsPage
