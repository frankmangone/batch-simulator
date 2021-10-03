/* Components */
import Button from "../components/Button"
import PageTitle from "../components/PageTitle"
import CompoundList from "../components/compounds/CompoundList"
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

const CompoundsPage: React.FC = () => {
  const { compounds, addCompound, editCompound } = useData()

  useEffect(() => {
    return () => {
      /* Sets edited compound to undefined on dismount */
      editCompound()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <PageTitle>Compounds</PageTitle>
      <Button color="green" onClick={addCompound}>
        Add <FiPlus />
      </Button>
      <Button color="red" buttonStyle={deleteButtonStyle}>
        <FiTrash2 size={20} />
      </Button>
      <CompoundList compounds={compounds} />
    </>
  )
}

export default CompoundsPage
