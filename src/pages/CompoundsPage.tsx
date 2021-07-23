/* Components */
import Button from "../components/Button"
import PageTitle from "../components/PageTitle"
import CompoundList from "../components/CompoundList"
import { FiPlus } from "react-icons/fi"

/* Hooks */
import { useEffect } from "react"
import { useData } from "../context/DataContext"

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
      <Button
        color="green"
        onClick={addCompound}
      >
        Add <FiPlus />
      </Button>
      <CompoundList compounds={compounds} />
    </>
  )
}

export default CompoundsPage
