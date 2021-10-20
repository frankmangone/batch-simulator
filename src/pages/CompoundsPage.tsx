/* Components */
import Button from "../components/Button"
import PageTitle from "../components/PageTitle"
import CompoundList from "../components/compounds/CompoundList"
import { FiPlus, FiTrash2 } from "react-icons/fi"

/* Hooks */
import { useData } from "../context/DataContext"
import useCompounds from "../hooks/useCompounds"

const deleteButtonStyle = `
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.6rem 1rem;
`

const CompoundsPage: React.FC = () => {
  const { addCompound } = useCompounds()
  const { removeAllCompounds } = useData()

  const onRemoveAllCompounds = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete all compounds? This will also delete all reactions"
    )
    if (confirmation) removeAllCompounds()
  }

  return (
    <>
      <PageTitle>Compounds</PageTitle>
      <Button color="green" onClick={addCompound}>
        Add <FiPlus />
      </Button>
      <Button
        color="red"
        buttonStyle={deleteButtonStyle}
        onClick={onRemoveAllCompounds}
      >
        <FiTrash2 size={20} />
      </Button>
      <CompoundList />
    </>
  )
}

export default CompoundsPage
