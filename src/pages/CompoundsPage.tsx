import randomstring from "randomstring"
import { useAppSelector, useAppDispatch } from "../hooks/useStore"
import { addCompound } from "../features/compoundsSlice"

/* Components */
import Button from "../components/Button"
import PageTitle from "../components/PageTitle"
import CompoundList from "../components/compounds/CompoundList"
import { FiPlus, FiTrash2 } from "react-icons/fi"

/* Hooks */
import { useData } from "../context/DataContext"

/* Constants */
import { COMPOUND_COLORS_CODES } from "../constants/compoundColors"

const deleteButtonStyle = `
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.6rem 1rem;
`

const CompoundsPage: React.FC = () => {
  const compounds = useAppSelector((state) => state.compounds)
  const dispatch = useAppDispatch()

  const addCompoundAction = () => {
    const newCompound = {
      id: randomstring.generate(8),
      color: COMPOUND_COLORS_CODES[0],
      concentration: 0,
      molecularWeight: 0,
      symbol: "A",
      name: "",
    }
    dispatch(addCompound(newCompound))
  }

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
      <Button color="green" onClick={addCompoundAction}>
        Add <FiPlus />
      </Button>
      <Button
        color="red"
        buttonStyle={deleteButtonStyle}
        onClick={onRemoveAllCompounds}
      >
        <FiTrash2 size={20} />
      </Button>
      <CompoundList compounds={compounds || []} />
    </>
  )
}

export default CompoundsPage
