import { useState } from "react"
import styled from "styled-components"
import Show from "../../components/Show"
import CompoundCard from "./CompoundCard"
// import CompoundEditModal from "../../components/compounds/CompoundEditModal"
import NoResource from "../../components/NoResource"
import useCompounds from "../../hooks/entities/useCompounds"

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const CompoundList: React.VFC = () => {
  const { compounds } = useCompounds()

  // eslint-disable-next-line
  const [editedCompoundId, setEditedCompoundId] = useState<string | undefined>(
    undefined
  )

  // const editedCompound = useMemo(
  //   () =>
  //     editedCompoundId
  //       ? compounds.find((c) => c.id === editedCompoundId)
  //       : undefined,
  //   [compounds, editedCompoundId]
  // )

  return (
    <Wrapper>
      <Show when={!compounds.length}>
        <NoResource>No compounds added yet</NoResource>
      </Show>

      {compounds.map((compound, index) => (
        <CompoundCard key={index} {...{ compound, setEditedCompoundId }} />
      ))}

      {/* Edit modal
      <Show when={editedCompoundId}>
        <CompoundEditModal
          compound={editedCompound as Compound}
          closeModal={() => editCompound()}
        />
      </Show> */}
    </Wrapper>
  )
}

export default CompoundList
