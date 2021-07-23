/* Components */
import Button from "../components/Button"
import PageTitle from "../components/PageTitle"
import { FiPlus } from "react-icons/fi"

const ReactionsPage: React.FC = () => {
  return (
    <>
      <PageTitle>Reactions</PageTitle>
      <Button color="green" onClick={() => {}}>
        Add <FiPlus />
      </Button>
    </>
  )
}

export default ReactionsPage
