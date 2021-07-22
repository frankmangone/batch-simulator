/* Components */
import Button from '../components/Button'
import PageTitle from "../components/PageTitle"
import CompoundList from "../components/CompoundList"
import { FiPlus } from "react-icons/fi"

/* Hooks */
import { useData } from "../context/DataContext"

const InputsPage: React.FC = () => {
  const { compounds, addCompound } = useData()

  return (
    <>
      <PageTitle>Inputs</PageTitle>
      <Button
        color='green'
        onClick={() => { addCompound() }}
      >
        Add <FiPlus />
      </Button>
      <CompoundList compounds={compounds} />
    </>
  )
}

export default InputsPage
