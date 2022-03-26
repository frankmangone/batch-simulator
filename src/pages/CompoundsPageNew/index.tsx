import styled from "styled-components"
// import { FiPlus } from "react-icons/fi"
// import Button from "../../components/general/Button"
import PageTitle from "../../components/PageTitle"
import CompoundList from "./CompoundList"
// import useCompounds from "../../hooks/entities/useCompounds"

const Wrapper = styled.main`
  max-width: 900px;
  margin: 30px auto 0px;
  padding: 0px 50px;
`

const CompoundsPage: React.FC = () => {
  // const { addCompound, removeAllCompounds } = useCompounds()

  // const handleResetCompounds = () => {
  //   const confirmation = window.confirm(
  //     "Are you sure you want to delete all compounds? This will also delete all reactions"
  //   )
  //   if (confirmation) removeAllCompounds()
  // }

  return (
    <Wrapper>
      <PageTitle>Compounds</PageTitle>
      {/* <Button color="green" onClick={addCompound}>
        Add <FiPlus />
      </Button> */}
      <CompoundList />
    </Wrapper>
  )
}

export default CompoundsPage
